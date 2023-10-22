import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DonutChart } from '@/types/data';

const DonutChart: React.FC<{ data: Array<DonutChart>, title: string }> = ({ data, title }) => {
  const svgRef = useRef();
  useEffect(() => {
    // Set up the dimensions and radius for the donut chart
    const width = 320;
    const height = 320;
    const radius = Math.min(width, height) / 2;

    // Create a D3 arc generator for the donut slices
    const arc = d3.arc()
        .innerRadius(radius * 0.67)
        .outerRadius(radius - 1);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
  
    // Create a D3 pie layout
    const pie = d3.pie<{ value: number }>()
        .padAngle(1 / radius)
        .sort(null)
        .value(d => d.value);

    const svg = d3.select(svgRef.current)
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

    svg.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("font-size","14px")
    .text(title);

    svg.append("g")
    .selectAll()
    .data(pie(data))
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg.append("g")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll()
    .data(pie(data))
    .join("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.name))
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.value.toLocaleString("en-US")));

    const legend = d3.select(svgRef.current)
        .append('ul')
        .selectAll('li')
        .data(data)
        .enter()
        .append('li');

    legend.append('span')
        .style('background-color', (d, i) => color(d.name))
        .style('display', 'inline-block')
        .style('width', '1rem')
        .style('height','1rem');

    legend.append('span')
        .text((d) => `${d.name}: ${d.value.toLocaleString()}`);
      
  }, [data]);

  return (
    <div className="donutChart" ref={svgRef}></div>
  );
};

export default DonutChart;
