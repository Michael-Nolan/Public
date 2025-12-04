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

function groupByType(data: GenerationRecord[]): Map<string, GenerationRecord[]> {
  const groupedData = new Map<string, GenerationRecord[]>();
  data.forEach(item => {
    const fuelType = nameMap.get(item.fuelTypeDescription);
    assertNotUndefined(fuelType)
    if (!groupedData.has(fuelType)) {
      groupedData.set(fuelType, []);
    }
    const obj = groupedData.get(fuelType)
    assertNotUndefined(obj)
    obj.push(item);
  });
  return groupedData;
}

interface ProcessedResult {
  x: string[]; // Dates
  y: number[]; // Values
  name: string;
}

function convertProcessedResultToMap(input: ProcessedResult): Map<string, number> {
  const output = new Map<string, number>();
  for (let idx = 0; idx < input.x.length && idx < input.y.length; idx++) {
    const date = input.x[idx];
    const value = input.y[idx];
    assertNotUndefined(date)
    assertNotUndefined(value)
    output.set(date, value);
  }

  return output;
}

function convertMapLayoutToArrayLayout(data: Map<string, Map<string, number>>): Map<string, ProcessedResult> {
  const result = new Map<string, ProcessedResult>()

  data.forEach((value, key) => {
    const x: string[] = [];
    const y: number[] = [];
    value.forEach((generation, date) => {
      x.push(date);
      y.push(generation);
    })

    result.set(key, {
      x: x,
      y: y,
      name: key,
    })

  });

  return result
}

function processRawData(data: GenerationRecord[]): Map<string, ProcessedResult> {
  const groupedData = groupByType(data)

  // Transform and sort data for each fuel type
  const result = new Map<string, ProcessedResult>();

  groupedData.forEach((value, key) => {
    // Sort data by period in ascending order
    value.sort((a, b) => a.period.localeCompare(b.period));

    const dates = value.map(item => item.period)
    const values = value.map(item => parseFloat(item.generation))

    if (dates.length != values.length) {
      throw new Error(key + " :date and value arrays are not the same length");
    }

    result.set(key, {
      x: dates,
      y: values,
      name: key,
    });
  });

  return result
}

// Takes in a map with keys, and a mergeMap that maps from oldKey to newKey. 
// Converts the data to use the new key.
// If more than one oldKey maps to a newKey, then merge the data for the same month.
function mergeCategories(data: Map<string, ProcessedResult>, mergeMap: Map<string, string>): Map<string, ProcessedResult> {
  const maps = new Map<string, Map<string, number>>();
  data.forEach((value, key) => {
    const dateToValueMap = convertProcessedResultToMap(value)

    const newKey = mergeMap.get(key)
    assertNotUndefined(newKey)

    if (maps.has(newKey)) {
      dateToValueMap.forEach((value, key) => {
        const newDateToValueMap = maps.get(newKey)
        assertNotUndefined(newDateToValueMap)
        const oldValue = newDateToValueMap.get(key)
        assertNotUndefined(oldValue)
        newDateToValueMap.set(key, oldValue + value)
      });

    } else {
      maps.set(newKey, dateToValueMap)
    }
  });
  return convertMapLayoutToArrayLayout(maps)
}

function convertToRolling(data: Map<string, ProcessedResult>, windowSize: number): Map<string, ProcessedResult> {
  const result = new Map<string, ProcessedResult>();

  data.forEach((value, key) => {
    const newX:string[] = [];
    const newY = [];

    let sum = 0;
    for (let i = 0; i < value.x.length; i++) {
      const valueToAddToWindow = value.y[i]
      assertNotUndefined(valueToAddToWindow)
      sum += valueToAddToWindow;

      if (i < windowSize - 1) {
        continue;
      }

      if (i > windowSize - 1) {
        const valueToFallOutOfWindow = value.y[i - windowSize];
        assertNotUndefined(valueToFallOutOfWindow)
        sum -= valueToFallOutOfWindow;
      }

      newY.push(sum);
      let date = value.x[i];
      assertNotUndefined(date)
      newX.push(date);
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


function calculateGrowth(data: Map<string, ProcessedResult>, windowSize: number): Map<string, ProcessedResult> {
  const result = new Map<string, ProcessedResult>();

  data.forEach((value, key) => {
    const newX:string[] = [];
    const newY:number[] = [];

    for (let i = windowSize; i < value.y.length; i++) {
      const currentValue = value.y[i];
      const oldValue = value.y[i - windowSize]
      assertNotUndefined(currentValue)
      assertNotUndefined(oldValue)

      const periods:number = windowSize / 12
      const cagr = ((Math.pow(currentValue / oldValue, 1 / periods) - 1));


      assertNotUndefined(cagr)
      let date = value.x[i];
      assertNotUndefined(date)
      newY.push(cagr);
      newX.push(date);
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

function calculateAbsoluteGrowth(data: Map<string, ProcessedResult>, windowSize: number): Map<string, ProcessedResult> {
  const result = new Map<string, ProcessedResult>();

  data.forEach((value, key) => {
    const newX: string[] = [];
    const newY: number[] = [];

    for (let i = windowSize; i < value.y.length; i++) {
      // Calculate absolute difference instead of percentage change
      const currentValue = value.y[i];
      const oldValue = value.y[i - windowSize]
      const date = value.x[i]
      assertNotUndefined(currentValue)
      assertNotUndefined(oldValue)
      assertNotUndefined(date)
      newY.push(currentValue - oldValue);
      newX.push(date);
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

function extendDataByGrowth(data: Map<string, ProcessedResult>, yearsToExtend = 5, lookback:number): Map<string, ProcessedResult> {
  const result = new Map<string, ProcessedResult>();
  const monthsToExtend = yearsToExtend * 12;

  data.forEach((value, key) => {
    const x = value.x.slice();
    const y = value.y.slice();

    const len = y.length;

    const startIndex = len - 1 - lookback;
    const startVal = y[startIndex];
    const endVal = y[len - 1];

    assertNotUndefined(endVal)
    assertNotUndefined(startVal)

    let monthlyFactor = 1;

    const periods = lookback;
    monthlyFactor = Math.pow(endVal / startVal, 1 / periods);

    let lastDate = x[len - 1];
    assertNotUndefined(lastDate)
    let lastVal = endVal;

    for (let m = 0; m < monthsToExtend; m++) {
      lastVal = lastVal * monthlyFactor;


      // increment month YYYY-MM
      const dateParts: string[] = lastDate.split('-')
      const yrStr = dateParts[0]
      const moStr = dateParts[1]
      assertNotUndefined(yrStr)
      assertNotUndefined(moStr)
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

function assertNotUndefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) {
    throw new Error("Value is undefined");
  }
}

function assertNotNull<T>(value: T | null): T {
  if (value === null) {
    throw new Error("Value is null");
  }
  return value
}



let lookbackWindow = 12; // Options are 1 or 12.
let rollingWindow = 12; // Options are 1 or 12.
let data = allSourceData;

let forcastLookbackWindow = 12;

function handleColumnSelect(x:number):void{
forcastLookbackWindow = x;
plotAll()
}

function plotAll():void {
  plotNetGen(plotNetGenDiv, convertToRolling(structuredClone(data), rollingWindow), "Net Generation by Source " + getRollingText());
  plotPercentGen(plotPercentGenDiv, convertToRolling(structuredClone(data), rollingWindow), "Percent Generation by Source " + getRollingText());
  plotPercentGrowth(plotPercentGrowthDiv, calculateGrowth(convertToRolling(structuredClone(data), rollingWindow), lookbackWindow), "Percent Growth " + getLookbackText());
  plotNetGen(plotAbsoluteGrowthDiv, calculateAbsoluteGrowth(convertToRolling(structuredClone(data), rollingWindow), lookbackWindow), "Absolute Value Growth " + getLookbackText());
  
  
  plotNetGen(plotForecastDiv, extendDataByGrowth(convertToRolling(structuredClone(data), 12), 5, forcastLookbackWindow), "Forecasted Net Generation by Source: Based on " + (lookbackWindow == 12 ? "Year-over-Year Change in Trailing 12 Month Growth" : "Monthly Change in Trailing 12 Month Growth"));

  calculateCAGRGrowth(convertToRolling(structuredClone(data), 12));
}


function handleSelection(radioButton:HTMLInputElement) {
  switch (radioButton.id) {
    case "category-option1":
      data = allSourceData;
      break;
    case "category-option2":
      data = twoSourceData;
      break;
    case "category-option3":
      data = threeSourceData;
      break;
  }
  plotAll();
}

function handleLookbackSelection(radioButton:HTMLInputElement) {
  // parse numeric lookback (e.g. "12 Month Lookback" -> 12)
  const parsed = parseInt(radioButton.value, 10);
  if (!isNaN(parsed)) {
    lookbackWindow = parsed;
  } else {
    lookbackWindow = 12; // default
  }
  plotAll();
}

function handleRollingSelection(radioButton:HTMLInputElement) {
  // parse numeric lookback (e.g. "12 Month Lookback" -> 12)
  const parsed = parseInt(radioButton.value, 10);
  if (!isNaN(parsed)) {
    rollingWindow = parsed;
  } else {
    rollingWindow = 12; // default
  }
  plotAll();
}






function getRollingText() {
  if (rollingWindow == 1) {return "(Monthly)"}
  if (rollingWindow == 12) {return "(Trailing 12 Month)"}
  throw new Error("getRollingText failed to match");
}

function getLookbackText() {
  if (rollingWindow == 1 && lookbackWindow == 1) { return "(Month-over-Month Growth)" }
  if (rollingWindow == 1 && lookbackWindow == 12) { return "(Year-over-Year Monthly Growth)" }
  if (rollingWindow == 12 && lookbackWindow == 1) { return "(Monthly Change in Trailing 12 Month)" }
  if (rollingWindow == 12 && lookbackWindow == 12) { return "(Year-over-Year Change in Trailing 12 Month Growth)" }
  throw new Error("getLookbackText failed to match");
}


function calculateCAGRGrowth(data: Map<string, ProcessedResult>) {
  const lookbacks = [1, 12, 24, 36]

  data.forEach((value, key) => {
    const y = value.y.slice();
    const len = y.length;
    // CAGR = (Ending Value / Beginning Value)^(1 / Number of Periods) - 1.
    lookbacks.forEach((lookback) => {

      const startIndex = len - 1 - lookback;
      const startVal = y[startIndex];
      const endVal = y[len - 1];

      assertNotUndefined(endVal)
      assertNotUndefined(startVal)

      const periods:number = lookback / 12

      const cagr = ((Math.pow(endVal / startVal, 1 / periods) - 1) * 100).toFixed(2) + "%";


      if (key == "Solar" && lookback == 1){document.getElementById('CAGR_SOLAR_1')!.textContent = cagr;}
      if (key == "Solar" && lookback == 12){document.getElementById('CAGR_SOLAR_12')!.textContent = cagr;}
      if (key == "Solar" && lookback == 24){document.getElementById('CAGR_SOLAR_24')!.textContent = cagr;}
      if (key == "Solar" && lookback == 36){document.getElementById('CAGR_SOLAR_36')!.textContent = cagr;}


      if (key == "Wind" && lookback == 1){document.getElementById('CAGR_WIND_1')!.textContent = cagr;}
      if (key == "Wind" && lookback == 12){document.getElementById('CAGR_WIND_12')!.textContent = cagr;}
      if (key == "Wind" && lookback == 24){document.getElementById('CAGR_WIND_24')!.textContent = cagr;}
      if (key == "Wind" && lookback == 36){document.getElementById('CAGR_WIND_36')!.textContent = cagr;}


      if (key == "Coal" && lookback == 1){document.getElementById('CAGR_COAL_1')!.textContent = cagr;}
      if (key == "Coal" && lookback == 12){document.getElementById('CAGR_COAL_12')!.textContent = cagr;}
      if (key == "Coal" && lookback == 24){document.getElementById('CAGR_COAL_24')!.textContent = cagr;}
      if (key == "Coal" && lookback == 36){document.getElementById('CAGR_COAL_36')!.textContent = cagr;}


      if (key == "Hydroelectric" && lookback == 1){document.getElementById('CAGR_HYDRO_1')!.textContent = cagr;}
      if (key == "Hydroelectric" && lookback == 12){document.getElementById('CAGR_HYDRO_12')!.textContent = cagr;}
      if (key == "Hydroelectric" && lookback == 24){document.getElementById('CAGR_HYDRO_24')!.textContent = cagr;}
      if (key == "Hydroelectric" && lookback == 36){document.getElementById('CAGR_HYDRO_36')!.textContent = cagr;}


      if (key == "Nuclear" && lookback == 1){document.getElementById('CAGR_NUCLEAR_1')!.textContent = cagr;}
      if (key == "Nuclear" && lookback == 12){document.getElementById('CAGR_NUCLEAR_12')!.textContent = cagr;}
      if (key == "Nuclear" && lookback == 24){document.getElementById('CAGR_NUCLEAR_24')!.textContent = cagr;}
      if (key == "Nuclear" && lookback == 36){document.getElementById('CAGR_NUCLEAR_36')!.textContent = cagr;}


      if (key == "Natural Gas" && lookback == 1){document.getElementById('CAGR_NATGAS_1')!.textContent = cagr;}
      if (key == "Natural Gas" && lookback == 12){document.getElementById('CAGR_NATGAS_12')!.textContent = cagr;}
      if (key == "Natural Gas" && lookback == 24){document.getElementById('CAGR_NATGAS_24')!.textContent = cagr;}
      if (key == "Natural Gas" && lookback == 36){document.getElementById('CAGR_NATGAS_36')!.textContent = cagr;}
    });
  });
}