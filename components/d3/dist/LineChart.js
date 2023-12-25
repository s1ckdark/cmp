'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var d3 = require("d3");
var LineChart = function (_a) {
    var data = _a.data, _b = _a.width, width = _b === void 0 ? 600 : _b, _c = _a.height, height = _c === void 0 ? 400 : _c;
    var svgRef = react_1.useRef();
    var _d = react_1.useState(null), hoveredValue = _d[0], setHoveredValue = _d[1];
    var _e = react_1.useState({ x: 0, y: 0 }), tooltipPosition = _e[0], setTooltipPosition = _e[1];
    var _f = react_1.useState(false), isHovering = _f[0], setIsHovering = _f[1];
    var _g = react_1.useState(null), activeTooltip = _g[0], setActiveTooltip = _g[1];
    var handleMouseOver = function (event, d) {
        var _a = d3.pointer(event), x = _a[0], y = _a[1];
        setHoveredValue(d.sales);
        setTooltipPosition({ x: x, y: y - 30 }); // Position the tooltip 30 pixels above the mouse pointer
        setActiveTooltip(d); // Set the currently active tooltip
        setIsHovering(true);
    };
    var handleMouseOut = function () {
        setHoveredValue(null);
        setActiveTooltip(null); // Clear the active tooltip when mouse moves out
        setIsHovering(false);
    };
    react_1.useEffect(function () {
        var margin = { top: 20, right: 30, bottom: 30, left: 40 };
        var innerWidth = width - margin.left - margin.right;
        var innerHeight = height - margin.top - margin.bottom;
        var svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");
        var x = d3.scaleLinear()
            .domain([1, 12])
            .range([0, innerWidth]);
        var y = d3.scaleLinear()
            .domain([0, d3.max(data.flatMap(function (series) { return series.data; }), function (d) { return d.sales; })])
            .nice()
            .range([innerHeight, 0]);
        var line = d3.line()
            // .defined(d => !isNaN(d.sales))
            .x(function (d) { return x(d.month); })
            .y(function (d) { return y(d.sales); });
        // .y(innerHeight) // Start the line at the bottom
        // .curve(d3.curveMonotoneX); // Add a curve for smoother animation
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var transitionPath = d3
            .transition()
            .ease(d3.easeSin)
            .duration(2500);
        var xAxis = function (g) { return g
            .attr('transform', "translate(0," + innerHeight + ")")
            .call(d3.axisBottom(x)); };
        var yAxis = function (g) { return g
            // .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y)); };
        // Create the grid line functions.
        var xGrid = function (g) { return g
            .attr('class', 'grid-lines')
            .selectAll('line')
            .data(x.ticks())
            .join('line')
            .attr('x1', function (d) { return x(d); })
            .attr('x2', function (d) { return x(d); })
            .attr('y1', margin.top)
            .attr('y2', height - margin.bottom); };
        var yGrid = function (g) { return g
            .attr('class', 'grid-lines')
            .selectAll('line')
            .data(y.ticks())
            .join('line')
            .attr("stroke", "gray")
            .attr("opacity", 0.2)
            .attr("stroke-width", 2)
            .attr('x1', 0)
            .attr('x2', width - margin.right)
            .attr('x2', width)
            .attr('y1', function (d) { return y(d); })
            .attr('y2', function (d) { return y(d); }); };
        var transitionDuration = 2000;
        data.forEach(function (series, index) {
            // Draw the line
            var linePath = svg.append('path')
                .datum(series.data)
                .attr('d', line)
                .attr('fill', 'none')
                .attr('stroke', color(index))
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', function () {
                var length = this.getTotalLength();
                return length + " " + length;
            })
                .attr('stroke-dashoffset', function () {
                return this.getTotalLength();
            })
                .transition()
                .duration(transitionDuration)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0);
            // Add point circles for this data series with hover effect
            svg.selectAll(".circle-" + index)
                .data(series.data)
                .enter()
                .append('circle')
                .attr('cx', function (d) { return x(d.month); })
                .attr('cy', function (d) { return y(d.sales); })
                .attr('r', 4) // Adjust the radius of the circles
                .attr('fill', color(index))
                .attr('class', "circle-" + index)
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut);
        });
        // Add X and Y axes
        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        // Add X and Y grid lines
        // svg.append('g').call(xGrid);
        svg.append('g').call(yGrid);
        // Create a legend
        var legend = svg.append('g')
            .attr('transform', "translate(" + (innerWidth + 10) + ",-40)");
        var legendSpacing = 120; // Adjust as needed
        var legendOffset = -40; // Adjust as needed
        data.forEach(function (series, index) {
            var legendItem = legend.append('g')
                .attr('transform', "translate(-" + index * legendSpacing + "," + 0 + ")");
            legendItem.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', color(index));
            legendItem.append('text')
                .attr('x', 15)
                .attr('y', 6)
                .attr('font-size', '11px')
                .attr('dy', '0.32em')
                .text(series.name);
        });
        // Remove the tooltip when hoveredValue is null
        if (isHovering && hoveredValue !== null) {
            svg.append('text')
                .attr('x', tooltipPosition.x) // Position based on mouse coordinates
                .attr('y', tooltipPosition.y) // Position based on mouse coordinates
                .attr('class', 'hovered-value')
                .text("Hovered Value: " + hoveredValue);
        }
        else {
            svg.selectAll('.hovered-value').remove();
        }
    }, [data, width, height, hoveredValue, isHovering, tooltipPosition]);
    return (react_1["default"].createElement("svg", { ref: svgRef }));
};
exports["default"] = LineChart;
