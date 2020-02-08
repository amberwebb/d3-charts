import { scaleLinear, scaleTime } from 'd3'

export function linearScale(rangeValues) {
  return scaleLinear().range(rangeValues)
}

export function timeScale(rangeValues) {
  return scaleTime().range(rangeValues)
}
