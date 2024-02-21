'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DonutChartProps } from '@/types/data';
interface DataItem {
  name: string;
  value: number;
}
const DonutChart: React.FC<{ data: Array<DonutChartProps>, title: string }> = ({ data, title }) => {
  const d3Container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data && d3Container.current) {
    // Set up the dimensions and radius for the donut chart
    const width = 320;
    const height = 320;
    const radius = Math.min(width, height) / 2;

    d3.select(d3Container.current).selectAll('*').remove();

    // Create a D3 arc generator for the donut slices
    const arc = d3.arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const color:any = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Create a D3 pie layout
    const pie = d3.pie<DataItem>()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.value);

    const svg = d3.select(d3Container.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;margin-bottom:30px;");
    

    // svg.append("svg:text")
    //   .attr("dy", ".35em")
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", "14px")
    //   .text(title);

    svg.append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", ((d:any)=> color(d.data.name)))
      .attr("d", arc as any)
      .append("title")
      .text((d: any) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    // svg.append("g")
    //   .attr("font-size", 12)
    //   .attr("text-anchor", "middle")
    //   .selectAll()
    //   .data(pie(data))
    //   .join("text")
    //   .attr("transform", d => `translate(${arc.centroid(d)})`)
    //   .call(text => text.append("tspan")
    //     .attr("y", "-0.4em")
    //     .attr("font-weight", "bold")
    //     .text(d => d.data.name))
    //   .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
    //     .attr("x", 0)
    //     .attr("y", "0.7em")
    //     .attr("fill-opacity", 0.7)
    //     .text(d => d.data.value.toLocaleString("en-US")));

    const legend = d3.select(d3Container.current)
      .append('ul')
      .selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .style('display', 'flex')
      .style('width', '300px')
      .style('justify-content', 'center')
      .style('align-items', 'center')

    legend.append('span')
      .style('background-color', ((d:any, i:any) => color(d.name)))
      .style('display', 'inline-block')
      .style('width', '1rem')
      .style('height', '1rem')
      .style('margin-right', '0.5rem')

      legend.append('p')
      .style('display','flex')
      .style('justify-content','space-between')
      .style('width', '200px')
      .attr('class', 'legend-item') // Optional: if you want to add a class to the paragraph
      .each(function(d) {
        d3.select(this).append('span')
          .style('display','inline-block')
          .style('width','120px')
          .style('text-align','left')
          .text(d.name);
    
        d3.select(this).append('span')
          .style('display','inline-block')
          .style('width','120px')
          .style('text-align','right')
          .text(d.value.toLocaleString());
      });
    legend.style('margin-bottom', `5px`)
   }
    
  }, [data]);

  return (
    <div className="donutChart" ref={d3Container}></div>
  );
};

export default DonutChart;
