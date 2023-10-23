'use client';
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CountUpAnimation: React.FC<{ endValue: number, duration: number }> = ({ endValue, duration }) => {
  const countUpRef = useRef(null);

  const fomatter = (d)=>{
    return (""+d).length > 4 ? d3.format(',')(d) : d3.format('d')(d);
  }
  
  useEffect(() => {
    const svg = d3.select(countUpRef.current)
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
        const startValue = parseFloat(this.textContent ?? '0');
        const endValueParsed = parseFloat(endValue.toString());
        const interpolator = d3.interpolateNumber(startValue, endValueParsed);
        return function (t: number) {
          this.textContent = fomatter(Math.round(interpolator(t)).toFixed(0));
        };
      });
  }, [endValue]);

  return <svg ref={countUpRef}></svg>;
};

export default CountUpAnimation;

