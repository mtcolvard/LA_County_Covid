export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  colorScale,
  yColorValue,
  circleRadius,
  tooltipFormat,
  onHover
}) =>
 	data.map(d => (
 	   <circle
 			className="mark"
 	    cx={xScale(xValue(d))}
 	    cy={yScale(yValue(d))}
	    r={circleRadius}
      fill={colorScale(yColorValue(d))}
     onMouseEnter={() => { onHover([xValue(d),yValue(d)]); }}
//      onMouseEnter={() => { onHover((xValue,yValue)); }}

	    >
 	     <title>{tooltipFormat(xValue(d))}</title>
 	   </circle>
   ));
