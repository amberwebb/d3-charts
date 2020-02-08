import React, { useEffect, Fragment } from 'react'
import * as d3 from 'd3'
import { data } from './data'
import { BAR_CHART_TITLE } from './constants'
import { linearScale } from '../chartUtils/scales'
import { createSvg, createSvgGroup, clearSvg } from '../chartUtils/svg'
import { createXAxis, createYAxis } from '../chartUtils/axes'

function BarChart(props) {
  const { svgWidth, svgHeight, margin } = props

  useEffect(() => {
    clearSvg('.svg-container')
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const svg = createSvg('.svg-container', svgWidth, svgHeight)
    const group = createSvgGroup(svg, margin)

    const x = linearScale([0, width])
    const y = linearScale([height, 0])

    const xScaleValue = data.reduce((acc, curr) => {
      return acc + curr.valueX
    }, 0)

    const yScaleValue = data.map(datum => datum.valueY)

    x.domain([0, xScaleValue])
    y.domain([0, d3.max(yScaleValue)])

    // X axis
    createXAxis(group, height, x)
    // Y axis
    createYAxis(group, y)

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
      <h1 className="text-2xl text-center">{BAR_CHART_TITLE}</h1>
      <div className="svg-container"></div>
    </Fragment>
  )
}

export default BarChart
