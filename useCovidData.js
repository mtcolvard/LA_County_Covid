import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/mtcolvard/af3ea56a0fab22708e33e16904954c06/raw/fa848fbde451aa077c5abf6a3c7f16d22edcf340/LA_County_Cummulative_Covid.csv'

const row = d => {
  d.caseRate = +d['CaseRate'];
  return d;
};

export const useCovidData = () => {
  const [covidData, setCovidData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setCovidData);
  }, []);

  return covidData;
  };
	
