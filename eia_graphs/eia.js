function processRawData() {
    rawData.response.data.sort((a, b) => a.period.localeCompare(b.period));


    const groupedData = new Map(); 

    rawData.response.data.forEach(item => {
        const fuelType = item.fuelTypeDescription;
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
            x:dates,
            y:values,
            name: key,
        });
    });

    return result
}

function plotNetGenMonthly(data){
    var dd = [];
    data.forEach((value, key) => {
        value["type"] = "scatter"
        dd.push(value)
    }); 

    const myplot = document.getElementById('plotNetGenMonthly');
    var layout = {
        title: {
          text: 'Net Generation by Source'
        },
        xaxis: {
          title: {
            text: 'month'
          },
          fixedrange: false  // Allow zooming on x-axis
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
          filename: 'plotNetGenMonthly',
          scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        },
        scrollZoom: true
      };

    Plotly.newPlot('plotNetGenMonthly', dd, layout, config);
}

function plotPercentGenMonthly(data){
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
          }
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
          filename: 'plotPercentGenMonthly',
          scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        },
        scrollZoom: true
      };

    Plotly.newPlot('plotPercentGenMonthly', dd, layout, config);
}


function convertToRolling(data){
    const result = new Map(); 

    data.forEach((value, key) => {
        newX = [];
        newY = [];

        var sum = 0;
        for (let i = 0; i < value.x.length; i++) {
           sum += value.y[i];

            if (i < 11){
                continue;
            }
            
            if (i > 11) {
                sum -= value.y[i-12];
            }
            
            newY.push(sum);
            newX.push(value.x[i]);
        }

        // Assign to result
        result.set(key, {
            x:newX,
            y:newY,
            name: key,
        });
    });

    return result;
}

function plotNetGenRolling(data){
    var dd = [];
    data.forEach((value, key) => {
        value["type"] = "scatter"
        dd.push(value)
    }); 

    const myplot = document.getElementById('plotNetGenRolling');
    var layout = {
        title: {
          text: 'Net Generation by Source (12 Month Rolling)'
        },
        xaxis: {
          title: {
            text: 'month'
          },
          fixedrange: false  // Allow zooming on x-axis
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
          filename: 'plotNetGenRolling',
          scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        },
        scrollZoom: true
      };

    Plotly.newPlot('plotNetGenRolling', dd, layout, config);
}

function plotPercentGenRolling(data){
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
          }
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
          filename: 'plotPercentGenRolling',
          scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        },
        scrollZoom: true
      };

    Plotly.newPlot('plotPercentGenRolling', dd, layout, config);
}