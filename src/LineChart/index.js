import React, { useState, useEffect, Fragment } from 'react';
import * as d3 from 'd3';
import useFetch from '../CustomHooks/fetch';
import { Header } from 'semantic-ui-react';
import { API_BITCOIN, LINE_CHART_TITLE } from './constants';

function LineChart(props) {
  const { svgWidth, svgHeight, margin } = props;
  const [data, setData] = useState([]);
  const res = useFetch(API_BITCOIN);
  const { response, error } = res;

  useEffect(() => {
    if (response && !data.length) {
      const bpi = response.bpi
      const transformedData = Object.keys(bpi).map((key: any) => {
        return {
          date: new Date(key),
          value: bpi[key],
        }
      });
      setData(transformedData);
    }

    if (error) {
      console.log(error) // TODO - error handling
    }
  }, [response, error, data.length]);

  useEffect(() => {
    function loadChart() {
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;
      const svg = d3.select('.svg-container')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
      const group = svg.append('g')
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleTime().rangeRound([0, width]);
      const y = d3.scaleLinear().rangeRound([height, 0]);

      const line = d3.line().x((d) => x(d.date)).y((d) => y(d.value));

      x.domain(d3.extent(data, (d) => d.date));
      y.domain(d3.extent(data, (d) => d.value));

      // X axis
      group.append('g').attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x))
      // Y axis
      group.append("g").call(d3.axisLeft(y));
      // Line chart
      group.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("d", line);
    }

    if (data.length) {
      loadChart();
    }
  }, [data, svgWidth, svgHeight, margin]);

  return (
    <Fragment>
      <Header align="center">{ LINE_CHART_TITLE }</Header>
      <div className="svg-container">
      </div>
    </Fragment>
  );
}

export default LineChart;