import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './LineChart.module.scss'
import { addComma } from '@/utils/data';
interface IDataPoint {
    x: number;
    y: number;
    z: number;
    a: number
}

interface LineChartProps {
    data: IDataPoint[];
    aspectRatio: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, aspectRatio = 4 / 1 }) => {
    const d3Container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const margin = { top: 30, right: 20, bottom: 30, left: 20 };
            const width = d3Container.current.offsetWidth;
            const height = width / aspectRatio;
            // const width = Width - margin.left - margin.right;
           
            const maxY = d3.max(data, d => Math.abs(d.y)) as number;
            const minY = d3.min(data, d => Math.abs(d.y)) as number;
            // Clear previous SVG
            d3.select(d3Container.current).selectAll('*').remove();

            const svg = d3.select(d3Container.current)
                          .append('svg')
                          // .attr('width', width)
                          // .attr('height', height)
                          .attr('viewBox', `0 0 ${width} ${height}`)
                          .attr('stroke', '#C6CDD6') // Border color
                          .attr('stroke-width', '1px') // Border width
                          .append('g')
                          // .attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3.scaleLinear()
                        .domain([d3.min(data, d => d.x) as number, d3.max(data, d => d.x) as number])
                        .range([margin.left, width-margin.left-margin.right])
            


            const y = d3.scaleLinear()
                        .domain([0, maxY*1.5])
                        // .domain([-maxY, maxY])
                        .range([height, 0]);

            // X-axis grid
            // svg.append('g')
            //   .attr('class', 'grid')
            //   .attr('transform', `translate(0,${height})`)
            //   .call(d3.axisBottom(x)
            //         .tickSize(-height)
            //         .tickFormat(() => '')
            //   )
            //   .selectAll('.tick line')
            //   .attr('stroke', '#ddd');

            // Y-axis grid
            svg.append('g')
              .attr('class', 'grid')
              .call(d3.axisLeft(y)
                    .tickSize(-width)
                    .tickFormat(() => '')
              )
              .selectAll('.tick line')
              .attr('stroke', '#ddd');

            // Line
            const line = d3.line<IDataPoint>()
                           .x(d => x(d.x))
                           .y(d => y(d.y));

            const path = svg.append('path')
                            .datum(data)
                            .attr('fill', 'none')
                            .attr('stroke', '#52BF8A')
                            .attr('stroke-width', 3)
                            .attr('d', line);

            // Animation
            const totalLength = path.node()!.getTotalLength();
            path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(2000)
                .attr('stroke-dashoffset', 0);

            // Tooltip
            const tooltip = d3.select('body').append('div')
                              .attr('class', `${styles.tooltip}`)
                              .style('opacity', 0);

            svg.selectAll('.dot')
               .data(data)
               .enter().append('circle')
               .attr('class', 'dot')
               .attr('fill', '#52BF8A')
               .attr('cx', d => x(d.x))
               .attr('cy', d => y(d.y))
               .attr('r', 5)
               .on('mouseover', (event, d) => {
                   tooltip.transition()
                          .duration(200)
                          .style('opacity', .9);
                   tooltip.html(`<label>${d.x}월 전체 매출</label><h2>${addComma(d.y)}<span>KRW</span></h2>`)
                          .style('left', `${event.pageX}px`)
                          .style('top', `${event.pageY - 28}px`);
               })
               .on('mouseout', () => {
                   tooltip.transition()
                          .duration(500)
                          .style('opacity', 0);
               });

               // domain color 
               
               svg.append('g')
               .attr("transform",`translate(${0},${height})`)
               .call(d3.axisBottom(x).tickSize(1).ticks(12).tickFormat((d:any) => d + '월'));
  
               svg.selectAll('.domain').remove();
               svg.selectAll(".x.axis line")
                  .style("stroke","#C6CDD6");
                  svg.selectAll(".x.axis")
                  .style("font-size","14px");
              }
    }, [data]);

    return <div ref={d3Container} className={styles.lineChart} />;
};

export default LineChart;
