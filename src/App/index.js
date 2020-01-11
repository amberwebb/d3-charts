import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import Routes from './Routes';
import Nav from '../Components/Nav';
import './App.css';

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
      <Container id="main-container" style={{height: '75vh'}}>
        <Nav />
        <Routes
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          margin={margin}
        />
      </Container>
    </Router>
  );
}

export default App;
