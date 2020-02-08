import { axisBottom, axisLeft } from 'd3'

export function createXAxis(group, height, x) {
  return group
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(axisBottom(x))
}

export function createYAxis(group, y) {
  return group.append('g').call(axisLeft(y))
}
