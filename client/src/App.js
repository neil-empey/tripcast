import logo from "./logo.svg";
import "./App.css";
import Inputs from "./components/Inputs";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <div className="app">
        <h1 className="trip">TripCast</h1>
        <h2 className="">Directions and Weather</h2>
        <Inputs />

        <div className="">
          <img
            className="gif"
            src="https://res.cloudinary.com/hwomdjzqy/image/upload/v1642560873/pexels-quintin-gellar-844167_gcaav1.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
