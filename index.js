import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactDropdown from 'react-dropdown';
import { csv, scaleLinear, scaleThreshold, schemeBlues, scaleLog, max, extent, format } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';
import { ColorLegend } from './ColorLegend';






const menuHeight = 40;
const width = 960;
const height = 500;
const margin = { top: 70, right: 200, bottom: 15, left: 220 };
const xAxisLabelOffset = -60;
const yAxisLabelOffset = 60;
const initialMousePosition = {x: width/2, y: height/2}
const circleRadius = 10;

const App = () => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [hoveredValue, setHoveredValue] = useState(null);
  const [mousePosition, setMousePosition] = useState(initialMousePosition);

  const handleMouseMove = useCallback(event => {
 		const { clientX, clientY } = event;
		setMousePosition({ x: clientX, y: clientY });
	}, [setMousePosition]);

	const data = useData();
  const attributes = [
    { id: 1, value: 'City', label: 'City', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500] },
    { id: 2, value: 'Families', label: 'Families', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
    { id: 3, value: 'Non_Family_Households', label: 'Non-Family Households', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
    { id: 4, value: 'Households', label: 'Households', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
    { id: 5, value: 'Cases', label: 'Cases', domainMin: 1, yColorScale: [10,100,200,250,300,350,400,450,500] },
    { id: 6, value: 'CaseRate', label: 'Case Rate/100k', domainMin: 1, yColorScale: [1, max(data, yValue)]  },
    { id: 7, value: 'Deaths', label: 'Deaths', domainMin: 1, yColorScale: [10,100,200,250,300,350,400,450,500] },
    { id: 8, value: 'DeathRate', label: 'Death Rate/100k', domainMin: 10, yColorScale: [10,100,200,250,300,350,400,450,500] }
    ]

  const getLabel = value => {
    for(let i = 0; i < attributes.length; i++) {
    if(attributes[i].value === value){
      return attributes[i].label;
    }}};

  const getDomainMin = value => {
    for(let i = 0; i < attributes.length; i++) {
    if(attributes[i].value === value){
      return attributes[i].domainMin;
    }}};

  	const getYColorScale = value => {
    for(let i = 0; i < attributes.length; i++) {
    if(attributes[i].value === value){
      return attributes[i].yColorScale;
    }}};

  const initialXAttribute = 'Families'
  const [xAttribute, setXAttribute] = useState(initialXAttribute);

  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
//  const xColorValue = d => d[xAttribute];

  const initialYAttribute = 'DeathRate'
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  const yValue = d => d[yAttribute];
  const yDomainMin = getDomainMin(yAttribute);
  const yAxisLabel = getLabel(yAttribute);
  const yColorScale = getYColorScale(yAttribute);
  const yColorValue = d => d[yAttribute];

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
  	.nice();

  const yScale = scaleLog()
    .domain([yDomainMin, max(data, yValue)])
    .range([innerHeight - 50, 0])
  	.nice();

  const colorScale =
    scaleThreshold()
//    	.domain([10,100,200,250,300,350,400,450,500])
  		.domain(yColorScale)
    	.range(schemeBlues[9]);


//  const colorScale = scaleOrdinal()
  //	.domain(data.map(colorValue))
  	//.range(['#000000', '#888888'])
  	// //'8:16'

  return (
  	<>
    <div className="menus-container">
    	<span className="dropdown-label">x</span>
    	<ReactDropdown
     		options={attributes}
     	 	value={xAttribute}
     	 	onChange={({ value }) => setXAttribute(value)}
    	 />
     <span className="dropdown-label">y</span>
    	<ReactDropdown
     		options={attributes}
     		value={yAttribute}
     		onChange={({ value }) => setYAttribute(value)}
     	/>
    </div>
    <div className="chart-container">
    <svg width={width} height={innerHeight} onMouseMove={handleMouseMove}>
      <circle
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
        />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight - 100}
          tickFormat={xAxisTickFormat}
        />
        <text
        	className="axis-label"
          x={yAxisLabelOffset}
          y={-15}
          textAnchor="middle"
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <g transform={`translate(${innerWidth +100})`}>
        	<ColorLegend
           	colorScale={colorScale}
           	yColorValue={yColorValue}
          	legendTickSpacing={20}
 						legendTickSize={5}
						legendTickTextOffset={20}
          	circleRadius={circleRadius}
          />
        </g>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          yColorValue={yColorValue}
          xValue={xValue}
          yValue={yValue}
          circleRadius={circleRadius}
          tooltipFormat={xAxisTickFormat}
          onHover={setHoveredValue}
        />
      </g>
    </svg>
    </div>
  </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
 
