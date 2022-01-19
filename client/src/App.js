import logo from "./logo.svg";
import "./App.css";
import Inputs from "./components/Inputs";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <div id="app">
        <section>
          <h1 className="title">TripCast</h1>
          <div className="spacer"></div>
          <h2 className="subhead">Directions and Weather</h2>
          <Inputs />

        <div className="spacer"></div>
        <div className="gif">
          <iframe
            id="author-avatar"
            src="https://giphy.com/embed/LBgf56psa07tCUJmpC"
          ></iframe>
        </section>
      </div>
    </div>
  );
}

export default App;
