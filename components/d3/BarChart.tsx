import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface IDataPoint {
    x: string;
    y: number;
}

interface BarChartProps {
    data: IDataPoint[];
    aspectRatio?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, aspectRatio = 16 / 9}) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
        if (chartContainerRef.current) {
            const width = chartContainerRef.current.getBoundingClientRect().width;
            const height = width / aspectRatio;
			const barWidth = 15;
			const tooltip = d3.select("#tooltip");
            setContainerWidth(width);
            setContainerHeight(height);

            d3.select(chartContainerRef.current).selectAll('*').remove();

            const svg = d3.select(chartContainerRef.current)
                          .append('svg')
                          .attr('width', containerWidth)
                          .attr('height', containerHeight)
						  .attr('style','overflow:visible');

            // Scales
			const xScale = d3.scaleBand()
							.domain(data.map(d => d.x))
							.rangeRound([0, containerWidth]);

            const yScale = d3.scaleLinear()
                             .domain([0, d3.max(data, d => d.y)])
                             .range([containerHeight, 0]);

            // X Axis
            svg.append('g')
               .attr('transform', `translate(0,${containerHeight})`)
               .call(d3.axisBottom(xScale))
			   .attr('class', 'xAxis')
			   .selectAll("text")   
			   .attr('font-size','14px')
			   .style("fill", "#C6CDD6"); 

            // Y Axis
            svg.append('g')
               .call(d3.axisLeft(yScale));

            // Y-axis Grid
            svg.append('g')
               .attr('class', 'grid')
               .call(d3.axisLeft(yScale)
                    .tickSize(-containerWidth)
                    .tickFormat(''))
               .selectAll('.tick line')
               .attr('stroke', '#ddd');

            // Draw bars
            svg.selectAll('.bar')
                .data(data)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', (d, i) => xScale(d.x)! + (xScale.bandwidth() - barWidth) / 2) // Center the bar in the band
                .attr('width', barWidth)
                .attr('y', containerHeight)
                .attr('height', 0)
                .attr('fill', '#c1c1c1')
                .transition()  // Start the transition
                .duration(800) // Duration of the animation in milliseconds
                .attr('y', d => yScale(d.y))
                .attr('height', d => containerHeight - yScale(d.y));

				// Draw bars with tooltip
			svg.selectAll('.bar')
				.data(data)
				.enter().append('rect')
				.attr('class', 'bar')
				// ... (other attributes)
				.on('mouseover', function(event, d) {
					tooltip.style("visibility", "visible")
							.text(`Y: ${d.y}`);
				})
				.on('mousemove', function(event) {
					tooltip.style("top", (event.pageY - 10) + "px")
							.style("left", (event.pageX + 10) + "px");
				})
				.on('mouseout', function() {
					tooltip.style("visibility", "hidden");
				});
			
			svg.selectAll('.domain').remove();
			svg.selectAll(".tick line")
				.style("stroke","#C6CDD6");
        }
    }, [data, containerWidth, containerHeight, aspectRatio]);

    return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};

export default BarChart;
