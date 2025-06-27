const plotNetGenMonthlyDiv = "plotNetGenMonthlyDiv"
const plotPercentGenMonthlyDiv = "plotPercentGenMonthlyDiv"
const plotNetGenRollingDiv = "plotNetGenRollingDiv"
const plotPercentGenRollingDiv = "plotPercentGenRollingDiv"
const plotPercentGrowthMonthlyDiv = "plotPercentGrowthMonthlyDiv"
const plotPercentGrowthYearlyDiv = "plotPercentGrowthYearlyDiv"
const plotAbsoluteGrowthMonthlyDiv = "plotAbsoluteGrowthMonthlyDiv"
const plotAbsoluteGrowthYearlyDiv = "plotAbsoluteGrowthYearlyDiv"

const titleTextMap = new Map([
  [plotNetGenMonthlyDiv, 'Net Generation by Source (Monthly)'],
  [plotPercentGenMonthlyDiv, 'Percent Generation by Source (Monthly)'],
  [plotNetGenRollingDiv, 'Net Generation by Source (12 Month Rolling)'],
  [plotPercentGenRollingDiv, 'Percent Generation by Source (12 Month Rolling)'],
  [plotPercentGrowthMonthlyDiv, 'Percent Growth (12 Month Rolling)(1 month look back)'],
  [plotPercentGrowthYearlyDiv, 'Percent Growth (12 Month Rolling)(12 month look back)'],
  [plotAbsoluteGrowthMonthlyDiv, 'Absolute Growth (12 Month Rolling)(1 month look back)'],
  [plotAbsoluteGrowthYearlyDiv, 'Absolute Growth (12 Month Rolling)(12 month look back)'],
]);

const yAxisMap = new Map([
  [plotNetGenMonthlyDiv, '1,000 mwh'],
  [plotPercentGenMonthlyDiv, 'Percent'],
  [plotNetGenRollingDiv, '1,000 mwh'],
  [plotPercentGenRollingDiv, 'Percent'],
  [plotPercentGrowthMonthlyDiv, 'Percent'],
  [plotPercentGrowthYearlyDiv, 'Percent'],
  [plotAbsoluteGrowthMonthlyDiv, '1,000 mwh'],
  [plotAbsoluteGrowthYearlyDiv, '1,000 mwh'],
]);




const plotConfig = {
  toImageButtonOptions: {
    format: 'svg', // one of png, svg, jpeg, webp
    filename: name,
    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
  },
  scrollZoom: true
};


function buildLayout(divName) {
  // Only add presidency overlays for plots that are not percent growth
  const excludeOverlay = [plotPercentGenMonthlyDiv, plotPercentGenRollingDiv];
  let shapes = undefined;
  if (!excludeOverlay.includes(divName)) {
    // Define presidency periods and colors
    const presidencies = [
      { start: '2001-01', end: '2009-01', color: 'rgba(255,0,0,0.08)' }, // Bush (R)
      { start: '2009-01', end: '2017-01', color: 'rgba(0,0,255,0.08)' }, // Obama (D)
      { start: '2017-01', end: '2021-01', color: 'rgba(255,0,0,0.08)' }, // Trump (R)
      { start: '2021-01', end: '2025-01', color: 'rgba(0,0,255,0.08)' }, // Biden (D)
      { start: '2025-01', end: '2025-04', color: 'rgba(255,0,0,0.08)' }, // Trump (R)
    ];
    // Create shapes for background tints
    shapes = presidencies.map(p => ({
      type: 'rect',
      xref: 'x',
      yref: 'paper',
      x0: p.start,
      x1: p.end,
      y0: 0,
      y1: 1,
      fillcolor: p.color,
      line: { width: 0 },
      layer: 'below'
    }));
  }

  return {
    title: {
      text: titleTextMap.get(divName)
    },
    xaxis: {
      title: {
        text: 'month'
      },
      fixedrange: false,  // Allow zooming on x-axis
      minallowed: "2001-01",
      maxallowed: "2025-04"
    },
    yaxis: {
      title: {
        text: yAxisMap.get(divName),
      },
      fixedrange: true  // Prevent direct y-axis zooming
    },
    ...(shapes ? { shapes } : {})
  };
}

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

function populateData() {
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

function mergeCategories(data, mergeMap) {
  const result = new Map();

  mergeMap.forEach((value, key) => {
    result.set(value, {
      name: value,
      x: [],
      y: []
    })
  });

  data.forEach((value, key) => {
    if (result.get(mergeMap.get(key)).y.length == 0) {
      result.get(mergeMap.get(key)).y = value.y;
      result.get(mergeMap.get(key)).x = value.x;
    } else {


      var valueXInt = 0;
      var resultXInt = 0;

      while (valueXInt < value.x.length && resultXInt < result.get(mergeMap.get(key)).x.length) {
        while (value.x[valueXInt] != result.get(mergeMap.get(key)).x[resultXInt]) {
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

  Plotly.newPlot(name, dd, buildLayout(name), plotConfig);
}

function plotPercentGenMonthly(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    value["groupnorm"] = "percent"
    value["stackgroup"] = "one"
    dd.push(value)
  });

  layout = buildLayout(name)
  Plotly.newPlot(name, dd, layout, plotConfig);
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

  Plotly.newPlot(name, dd, buildLayout(name), plotConfig);
}

function plotPercentGenRolling(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    value["groupnorm"] = "percent"
    value["stackgroup"] = "one"
    dd.push(value)
  });

  layout = buildLayout(name)
  Plotly.newPlot(name, dd, layout, plotConfig);
}

function plotPercentGrowth(name, data) {
  var dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  let layout = buildLayout(name)
  layout.yaxis.tickformat = '.2%';

  Plotly.newPlot(name, dd, layout, plotConfig);
}