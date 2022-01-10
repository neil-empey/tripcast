import logo from "./logo.svg";
import "./App.css";
import Inputs from "./components/Inputs";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <div className="App">
        <h1 className="trip">TripCast</h1>
        <h2>Get Directions and Weather for points along your route</h2>
        <Inputs />

        <div className="gif">
          <iframe
            className="frame"
            src="https://giphy.com/embed/LBgf56psa07tCUJmpC"
          ></iframe>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
