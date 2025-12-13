"use strict";
const plotNetGenDiv = "plotNetGenDiv";
const plotPercentGenDiv = "plotPercentGenDiv";
const plotPercentGrowthDiv = "plotPercentGrowthDiv";
const plotAbsoluteGrowthDiv = "plotAbsoluteGrowthDiv";
const plotPercentGrowthAccelerationDiv = "plotPercentGrowthAccelerationDiv";
const plotAbsoluteGrowthAccelerationDiv = "plotAbsoluteGrowthAccelerationDiv";
const plotForecastDiv = "plotForecastDiv";
const yAxisMap = deepFreeze(new Map([
    [plotNetGenDiv, '1,000 mwh'],
    [plotPercentGenDiv, 'Percent'],
    [plotPercentGrowthDiv, 'Percent'],
    [plotAbsoluteGrowthDiv, '1,000 mwh'],
    [plotPercentGrowthAccelerationDiv, 'percentage point'],
    [plotAbsoluteGrowthAccelerationDiv, '1,000 mwh'],
    [plotForecastDiv, '1,000 mwh'],
]));
const nameMap = deepFreeze(new Map([
    ['all coal products', 'Coal'],
    ['wind', 'Wind'],
    ['estimated total solar', 'Solar'],
    ['nuclear', 'Nuclear'],
    ['natural gas & other gases', 'Natural Gas'],
    ['conventional hydroelectric', 'Hydroelectric']
]));
const cat3MergeMap = deepFreeze(new Map([
    ['Coal', 'Fossil Fuels'],
    ['Wind', 'Renewables'],
    ['Solar', 'Renewables'],
    ['Nuclear', 'Nuclear'],
    ['Natural Gas', 'Fossil Fuels'],
    ['Hydroelectric', 'Renewables']
]));
const cat2MergeMap = deepFreeze(new Map([
    ['Coal', 'Fossil Fuels'],
    ['Wind', 'Carbon Free'],
    ['Solar', 'Carbon Free'],
    ['Nuclear', 'Carbon Free'],
    ['Natural Gas', 'Fossil Fuels'],
    ['Hydroelectric', 'Carbon Free']
]));
const allSourceData = deepFreeze(processRawData(rawData.response.data));
const twoSourceData = deepFreeze(mergeCategories(allSourceData, cat2MergeMap));
const threeSourceData = deepFreeze(mergeCategories(allSourceData, cat3MergeMap));
// Global State
let lookbackWindow = 12; // Options are 1 or 12.
let rollingWindow = 12; // Options are 1 or 12.
let data = allSourceData;
let forcastLookbackWindow = 12;
function groupByType(data) {
    const groupedData = new Map();
    data.forEach(item => {
        const fuelType = nameMap.get(item.fuelTypeDescription);
        assertNotUndefined(fuelType);
        if (!groupedData.has(fuelType)) {
            groupedData.set(fuelType, []);
        }
        const obj = groupedData.get(fuelType);
        assertNotUndefined(obj);
        obj.push(item);
    });
    return deepFreeze(groupedData);
}
function convertProcessedResultToMap(input) {
    const output = new Map();
    for (let idx = 0; idx < input.x.length && idx < input.y.length; idx++) {
        const date = input.x[idx];
        const value = input.y[idx];
        assertNotUndefined(date);
        assertNotUndefined(value);
        output.set(date, value);
    }
    return deepFreeze(output);
}
function convertMapLayoutToArrayLayout(data) {
    const result = new Map();
    data.forEach((value, key) => {
        const x = [];
        const y = [];
        value.forEach((generation, date) => {
            x.push(date);
            y.push(generation);
        });
        result.set(key, {
            x: x,
            y: y,
            name: key,
        });
    });
    return deepFreeze(result);
}
function processRawData(data) {
    const groupedData = groupByType(data);
    // Transform and sort data for each fuel type
    const result = new Map();
    groupedData.forEach((value, key) => {
        const dates = value.map(item => item.period);
        const values = value.map(item => parseFloat(item.generation));
        if (dates.length != values.length) {
            throw new Error(key + " :date and value arrays are not the same length");
        }
        result.set(key, {
            x: dates,
            y: values,
            name: key,
        });
    });
    return deepFreeze(result);
}
// Takes in a map with keys, and a mergeMap that maps from oldKey to newKey. 
// Converts the data to use the new key.
// If more than one oldKey maps to a newKey, then merge the data for the same month.
function mergeCategories(data, mergeMap) {
    const maps = new Map();
    data.forEach((value, key) => {
        const dateToValueMap = convertProcessedResultToMap(value);
        const newKey = mergeMap.get(key);
        assertNotUndefined(newKey);
        if (maps.has(newKey)) {
            dateToValueMap.forEach((value, key) => {
                const newDateToValueMap = maps.get(newKey);
                assertNotUndefined(newDateToValueMap);
                const oldValue = newDateToValueMap.get(key);
                assertNotUndefined(oldValue);
                newDateToValueMap.set(key, oldValue + value);
            });
        }
        else {
            maps.set(newKey, dateToValueMap);
        }
    });
    return convertMapLayoutToArrayLayout(maps);
}
function convertToRolling(data, windowSize) {
    const result = new Map();
    data.forEach((value, key) => {
        const newX = [];
        const newY = [];
        let sum = 0;
        for (let i = 0; i < value.x.length; i++) {
            const valueToAddToWindow = value.y[i];
            assertNotUndefined(valueToAddToWindow);
            sum += valueToAddToWindow;
            if (i < windowSize - 1) {
                continue;
            }
            if (i > windowSize - 1) {
                const valueToFallOutOfWindow = value.y[i - windowSize];
                assertNotUndefined(valueToFallOutOfWindow);
                sum -= valueToFallOutOfWindow;
            }
            newY.push(sum);
            let date = value.x[i];
            assertNotUndefined(date);
            newX.push(date);
        }
        // Assign to result
        result.set(key, {
            x: newX,
            y: newY,
            name: key,
        });
    });
    return deepFreeze(result);
}
function calculatePercentGrowth(data, lookback, windowSize) {
    const result = new Map();
    data.forEach((value, key) => {
        const newX = [];
        const newY = [];
        for (let i = lookback; i < value.y.length; i++) {
            const currentValue = value.y[i];
            const oldValue = value.y[i - lookback];
            assertNotUndefined(currentValue);
            assertNotUndefined(oldValue);
            let date = value.x[i];
            assertNotUndefined(date);
            const periods = lookback / 12;
            let growth = ((Math.pow(currentValue / oldValue, 1 / periods) - 1));
            // CAGR gives wildly misleading results on non rolling data
            if (windowSize < 12) {
                growth = (currentValue - oldValue) / oldValue;
            }
            newY.push(growth);
            newX.push(date);
        }
        // Assign to result
        result.set(key, {
            x: newX,
            y: newY,
            name: key,
        });
    });
    return deepFreeze(result);
}
function times100(data) {
    const result = structuredClone(data);
    result.forEach((value) => {
        value.y.map((v, i) => { value.y[i] = v * 100; });
    });
    return deepFreeze(result);
}
function calculateAbsoluteGrowth(data, windowSize) {
    const result = new Map();
    data.forEach((value, key) => {
        const newX = [];
        const newY = [];
        for (let i = windowSize; i < value.y.length; i++) {
            // Calculate absolute difference instead of percentage change
            const currentValue = value.y[i];
            const oldValue = value.y[i - windowSize];
            const date = value.x[i];
            assertNotUndefined(currentValue);
            assertNotUndefined(oldValue);
            assertNotUndefined(date);
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
    return deepFreeze(result);
}
function extendDataByGrowth(data, yearsToExtend = 5, lookback) {
    const result = new Map();
    const monthsToExtend = yearsToExtend * 12;
    data.forEach((value, key) => {
        const x = value.x.slice();
        const y = value.y.slice();
        const len = y.length;
        const startIndex = len - 1 - lookback;
        const startVal = y[startIndex];
        const endVal = y[len - 1];
        assertNotUndefined(endVal);
        assertNotUndefined(startVal);
        let monthlyFactor = 1;
        const periods = lookback;
        monthlyFactor = Math.pow(endVal / startVal, 1 / periods);
        let lastDate = x[len - 1];
        assertNotUndefined(lastDate);
        let lastVal = endVal;
        for (let m = 0; m < monthsToExtend; m++) {
            lastVal = lastVal * monthlyFactor;
            // increment month YYYY-MM
            const dateParts = lastDate.split('-');
            const yrStr = dateParts[0];
            const moStr = dateParts[1];
            assertNotUndefined(yrStr);
            assertNotUndefined(moStr);
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
    return deepFreeze(result);
}
function assertNotUndefined(value) {
    if (value === undefined) {
        throw new Error("Value is undefined");
    }
}
function assertNotNull(value) {
    if (value === null) {
        throw new Error("Value is null");
    }
    return value;
}
function handleColumnSelect(x) {
    forcastLookbackWindow = x;
    plotAll();
}
function plotAll() {
    const rollingData = deepFreeze(convertToRolling(data, rollingWindow));
    const rollingData12 = deepFreeze(convertToRolling(data, 12));
    const percentGrowthData = deepFreeze(calculatePercentGrowth(rollingData, lookbackWindow, rollingWindow));
    const absoluteGrowthData = deepFreeze(calculateAbsoluteGrowth(rollingData, lookbackWindow));
    const percentAcceleration = deepFreeze(times100(calculateAbsoluteGrowth(calculatePercentGrowth(rollingData12, 12, 12), 12)));
    const absoluteAcceleration = deepFreeze(calculateAbsoluteGrowth(calculateAbsoluteGrowth(rollingData12, 12), 12));
    plotNetGen(plotNetGenDiv, rollingData, "Net Generation by Source " + getRollingText());
    plotPercentGen(plotPercentGenDiv, rollingData, "Percent Generation by Source " + getRollingText());
    plotPercentGrowth(plotPercentGrowthDiv, percentGrowthData, "Percent Growth " + getLookbackText());
    plotNetGen(plotAbsoluteGrowthDiv, absoluteGrowthData, "Absolute Value Growth " + getLookbackText());
    plotNetGen(plotPercentGrowthAccelerationDiv, percentAcceleration, "Acceleration of Percent Growth");
    plotNetGen(plotAbsoluteGrowthAccelerationDiv, absoluteAcceleration, "Acceleration of Absolute Growth");
    plotNetGen(plotForecastDiv, extendDataByGrowth(rollingData12, 5, forcastLookbackWindow), "Five Year Forecasted Net Generation by Source: Based on " + getForecastText());
    calculateCAGRGrowth(rollingData12);
}
function handleSelection(radioButton) {
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
function handleLookbackSelection(radioButton) {
    // parse numeric lookback (e.g. "12 Month Lookback" -> 12)
    const parsed = parseInt(radioButton.value, 10);
    if (!isNaN(parsed)) {
        lookbackWindow = parsed;
    }
    else {
        lookbackWindow = 12; // default
    }
    plotAll();
}
function handleRollingSelection(radioButton) {
    // parse numeric lookback (e.g. "12 Month Lookback" -> 12)
    const parsed = parseInt(radioButton.value, 10);
    if (!isNaN(parsed)) {
        rollingWindow = parsed;
    }
    else {
        rollingWindow = 12; // default
    }
    plotAll();
}
function getRollingText() {
    if (rollingWindow == 1) {
        return "(Monthly)";
    }
    if (rollingWindow == 12) {
        return "(Trailing 12 Month)";
    }
    throw new Error("getRollingText failed to match");
}
function getLookbackText() {
    if (rollingWindow == 1 && lookbackWindow == 1) {
        return "(Month-over-Month Growth)";
    }
    if (rollingWindow == 1 && lookbackWindow == 12) {
        return "(Year-over-Year Monthly Growth)";
    }
    if (rollingWindow == 12 && lookbackWindow == 1) {
        return "(Monthly Change in Trailing 12 Month)";
    }
    if (rollingWindow == 12 && lookbackWindow == 12) {
        return "(Year-over-Year Change in Trailing 12 Month Growth)";
    }
    throw new Error("getLookbackText failed to match");
}
function getForecastText() {
    if (forcastLookbackWindow == 1) {
        return "(Monthly Change in Trailing 12 Month)";
    }
    if (forcastLookbackWindow == 12) {
        return "(Year-over-Year Change in Trailing 12 Month Growth)";
    }
    if (forcastLookbackWindow == 24) {
        return "(Two Year Change in Trailing 12 Month Growth)";
    }
    if (forcastLookbackWindow == 36) {
        return "(Three Year Change in Trailing 12 Month Growth)";
    }
    throw new Error("getForecastText failed to match");
}
function calculateCAGRGrowth(data) {
    const lookbacks = [1, 12, 24, 36];
    data.forEach((value, key) => {
        const y = value.y.slice();
        const len = y.length;
        // CAGR = (Ending Value / Beginning Value)^(1 / Number of Periods) - 1.
        lookbacks.forEach((lookback) => {
            const startIndex = len - 1 - lookback;
            const startVal = y[startIndex];
            const endVal = y[len - 1];
            assertNotUndefined(endVal);
            assertNotUndefined(startVal);
            const periods = lookback / 12;
            const cagr = ((Math.pow(endVal / startVal, 1 / periods) - 1) * 100).toFixed(2) + "%";
            if (key == "Solar" && lookback == 1) {
                document.getElementById('CAGR_SOLAR_1').textContent = cagr;
            }
            if (key == "Solar" && lookback == 12) {
                document.getElementById('CAGR_SOLAR_12').textContent = cagr;
            }
            if (key == "Solar" && lookback == 24) {
                document.getElementById('CAGR_SOLAR_24').textContent = cagr;
            }
            if (key == "Solar" && lookback == 36) {
                document.getElementById('CAGR_SOLAR_36').textContent = cagr;
            }
            if (key == "Wind" && lookback == 1) {
                document.getElementById('CAGR_WIND_1').textContent = cagr;
            }
            if (key == "Wind" && lookback == 12) {
                document.getElementById('CAGR_WIND_12').textContent = cagr;
            }
            if (key == "Wind" && lookback == 24) {
                document.getElementById('CAGR_WIND_24').textContent = cagr;
            }
            if (key == "Wind" && lookback == 36) {
                document.getElementById('CAGR_WIND_36').textContent = cagr;
            }
            if (key == "Coal" && lookback == 1) {
                document.getElementById('CAGR_COAL_1').textContent = cagr;
            }
            if (key == "Coal" && lookback == 12) {
                document.getElementById('CAGR_COAL_12').textContent = cagr;
            }
            if (key == "Coal" && lookback == 24) {
                document.getElementById('CAGR_COAL_24').textContent = cagr;
            }
            if (key == "Coal" && lookback == 36) {
                document.getElementById('CAGR_COAL_36').textContent = cagr;
            }
            if (key == "Hydroelectric" && lookback == 1) {
                document.getElementById('CAGR_HYDRO_1').textContent = cagr;
            }
            if (key == "Hydroelectric" && lookback == 12) {
                document.getElementById('CAGR_HYDRO_12').textContent = cagr;
            }
            if (key == "Hydroelectric" && lookback == 24) {
                document.getElementById('CAGR_HYDRO_24').textContent = cagr;
            }
            if (key == "Hydroelectric" && lookback == 36) {
                document.getElementById('CAGR_HYDRO_36').textContent = cagr;
            }
            if (key == "Nuclear" && lookback == 1) {
                document.getElementById('CAGR_NUCLEAR_1').textContent = cagr;
            }
            if (key == "Nuclear" && lookback == 12) {
                document.getElementById('CAGR_NUCLEAR_12').textContent = cagr;
            }
            if (key == "Nuclear" && lookback == 24) {
                document.getElementById('CAGR_NUCLEAR_24').textContent = cagr;
            }
            if (key == "Nuclear" && lookback == 36) {
                document.getElementById('CAGR_NUCLEAR_36').textContent = cagr;
            }
            if (key == "Natural Gas" && lookback == 1) {
                document.getElementById('CAGR_NATGAS_1').textContent = cagr;
            }
            if (key == "Natural Gas" && lookback == 12) {
                document.getElementById('CAGR_NATGAS_12').textContent = cagr;
            }
            if (key == "Natural Gas" && lookback == 24) {
                document.getElementById('CAGR_NATGAS_24').textContent = cagr;
            }
            if (key == "Natural Gas" && lookback == 36) {
                document.getElementById('CAGR_NATGAS_36').textContent = cagr;
            }
        });
    });
}
