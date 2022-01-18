import logo from "./logo.svg";
import "./App.css";
import Inputs from "./components/Inputs";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <div className="App">
        <h1 className="trip">TripCast</h1>
        <h2>Directions and Weather</h2>
        <Inputs />
      </div>
      <div className="gif">
        <iframe
          className="frame"
          src="https://giphy.com/embed/LBgf56psa07tCUJmpC"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
