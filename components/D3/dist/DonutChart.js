'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var d3 = require("d3");
var DonutChart = function (_a) {
    var data = _a.data, title = _a.title;
    var svgRef = react_1.useRef();
    react_1.useEffect(function () {
        // Set up the dimensions and radius for the donut chart
        var width = 320;
        var height = 320;
        var radius = Math.min(width, height) / 2;
        // Create a D3 arc generator for the donut slices
        var arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1);
        var color = d3.scaleOrdinal()
            .domain(data.map(function (d) { return d.name; }))
            .range(d3.quantize(function (t) { return d3.interpolateSpectral(t * 0.8 + 0.1); }, data.length).reverse());
        // Create a D3 pie layout
        var pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(function (d) { return d.value; });
        var svg = d3.select(svgRef.current)
            .append('svg')
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");
        svg.append("svg:text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .text(title);
        svg.append("g")
            .selectAll()
            .data(pie(data))
            .join("path")
            .attr("fill", function (d) { return color(d.data.name); })
            .attr("d", arc)
            .append("title")
            .text(function (d) { return d.data.name + ": " + d.data.value.toLocaleString(); });
        svg.append("g")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll()
            .data(pie(data))
            .join("text")
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .call(function (text) { return text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(function (d) { return d.data.name; }); })
            .call(function (text) { return text.filter(function (d) { return (d.endAngle - d.startAngle) > 0.25; }).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(function (d) { return d.data.value.toLocaleString("en-US"); }); });
        var legend = d3.select(svgRef.current)
            .append('ul')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li');
        legend.append('span')
            .style('background-color', function (d, i) { return color(d.name); })
            .style('display', 'inline-block')
            .style('width', '1rem')
            .style('height', '1rem');
        legend.append('span')
            .text(function (d) { return d.name + ": " + d.value.toLocaleString(); });
    }, [data]);
    return (react_1["default"].createElement("div", { className: "donutChart", ref: svgRef }));
};
exports["default"] = DonutChart;
