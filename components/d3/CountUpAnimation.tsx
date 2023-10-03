import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CountUpAnimation: React.FC<{ endValue: number }> = ({ endValue }) => {
  const countUpRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(countUpRef.current)
      .append('svg')
      .attr('width', 200)
      .attr('height', 100);

    svg.append('text')
      .attr('x', 100)
      .attr('y', 50)
      .style('text-anchor', 'middle')
      .style('font-size', '36px')
      .style('fill', 'black')
      .text('0');

    svg.transition()
      .duration(2000) // Animation duration in milliseconds
      .tween('text', function () {
        const startValue = parseFloat(this.textContent);
        const endValueParsed = parseFloat(endValue.toString());

        const interpolator = d3.interpolateNumber(startValue, endValueParsed);

        return function (t: number) {
          this.textContent = interpolator(t).toFixed(0);
        };
      });
  }, [endValue]);

  return <div ref={countUpRef}></div>;
};

export default CountUpAnimation;