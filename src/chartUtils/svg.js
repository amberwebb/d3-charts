import { select } from 'd3'

export function createSvg(svgClassName, svgWidth, svgHeight) {
  return select(svgClassName)
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
}

export function createSvgGroup(svg, margin) {
  return svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
}

export function clearSvg(svgClassName) {
  return select(`${svgClassName} svg`).remove()
}
