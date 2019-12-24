import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from 'semantic-ui-react';
import { API_BITCOIN } from './constants';
import './App.css';

// Based off of https://www.freecodecamp.org/news/learn-to-create-a-line-chart-using-d3-js-4f43f1ee716b/
function App() {
  const svgWidth = 1024;
  const svgHeight = 600;
  const margin = {
    top: 20,
    right: 100,
    bottom: 20,
    left: 100,
  };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  const svg = d3.select('.svg-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);
  const group = svg.append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  const [data, setData] = useState([]);

  // Load the data
  useEffect(() => {
    // TODO - create fetch hook
    fetch(API_BITCOIN).then((res) => res.json()).then((data) => {
      const bpi = data.bpi;
      const transformedData = Object.keys(bpi).map((key: any) => {
        return {
          date: new Date(key),
          value: bpi[key],
        }
      });
      setData(transformedData);
    });
  }, []);

  useEffect(() => {
    function loadChart() {
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
  }, [data]);

  return (
    <div className="ui container">
      <div className="svg-container">
      </div>
    </div>
  );
}

export default App;
