'use client';
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CountUpAnimation: React.FC<{ endValue: number, duration: number}> = ({ endValue, duration}) => {
  const ref = useRef(null);

  const fomatter = (d: any) => {
    return ("" + d).length > 4 ? d3.format(',')(d) : d3.format('d')(d);
  }

  useEffect(() => {
    const node = d3.select(ref.current);
    node.transition()
        .duration(duration)
        .tween('text', function() {
            const that = d3.select(this);
            const i = d3.interpolateNumber(0, endValue);
            return function(t) {
                that.text(fomatter(Math.round(i(t))));
            };
        });
}, [endValue, duration]);

  return <div ref={ref}>0</div>;
};

export default CountUpAnimation;

