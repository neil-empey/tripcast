import logo from "./logo.svg";
import "./App.css";
import Inputs from "./components/Inputs";
import React, { useState } from "react";

function App() {
  return (
    <div className="">
      <div className="">
        <div className="app">
          <h1 className="trip">TripCast</h1>
          <h5 className="trip">Directions and Weather</h5>
          <p>Always Prepared</p>
          <Inputs />
        </div>
      </div>
    </div>
  );
}

export default App;
