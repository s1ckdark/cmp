import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { BarChartProps } from '@/types/data';

interface Props extends BarChartProps {
	data: {
		day: string;
		sales: number;
	}[];
}

const BarChart: React.FC<Props> = ({ data, width, height, title }) => {
	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = d3.select(ref.current);
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };
		const width = 500 - margin.left - margin.right;
		const height = 250 - margin.top - margin.bottom;
	
		const xScale = d3.scaleBand().domain(data.map(d => d.day)).range([0, width]).padding(0.5);
		const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.sales)]).nice().range([height, 0]);
	
		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
	
		// Add X grid lines
		g.append('g')
		  .attr('class', 'grid')
		  .attr('transform', `translate(0,${height})`)
		  .call(d3.axisBottom(xScale)
			.tickSize(-height)
			.tickFormat('') // Remove tick labels
		  )
		  .selectAll('line')
		  .attr('stroke', '#e5e5e5'); // Style the grid lines
	
		  g.append('g')
		  .attr('class', 'grid')
		  .call(d3.axisLeft(yScale)
			.tickSize(-width)
			.tickFormat('') // Remove tick labels
		  )
		  .selectAll('line')
		  .attr('stroke', '#e5e5e5'); // Style the grid lines
	
		g.selectAll('rect')
		  .data(data)
		  .enter()
		  .append('rect')
		  .attr('x', d => xScale(d.day))
		  .attr('y', d => yScale(d.sales))
		  .attr('width', xScale.bandwidth())
		  .attr('height', d => height - yScale(d.sales))
		  .attr('fill', 'blue');
	
		// Add the X Axis
		g.append('g')
		  .attr('transform', `translate(0,${height})`)
		  .call(d3.axisBottom(xScale));
	
		// Add the Y Axis
		g.append('g')
		  .call(d3.axisLeft(yScale));
	
	  }, [data]);
	
	  return (
		<svg ref={ref} width={500} height={250}></svg>
	  );
	}

export default BarChart;
