import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const drawChart = (svgRef: any) => {
	const data = [12, 5, 6, 6, 9, 10];
	const h = 120;
	const w = 250;
	const svg = d3.select(svgRef.current);

	svg
		.attr('width', w)
		.attr('height', h)
		.style('margin-top', 50)
		.style('margin-left', 50);

	svg
		.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', (d, i) => i * 40)
		.attr('y', (d, i) => h - 10 * d)
		.attr('width', 20)
		.attr('height', (d, i) => d * 10)
		.attr('fill', 'steelblue');
};

const Chart = () => {
	const svg = useRef(null);

	useEffect(() => {
		drawChart(svg);
	}, [svg]);
};

export default Chart;

// d3차트를 그리는 함수를 만들고, useEffect를 통해 svgRef가 변경될 때마다 drawChart 함수를 호출한다.
// 몽고db 연결 mongoose
