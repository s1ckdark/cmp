'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SalesDataPoint, SalesDataSeries, LineChartProps } from '@/types/data';
import styles from '@/styles/components/d3/Linecharts.module.scss';

const LineChart: React.FC<LineChartProps> = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef();
  const [hoveredValue, setHoveredValue] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleMouseOver = (event: any, d: any) => {
    const [x, y] = d3.pointer(event);
    setHoveredValue(d.sales);
    setTooltipPosition({ x, y: y - 30 }); // Position the tooltip 30 pixels above the mouse pointer
    setActiveTooltip(d); // Set the currently active tooltip
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setHoveredValue(null);
    setActiveTooltip(null); // Clear the active tooltip when mouse moves out
    setIsHovering(false);
  };
  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([1, 12])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data.flatMap(series => series.data), d => d.sales)])
      .nice()
      .range([innerHeight, 0]);

    const line = d3.line()
      // .defined(d => !isNaN(d.sales))
      .x(d => x(d.month))
      .y(d => y(d.sales))
    // .y(innerHeight) // Start the line at the bottom
    // .curve(d3.curveMonotoneX); // Add a curve for smoother animation

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const transitionPath = d3
      .transition()
      .ease(d3.easeSin)
      .duration(2500);

    const xAxis = (g) => g
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    const yAxis = (g) => g
      // .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Create the grid line functions.
    const xGrid = (g) => g
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(x.ticks())
      .join('line')
      .attr('x1', d => x(d))
      .attr('x2', d => x(d))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom);

    const yGrid = (g) => g
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
      .attr('y1', d => y(d))
      .attr('y2', d => y(d));

    const transitionDuration = 2000;
    data.forEach((series, index) => {
      // Draw the line
      const linePath = svg.append('path')
        .datum(series.data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', color(index))
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', function () {
          const length = this.getTotalLength();
          return `${length} ${length}`;
        })
        .attr('stroke-dashoffset', function () {
          return this.getTotalLength();
        })
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

      // Add point circles for this data series with hover effect
      svg.selectAll(`.circle-${index}`)
        .data(series.data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.month))
        .attr('cy', d => y(d.sales))
        .attr('r', 4) // Adjust the radius of the circles
        .attr('fill', color(index))
        .attr('class', `circle-${index}`)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
    });



    // Add X and Y axes
    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)

    // Add X and Y grid lines
    // svg.append('g').call(xGrid);
    svg.append('g').call(yGrid);

    // Create a legend
    const legend = svg.append('g')
      .attr('transform', `translate(${innerWidth + 10},-40)`);

    const legendSpacing = 120; // Adjust as needed
    const legendOffset = -40; // Adjust as needed

    data.forEach((series, index) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(-${index * legendSpacing},${0})`);

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
        .text(`Hovered Value: ${hoveredValue}`);
    } else {
      svg.selectAll('.hovered-value').remove();
    }
  }, [data, width, height, hoveredValue, isHovering, tooltipPosition]);




  return (
    <svg ref={svgRef}></svg>
  );
}

export default LineChart;