import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import { APP_TITLE, PATHS } from './constants'
import '../styles/index.css'

function App() {
  const margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  }
  const [svgWidth, setSvgWidth] = useState(null)
  const [svgHeight, setSvgHeight] = useState(null)
  const chartRef = useRef(null)

  useEffect(() => {
    function setChartDimensions() {
      const { current } = chartRef
      if (current) {
        const { width, height } = current.getBoundingClientRect()
        setSvgWidth(width)
        setSvgHeight(height)
      }
    }

    setChartDimensions()

    window.addEventListener('resize', setChartDimensions)

    return () => {
      window.removeEventListener('resize', setChartDimensions)
    }
  }, [])

  return (
    <Router>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            {APP_TITLE}
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {PATHS.map((path, index) => {
              return (
                <a
                  key={index}
                  href={path.PATH}
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  {path.TITLE}
                </a>
              )
            })}
          </div>
        </div>
      </nav>
      <div
        className="container mx-auto m-8"
        id="main-container"
        style={{ height: '85vh' }}
        ref={chartRef}
      >
        <Routes svgWidth={svgWidth} svgHeight={svgHeight} margin={margin} />
      </div>
    </Router>
  )
}

export default App
