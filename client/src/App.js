import React, { useEffect, useState } from 'react'
import './Start.css';
import './App.css'

function App() {

  const [backendData, setBackendData] = useState([{}])
  const [counter, setCounter] = useState(0)
  const [backendDataTwo, setBackendDataTwo] = useState(false)

  const [redCounter, setRedCounter] = useState(0);
  const [orangeCounter, setOrangeCounter] = useState(0);
  const [yellowCounter, setYellowCounter] = useState(0);
  const [greenCounter, setGreenCounter] = useState(0);
  const [blueCounter, setBlueCounter] = useState(0);
  const [purpleCounter, setPurpleCounter] = useState(0);
  const [turquoiseCounter, setTurquoiseCounter] = useState(0);
  const [brownCounter, setBrownCounter] = useState(0);

  // Below: handle the user clicking the color
  function handleClick(colorClicked) {
    switch(colorClicked) {
      case "red": setRedCounter(redCounter + 1) 
      break;
      case "orange": setOrangeCounter(orangeCounter + 1)
        break;
      case "yellow": setYellowCounter(yellowCounter + 1)
        break;
      case "green": setGreenCounter(greenCounter + 1)
        break;
      case "blue": setBlueCounter(blueCounter + 1)
        break;
      case "purple": setPurpleCounter(purpleCounter + 1)
        break;
      case "turquoise": setTurquoiseCounter(turquoiseCounter + 1)
        break;
      case "brown": setBrownCounter(brownCounter + 1)
        break;
    }
  }

  // Below: the buttons and associated counters themselves
  function MyColoredButton({ color, onClick, counter }) {
    return (
      <div className="button-container">
        <button className="color-button" style={{ '--button-color': color }} onClick={onClick}>
          {/* No text */}
        </button>
        <div className="counter">{counter}</div>
      </div>
    );
  }

  // Hooks must be called at the top level of a React component or a custom hook
  // Below: get the colors list from the server
  useEffect(() => {

    const fetchNewColors = () =>
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
    console.log("Hello")
    
    fetchNewColors();
    const intervalID = setInterval(fetchNewColors, 1000); // fetches the colors every second

    return () => {
      clearInterval(intervalID);
    }

  }, []) // this thing called only once, at the initalization []. But, the per second fetching is constantly going on inside

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ counter }),
    };

    fetch("/api/counter", requestOptions)
      .then(response => response.json())
      .then(
        data => {
          setBackendDataTwo(data)
        }
      )
  }, [counter]) //refreshes every time that counter variable is affected 

  return (
    <div className="app-container">
      <div className="content-top">
        <h1 style={{ fontSize: '24px' }}>Press the colored button every time its name jumps up!</h1>
        {backendData.colors && backendData.colors.length > 0 ? (
          <div className="colors-list">
            {backendData.colors.map((color, i) => (
              <span key={color.id} style={{ margin: '0 10px' }}>{color.title}</span>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="buttons-container">
          <MyColoredButton color="red" onClick={() => handleClick("red")} counter={redCounter} />
          <MyColoredButton color="orange" onClick={() => handleClick("orange")} counter={orangeCounter} />
          <MyColoredButton color="yellow" onClick={() => handleClick("yellow")} counter={yellowCounter} />
          <MyColoredButton color="green" onClick={() => handleClick("green")} counter={greenCounter} />
          <MyColoredButton color="blue" onClick={() => handleClick("blue")} counter={blueCounter} />
          <MyColoredButton color="purple" onClick={() => handleClick("purple")} counter={purpleCounter} />
          <MyColoredButton color="turquoise" onClick={() => handleClick("turquoise")} counter={turquoiseCounter} />
          <MyColoredButton color="brown" onClick={() => handleClick("brown")} counter={brownCounter} />
        </div>
      </div>
      <div className="start-button-container">
        <button className="start-button">Start</button>
      </div>
    </div>
  );
  
  
  
}

export default App;