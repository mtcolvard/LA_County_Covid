export const ColorLegend = ({
  colorScale,
  yColorValue,
  legendTickSpacing,
  legendTickSize,
	legendTickTextOffset,
  circleRadius
}) => {
	const flipDomain = colorScale.domain().reverse()
  	return(
  	flipDomain.map((domainValue, i) => (
   	 <g className='tick' transform={`translate(0,${i * legendTickSpacing})`}>
   	   <circle
     	   fill={colorScale(domainValue)}
     	   r={circleRadius}
     	   />
    	  <text
    	    x={legendTickTextOffset}
    	    dy=".32em" >{`${domainValue}`}</text>
     </g>
))
)};
