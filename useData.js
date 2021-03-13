import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/mtcolvard/422472f4bb0a33df9ea4075ff7620360/raw/7d9465dcb1a35d3dfce81ab79c3a408ee0da6fc9/LA_County_Income_by_City.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.City = d.City;
      d.Families = +d.Families;
      d.Non_Family_Households = +d.Non_Family_Households;
      d.Households = +d.Households;
      d.Cases = +d.Cases;
      d.CaseRate = +d.CaseRate;
      d.Deaths = +d.Deaths;
      d.DeathRate = +d.DeathRate;
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
