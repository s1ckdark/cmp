'use client';
"use strict";
exports.__esModule = true;
var d3 = require("d3");
var react_1 = require("react");
var BarChart = function (_a) {
    var data = _a.data, width = _a.width, height = _a.height, title = _a.title;
    var ref = react_1.useRef(null);
    react_1.useEffect(function () {
        var svg = d3.select(ref.current);
        var margin = { top: 20, right: 20, bottom: 30, left: 40 };
        var width = 500 - margin.left - margin.right;
        var height = 250 - margin.top - margin.bottom;
        var xScale = d3.scaleBand().domain(data.map(function (d) { return d.day; })).range([0, width]).padding(0.5);
        var yScale = d3.scaleLinear().domain(d3.extent(data, function (d) { return d.sales; })).nice().range([height, 0]);
        var g = svg.append('g').attr('transform', "translate(" + margin.left + "," + margin.top + ")");
        // Add X grid lines
        g.append('g')
            .attr('class', 'grid')
            .attr('transform', "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)
            .tickSize(-height)
            .tickFormat(function () { return ''; }) // Remove tick labels
        )
            .selectAll('line')
            .attr('stroke', '#e5e5e5'); // Style the grid lines
        g.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(function () { return ''; }) // Remove tick labels
        )
            .selectAll('line')
            .attr('stroke', '#e5e5e5'); // Style the grid lines
        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function (d) { return xScale(d.day) || 0; }) // Use a default value of 0 if xScale(d.day) is undefined
            .attr('y', function (d) { return yScale(d.sales); })
            .attr('width', xScale.bandwidth())
            .attr('height', function (d) { return height - yScale(d.sales); })
            .attr('fill', 'blue');
        // Add the X Axis
        g.append('g')
            .attr('transform', "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        // Add the Y Axis
        g.append('g')
            .call(d3.axisLeft(yScale));
    }, [data]);
    return (React.createElement("svg", { ref: ref, width: 500, height: 250 }));
};
exports["default"] = BarChart;
