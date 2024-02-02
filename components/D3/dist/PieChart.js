'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var d3 = require("d3");
var PieChart = function (_a) {
    var data = _a.data;
    var svgRef = react_1.useRef();
    react_1.useEffect(function () {
        // Set up the dimensions and radius for the pie chart
        var width = 300;
        var height = 300;
        var radius = Math.min(width, height) / 2;
        // Create a D3 arc generator for the pie slices
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        // Create a D3 pie layout
        var pie = d3.pie().value(function (d) { return d.value; });
        var svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")");
        // Generate the pie slices
        var arcs = svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d, i) {
            // You can customize the colors based on your data
            var colors = ['red', 'blue', 'green', 'orange', 'purple'];
            return colors[i];
        });
    }, [data]);
    return (react_1["default"].createElement("svg", { ref: svgRef }));
};
exports["default"] = PieChart;
