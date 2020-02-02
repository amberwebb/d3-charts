import React, { useEffect, Fragment } from 'react'
import * as d3 from 'd3'
import { data } from './data'

function BarChart(props) {
  const { svgWidth, svgHeight, margin } = props

  useEffect(() => {
    d3.select('.svg-container svg').remove()
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const svg = d3
      .select('.svg-container')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
    const group = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const x = d3.scaleLinear().range([0, width])
    const y = d3.scaleLinear().range([height, 0])

    const xScaleValue = data.reduce((acc, curr) => {
      return acc + curr.valueX
    }, 0)

    const yScaleValue = data.map(datum => datum.valueY)

    x.domain([0, xScaleValue])
    y.domain([0, d3.max(yScaleValue)])

    // X axis
    group
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
    // Y axis
    group.append('g').call(d3.axisLeft(y))

    group
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', datum => datum.color)
      .attr('x', function(datum, i) {
        const xValues = data.map(datum => datum.valueX)
        let values = [0, ...xValues]
        values = values.map((value, index) =>
          values.slice(0, index + 1).reduce((a, b) => a + b)
        )
        return x(values[i])
      })
      .attr('width', datum => x(datum.valueX))
      .attr('y', function(datum) {
        return y(datum.valueY)
      })
      .attr('height', function(datum) {
        return height - y(datum.valueY)
      })
  }, [svgWidth, svgHeight, margin])
  return (
    <Fragment>
      <h1 className="text-2xl text-center">Chart with Variable Width Bars</h1>
      <div className="svg-container"></div>
    </Fragment>
  )
}

export default BarChart
