import React, { useState, useEffect, Fragment } from 'react'
import * as d3 from 'd3'
import useFetch from '../CustomHooks/fetch'
import { API_BITCOIN, LINE_CHART_TITLE } from './constants'
import '../styles/index.css'
import { linearScale, timeScale } from '../chartUtils/scales'
import { createSvg, createSvgGroup, clearSvg } from '../chartUtils/svg'
import { createXAxis, createYAxis } from '../chartUtils/axes'

function LineChart(props) {
  const { svgWidth, svgHeight, margin } = props
  const [data, setData] = useState([])
  const res = useFetch(API_BITCOIN)
  const { response, error } = res

  useEffect(() => {
    if (response && !data.length) {
      const bpi = response.bpi
      const transformedData = Object.keys(bpi).map((key: any) => {
        return {
          date: new Date(key),
          value: bpi[key],
        }
      })
      setData(transformedData)
    }

    if (error) {
      console.log(error) // TODO - error handling
    }
  }, [response, error, data.length])

  useEffect(() => {
    clearSvg('.svg-container')
    function loadChart() {
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
      const width = svgWidth - margin.left - margin.right
      const height = svgHeight - margin.top - margin.bottom
      const svg = createSvg('.svg-container', svgWidth, svgHeight)
      const group = createSvgGroup(svg, margin)

      const x = timeScale([0, width])
      const y = linearScale([height, 0])

      const line = d3
        .line()
        .x(d => x(d.date))
        .y(d => y(d.value))

      x.domain(d3.extent(data, d => d.date))
      y.domain(d3.extent(data, d => d.value))

      // X axis
      createXAxis(group, height, x)
      // Y axis
      createYAxis(group, y)
      // Line chart
      group
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#38b2ac')
        .attr('stroke-width', 2)
        .attr('d', line)

      group
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', function(d) {
          return x(d.date)
        })
        .attr('cy', function(d) {
          return y(d.value)
        })
        .attr('fill', '#38b2ac')
        .on('mouseover', function(d) {
          tooltip
            .transition()
            .duration(200)
            .style('opacity', 1)
          tooltip
            .html(d.value)
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY - 28 + 'px')
        })
        .on('mouseout', function(d) {
          tooltip
            .transition()
            .duration(500)
            .style('opacity', 0)
        })
    }

    if (data.length) {
      loadChart()
    }
  }, [data, svgWidth, svgHeight, margin])

  return (
    <Fragment>
      <h1 className="text-2xl text-center">{LINE_CHART_TITLE}</h1>
      <div className="svg-container"></div>
    </Fragment>
  )
}

export default LineChart
