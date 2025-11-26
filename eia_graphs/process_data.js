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

const allSourceData = processRawData(rawData.response.data);
const twoSourceData = mergeCategories(structuredClone(allSourceData), cat2MergeMap);
const threeSourceData = mergeCategories(structuredClone(allSourceData), cat3MergeMap);

function processRawData(data) {
  data.sort((a, b) => a.period.localeCompare(b.period));

  data[1].xyz = 5
  const groupedData = new Map();

  data.forEach(item => {
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
    let growthType = lookback == 12 ? "Current Yearly Growth" : "Current Monthly Growth";
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