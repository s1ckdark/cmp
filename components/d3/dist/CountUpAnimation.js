'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var d3 = require("d3");
var CountUpAnimation = function (_a) {
    var endValue = _a.endValue, duration = _a.duration;
    var countUpRef = react_1.useRef(null);
    var fomatter = function (d) {
        return ("" + d).length > 4 ? d3.format(',')(d) : d3.format('d')(d);
    };
    react_1.useEffect(function () {
        var svg = d3.select(countUpRef.current)
            .attr('width', 360)
            .attr('height', 72);
        svg.append('text')
            .attr('x', 180)
            .attr('y', 50)
            .style('text-anchor', 'middle')
            // .style('font-size', '60px')
            // .style('fill', 'black')
            .text('0')
            .transition()
            .duration(duration) // Animation duration in milliseconds
            .tween('text', function () {
            var _a;
            var startValue = parseFloat((_a = this.textContent) !== null && _a !== void 0 ? _a : '0');
            var endValueParsed = parseFloat(endValue.toString());
            var interpolator = d3.interpolateNumber(startValue, endValueParsed);
            return function (t) {
                this.textContent = fomatter(Math.round(interpolator(t)).toFixed(0));
            };
        });
    }, [endValue]);
    return react_1["default"].createElement("svg", { ref: countUpRef });
};
exports["default"] = CountUpAnimation;
