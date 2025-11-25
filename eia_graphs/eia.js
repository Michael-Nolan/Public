const plotNetGenDiv = "plotNetGenDiv"
const plotPercentGenDiv = "plotPercentGenDiv"
const plotPercentGrowthDiv = "plotPercentGrowthDiv"
const plotAbsoluteGrowthDiv = "plotAbsoluteGrowthDiv"
const plotForecastDiv = "plotForecastDiv"

const yAxisMap = new Map([
  [plotNetGenDiv, '1,000 mwh'],
  [plotPercentGenDiv, 'Percent'],
  [plotPercentGrowthDiv, 'Percent'],
  [plotAbsoluteGrowthDiv, '1,000 mwh'],
  [plotForecastDiv, '1,000 mwh'],
]);

function makePlotConfig() {
  return {
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: 'eia_graph',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    scrollZoom: true
  };
}


function buildLayout(divName, plotTitle) {
  // Only add presidency overlays for plots that are not percent growth
  const excludeOverlay = [plotPercentGenDiv];

  const red = 'rgba(255,0,0,0.08)'
  const blue = 'rgba(0,0,255,0.08)'
  const presidencies = [
    { start: '2001-01', end: '2009-01', color: red }, // Bush (R)
    { start: '2009-01', end: '2017-01', color: blue }, // Obama (D)
    { start: '2017-01', end: '2021-01', color: red }, // Trump (R)
    { start: '2021-01', end: '2025-01', color: blue }, // Biden (D)
    { start: '2025-01', end: '2025-08', color: red }, // Trump (R)
  ];

  const shapes = presidencies.map(p => ({
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

  return {
    title: {
      text: plotTitle
    },
    xaxis: {
      title: {
        text: 'month'
      },
      fixedrange: false,  // Allow zooming on x-axis
      minallowed: "2001-01",
      //maxallowed: "2025-08"
    },
    yaxis: {
      title: {
        text: yAxisMap.get(divName),
      },
      fixedrange: true  // Prevent direct y-axis zooming
    },
    ...(!excludeOverlay.includes(divName) ? { shapes } : {})
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

const allSourceData = processRawData();
const twoSourceData = mergeCategories(structuredClone(allSourceData), cat2MergeMap);
const threeSourceData = mergeCategories(structuredClone(allSourceData), cat3MergeMap);

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
    // Sort data by period in ascending order
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


      let valueXInt = 0;
      let resultXInt = 0;

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

  return result;
}

function plotNetGen(name, data, plotTitle) {
  let dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  Plotly.newPlot(name, dd, buildLayout(name, plotTitle), makePlotConfig());
}

function plotPercentGen(name, data, plotTitle) {
  let dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    value["groupnorm"] = "percent"
    value["stackgroup"] = "one"
    dd.push(value)
  });

  layout = buildLayout(name, plotTitle)
  Plotly.newPlot(name, dd, layout, makePlotConfig());
}

function plotPercentGrowth(name, data, plotTitle) {
  let dd = [];
  data.forEach((value, key) => {
    value["type"] = "scatter"
    dd.push(value)
  });

  let layout = buildLayout(name, plotTitle)
  layout.yaxis.tickformat = '.2%';

  Plotly.newPlot(name, dd, layout, makePlotConfig());
}

function convertToRolling(data, windowSize) {
  const result = new Map();

  data.forEach((value, key) => {
    newX = [];
    newY = [];

    let sum = 0;
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

/**
 * @param {Map} data - Map of series keyed by name; each value has `x` (dates `YYYY-MM`) and `y` (numbers)
 * @param {number} yearsToExtend - number of years to extend (default 5)
 * @param {number} lookback - lookback window, either 12 or 1 (default 12)
 * @returns {Map} new Map with extended `x` and `y` arrays
 */
function extendDataByGrowth(data, yearsToExtend = 5, lookback = 12) {
  const result = new Map();
  const monthsToExtend = yearsToExtend * 12;

  let ul = document.getElementById('CAGR');
  ul.replaceChildren();

  data.forEach((value, key) => {
    const x = value.x.slice();
    const y = value.y.slice();

    const len = y.length;

    const startIndex = len - 1 - lookback;
    const startVal = y[startIndex];
    const endVal = y[len - 1];

    let monthlyFactor = 1;

    const periods = lookback;
    monthlyFactor = Math.pow(endVal / startVal, 1 / periods);

    
    let li = document.createElement('li');
    let growthType = lookback == 12 ? "Current Yearly Growth":"Current Monthly Growth";
    li.textContent = growthType + " - " + key + ': ' + (((endVal / startVal) - 1) * 100).toFixed(2) + "%";
    ul.appendChild(li);
    
    let lastDate = x[len - 1];
    let lastVal = endVal;

    for (let m = 0; m < monthsToExtend; m++) {
      lastVal = lastVal * monthlyFactor;


      // increment month YYYY-MM
      const [yrStr, moStr] = lastDate.split('-');
      let yr = parseInt(yrStr, 10);
      let mo = parseInt(moStr, 10) + 1;
      if (mo > 12) {
        mo = 1;
        yr += 1;
      }
      const newDate = `${yr.toString().padStart(4, '0')}-${mo.toString().padStart(2, '0')}`;

      x.push(newDate);
      y.push(Number(lastVal.toFixed(3)));

      lastDate = newDate;
    }

    result.set(key, { x, y, name: key });
  });

  return result;
}