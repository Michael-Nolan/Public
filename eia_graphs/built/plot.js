"use strict";
function plotNetGen(name, data, plotTitle) {
    data = structuredClone(data);
    let dd = [];
    data.forEach((value, key) => {
        value["type"] = "scatter";
        dd.push(value);
    });
    Plotly.newPlot(name, dd, buildLayout(name, plotTitle), makePlotConfig());
}
function plotPercentGen(name, data, plotTitle) {
    data = structuredClone(data);
    let dd = [];
    data.forEach((value, key) => {
        value["type"] = "scatter";
        value["groupnorm"] = "percent";
        value["stackgroup"] = "one";
        dd.push(value);
    });
    let layout = buildLayout(name, plotTitle);
    Plotly.newPlot(name, dd, layout, makePlotConfig());
}
function plotPercentGrowth(name, data, plotTitle) {
    data = structuredClone(data);
    let dd = [];
    data.forEach((value, key) => {
        value["type"] = "scatter";
        dd.push(value);
    });
    let layout = buildLayout(name, plotTitle);
    layout.yaxis.tickformat = '.2%';
    Plotly.newPlot(name, dd, layout, makePlotConfig());
}
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
    const red = 'rgba(255,0,0,0.08)';
    const blue = 'rgba(0,0,255,0.08)';
    const presidencies = [
        { start: '2001-01', end: '2009-01', color: red }, // Bush (R)
        { start: '2009-01', end: '2017-01', color: blue }, // Obama (D)
        { start: '2017-01', end: '2021-01', color: red }, // Trump (R)
        { start: '2021-01', end: '2025-01', color: blue }, // Biden (D)
        { start: '2025-01', end: '2025-09', color: red }, // Trump (R)
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
            fixedrange: false, // Allow zooming on x-axis
            minallowed: "2001-01",
        },
        yaxis: {
            title: {
                text: yAxisMap.get(divName),
            },
            fixedrange: true // Prevent direct y-axis zooming
        },
        paper_bgcolor: "#f6f3ef",
        ...(!excludeOverlay.includes(divName) ? { shapes } : {})
    };
}
