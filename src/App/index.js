import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import '../styles/index.css';

function App() {
  const margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  };
  const [svgWidth, setSvgWidth] = useState(null);
  const [svgHeight, setSvgHeight] = useState(null);

  useEffect(() => {
    function setChartDimensions() {
      const containerEl = document.getElementById('main-container');
      setSvgWidth(containerEl.getBoundingClientRect().width);
      setSvgHeight(containerEl.getBoundingClientRect().height);
    }

    setChartDimensions();
  }, []);

  return (
    <Router>
      <div className="container mx-auto m-8" id="main-container" style={{height: '85vh'}}>
        <Routes
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          margin={margin}
        />
      </div>
    </Router>
  );
}

export default App;
