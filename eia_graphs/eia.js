const nameMap = new Map([
  ['all coal products', 'Coal'],
  ['wind', 'Wind'],
  ['estimated total solar', 'Solar'],
  ['nuclear', 'Nuclear'],
  ['natural gas & other gases', 'Natural Gas'],
  ['conventional hydroelectric', 'Hydroelectric']
]);

const cat3MergeMap = new Map([
  ['Coal', 'Fossil Fuels'],
  ['Wind', 'Renewables'],
  ['Solar', 'Renewables'],
  ['Nuclear', 'Nuclear'],
  ['Natural Gas', 'Fossil Fuels'],
  ['Hydroelectric', 'Renewables']
]);

const cat2MergeMap = new Map([
  ['Coal', 'Fossil Fuels'],
  ['Wind', 'Carbon Free'],
  ['Solar', 'Carbon Free'],
  ['Nuclear', 'Carbon Free'],
  ['Natural Gas', 'Fossil Fuels'],
  ['Hydroelectric', 'Carbon Free']
]);

var allSourceData;
var twoSourceData;
var threeSourceData;

function populateData(){
  allSourceData = processRawData();
  twoSourceData = mergeCategories(structuredClone(allSourceData), cat2MergeMap);
  threeSourceData = mergeCategories(structuredClone(allSourceData), cat3MergeMap);          
}


function processRawData() {
  rawData.response.data.sort((a, b) => a.period.localeCompare(b.period));

  const groupedData = new Map();

  rawData.response.data.forEach(item => {
    const fuelType = nameMap.get(item.fuelTypeDescription);
    if (!groupedData.has(fuelType)) {
      groupedData.set(fuelType, []);
    }
    groupedData.get(fuelType).push(item);
  });


  // Transform and sort data for each fuel type
  const result = new Map();

  groupedData.forEach((value, key) => {
    // Sort data by period in descending order
    groupedData.get(key).sort((a, b) => a.period.localeCompare(b.period));

    // Extract dates and values
    const dates = groupedData.get(key).map(item => item.period);
    const values = groupedData.get(key).map(item => parseFloat(item.generation));

    // Assign to result
    result.set(key, {
      x: dates,
      y: values,
      name: key,
    });
  });

  return result
}

function mergeCategories(data, mergeMap){
  const result = new Map();

  mergeMap.forEach((value, key) => {
      result.set(value, {
        name: value,
        x: [],
        y: []
      })
  });

  data.forEach((value, key) => {
    if (result.get(mergeMap.get(key)).y.length == 0){
      result.get(mergeMap.get(key)).y = value.y;
      result.get(mergeMap.get(key)).x = value.x;
    } else {


      var valueXInt = 0;
      var resultXInt = 0;

      while (valueXInt < value.x.length && resultXInt < result.get(mergeMap.get(key)).x.length){
        while (value.x[valueXInt] != result.get(mergeMap.get(key)).x[resultXInt]){
          resultXInt++;
        }
        result.get(mergeMap.get(key)).y[resultXInt] += value.y[valueXInt];
        valueXInt++;
        resultXInt++;
      }
    }
  });

  
  // console.log(result);
  
  return result;
}

function plotNetGenMonthly(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  const myplot = document.getElementById(name);
  var layout = {
    title: {
      text: 'Net Generation by Source'
    },
    xaxis: {
      title: {
        text: 'month'
      },
      fixedrange: false,  // Allow zooming on x-axis
      minallowed: "2001-01",
      maxallowed: "2025-01"
    },
    yaxis: {
      title: {
        text: '1,000 mwh',
      },
      fixedrange: true  // Prevent direct y-axis zooming
    }
  };

  var config = {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: name,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };

  Plotly.newPlot(name, dd, layout, config);
}

function plotPercentGenMonthly(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    value["groupnorm"] = "percent"
    value["stackgroup"] = "one"
    dd.push(value)
  });

  var layout = {
    title: {
      text: 'Percent of Generation by Source'
    },
    xaxis: {
      title: {
        text: 'month'
      },
      minallowed: "2001-01",
      maxallowed: "2025-01"
    },
    yaxis: {
      title: {
        text: 'Percent'
      },
      fixedrange: true,
    }
  };

  var config = {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: name,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };

  Plotly.newPlot(name, dd, layout, config);
}

function convertToRolling(data, windowSize) {
  const result = new Map();

  data.forEach((value, key) => {
    newX = [];
    newY = [];

    var sum = 0;
    for (let i = 0; i < value.x.length; i++) {
      sum += value.y[i];

      if (i < windowSize - 1) {
        continue;
      }

      if (i > windowSize - 1) {
        sum -= value.y[i - windowSize];
      }

      newY.push(sum);
      newX.push(value.x[i]);
    }

    // Assign to result
    result.set(key, {
      x: newX,
      y: newY,
      name: key,
    });
  });

  return result;
}

function calculateGrowth(data, windowSize) {
  const result = new Map();

  data.forEach((value, key) => {
    newX = [];
    newY = [];

    for (let i = windowSize; i < value.y.length; i++) {
      newY.push(((value.y[i] - value.y[i - windowSize]) / value.y[i - windowSize]));
      newX.push(value.x[i]);

      if (value.y[i - windowSize] == 0){
        console.log("hahha");
      }
    }


    // Assign to result
    result.set(key, {
      x: newX,
      y: newY,
      name: key,
    });
  });

  return result;
}

function calculateAbsoluteGrowth(data, windowSize) {
  const result = new Map();

  data.forEach((value, key) => {
    const newX = [];
    const newY = [];

    for (let i = windowSize; i < value.y.length; i++) {
      // Calculate absolute difference instead of percentage change
      newY.push(value.y[i] - value.y[i - windowSize]);
      newX.push(value.x[i]);
    }

    // Assign to result
    result.set(key, {
      x: newX,
      y: newY,
      name: key,
    });
  });

  return result;
}

function plotNetGenRolling(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  const myplot = document.getElementById(name);
  var layout = {
    title: {
      text: 'Net Generation by Source (12 Month Rolling)'
    },
    xaxis: {
      title: {
        text: 'month'
      },
      fixedrange: false,  // Allow zooming on x-axis
      minallowed: "2001-01",
      maxallowed: "2025-01"
    },
    yaxis: {
      title: {
        text: '1,000 mwh',
      },
      fixedrange: true  // Prevent direct y-axis zooming
    }
  };

  var config = {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: name,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };

  Plotly.newPlot(name, dd, layout, config);
}

function plotPercentGenRolling(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    value["groupnorm"] = "percent"
    value["stackgroup"] = "one"
    dd.push(value)
  });

  var layout = {
    title: {
      text: 'Percent of Generation by Source (12 Month Rolling)'
    },
    xaxis: {
      title: {
        text: 'month'
      },
      minallowed: "2001-01",
      maxallowed: "2025-01"
    },
    yaxis: {
      title: {
        text: 'Percent'
      },
      fixedrange: true,
    }
  };

  var config = {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: name,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };

  Plotly.newPlot(name, dd, layout, config);
}

function plotPercentGrowthMonthly(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  const myplot = document.getElementById(name);
  var layout = {
    title: {
      text: 'Percent Growth (12 Month Rolling)(1 month look back)'
    },
    xaxis: {
      title: {
        text: 'month'
      },
      fixedrange: false,  // Allow zooming on x-axis
      minallowed: "2001-01",
      maxallowed: "2025-01"
    },
    yaxis: {
      title: {
        text: '% Growth',
      },
      tickformat: '.2%',
      fixedrange: true  // Prevent direct y-axis zooming
    }
  };

  var config = {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: name,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };

  Plotly.newPlot(name, dd, layout, config);
}

function plotPercentGrowthYearly(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  const myplot = document.getElementById(name);
  var layout = {
    title: {
      text: 'Percent Growth (12 Month Rolling)(12 month look back)'
    },
    xaxis: {
      title: {
        text: 'month'
      },
      fixedrange: false,  // Allow zooming on x-axis
      minallowed: "2001-01",
      maxallowed: "2025-01"
    },
    yaxis: {
      title: {
        text: '% Growth',
      },
      tickformat: '.2%',
      fixedrange: true  // Prevent direct y-axis zooming
    }
  };

  var config = {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: name,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };

  Plotly.newPlot(name, dd, layout, config);
}