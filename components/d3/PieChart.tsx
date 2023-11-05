'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up the dimensions and radius for the pie chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Create a D3 arc generator for the pie slices
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Create a D3 pie layout
    const pie = d3.pie().value((d) => d.value);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Generate the pie slices
    const arcs = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => {
        // You can customize the colors based on your data
        const colors = ['red', 'blue', 'green', 'orange', 'purple'];
        return colors[i];
      });

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default PieChart;
