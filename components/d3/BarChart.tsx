import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './BarChart.module.scss';
interface IDataPoint {
    x: string;
    y: number;
}

interface BarChartProps {
    data: IDataPoint[];
    aspectRatio?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, aspectRatio = 16 / 9}) => {
    const chartContainerRef = useRef<HTMLDivElement>(null) || null;
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
        if (chartContainerRef.current) {
            const { width } = chartContainerRef.current.getBoundingClientRect();

            // Adjust the margins to allow space for axis labels
            const margins = { top: 0, right: 0, bottom: 50, left: 60 };
            const chartWidth = width - margins.left - margins.right;
            const chartHeight = chartWidth / aspectRatio - margins.top - margins.bottom;
            const barWidth = 15;
            setContainerWidth(chartWidth);
            setContainerHeight(chartHeight);

            d3.select(chartContainerRef.current).selectAll('*').remove();

            const svg = d3.select(chartContainerRef.current)
                        .append('svg')
                        .attr('width', width) // Full container width
                        .attr('height', chartWidth / aspectRatio) // Full container height
                        .append('g')
                        .attr('transform', `translate(${margins.left},${margins.top})`)
                        .attr('style','overflow:visible');

            const minYValue = 0;
            const maxYValue = (d3.max(data, d => d.y === 0 ? 5 : d.y) as number) * 1.33;  // Doubling the maximum data value
            const domain:any = [minYValue, maxYValue];
            // Scales
			const xScale = d3.scaleBand()
							.domain(data.map(d => d.x))
							.rangeRound([0, containerWidth]);

            const yScale = d3.scaleLinear()
                             .domain(domain)
                             .range([containerHeight, 0]);

            // X Axis
            const xAxis = svg.append('g')
            .attr('transform', `translate(0,${containerHeight})`)
            .call(d3.axisBottom(xScale));

            xAxis.selectAll("text")   
                .attr('font-size', '14px')
                .style("fill", "#a1a1a1");
            // Y Axis
            const yAxis = svg.append('g')
            .attr('class', 'y axis')
            .attr('color', '#a1a1a1')
            .call(d3.axisLeft(yScale));

            // Y-axis Grid
            const yGrid = svg.append('g')
                .attr('class', 'grid')
                .call(d3.axisLeft(yScale).tickSize(-containerWidth).tickFormat((d:any) => ''));

            yGrid.selectAll('.tick line')
                .attr('stroke', '#ddd');

            // Draw bars
            const bars = svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.x)! + (xScale.bandwidth() - barWidth) / 2)
            .attr('width', barWidth)
            .attr('y', containerHeight)
            .attr('height', 0)
            .attr('fill', '#a1a1a1');

            // Animation
            bars.transition()
                .duration(800)
                .attr('y', d => yScale(d.y))
                .attr('height', d => containerHeight - yScale(d.y));


			 // Tooltip setup
             const tooltip = d3.select('body').append('div')
             .attr('class', `${styles.tooltip}`)
             .style('opacity', 0);

           // Tooltip event handlers
           bars.on('mouseover', function(event, d) {
               d3.select(this).attr('fill', '#43B69A'); // Change bar color on hover
               tooltip.transition()
                      .duration(200)
                      .style('opacity', .9);
               tooltip.html(`<label>${d.x} 전체 매출</label><h2>${d.y.toLocaleString()}<span>KRW</span></h2>`)
                      .style('left', `${ xScale(d.x)! + (chartContainerRef.current?.offsetLeft || 0) + (xScale.bandwidth() - barWidth) / 2}px`)
                      .style('top', `${yScale(d.y) + (chartContainerRef.current?.offsetTop || 0) - 28}px`);
           })

           .on('mouseout', function() {
               d3.select(this).attr('fill', '#a1a1a1'); // Revert bar color
               tooltip.transition()
                      .duration(500)
                      .style('opacity', 0);
           });
			svg.selectAll('.domain').remove();
			svg.selectAll(".tick line")
				.style("stroke","#eee");
        }
    }, [data, containerWidth, containerHeight, aspectRatio, chartContainerRef]);

    return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};

export default BarChart;