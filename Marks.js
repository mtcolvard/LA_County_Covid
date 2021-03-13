export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  colorScale,
  yColorValue,
  tooltipFormat
}) =>
 	data.map(d => (
 	   <circle
 			className="mark"
 	    cx={xScale(xValue(d))}
 	    cy={yScale(yValue(d))}
	    r={10}
      fill={colorScale(yColorValue(d))}
	    >
 	     <title>{tooltipFormat(xValue(d))}</title>
 	   </circle>
   ));
