import React, { useState } from "react";

import WeatherRouteText from "./WeatherRouteText";
import Button from "./Button";
import axios from "axios";
import "../App.css";

const { createProxyMiddleware } = require("http-proxy-middleware");

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      dest: "",
      isActive: true,
      route: ["processing"],
      weather: ["processing"],
      map: ""
    };

    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDest = this.handleChangeDest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnToInput = this.returnToInput.bind(this);
  }

  returnToInput(event) {
    this.setState({
      origin: "",
      dest: "",
      isActive: true,
      route: ["processing"],
      weather: ["processing"],
      map: ""
    });
  }

  handleChangeOrigin(event) {
    this.setState({ origin: event.target.value });
  }
  handleChangeDest(event) {
    this.setState({ dest: event.target.value });
  }
  handleSubmit(event) {
    let destinations = { origin: this.state.origin, dest: this.state.dest };

    this.setState({ map: "" });

    axios
      .post("/destinations", {
        destinations
      })
      .then(response => {
        let data = response.data;
        this.setState({ route: data.routeDirections });
        this.setState({ weather: data.routeWeather });
        this.setState({ map: data.map });
      });
    this.setState({ origin: "", dest: "", isActive: false });
    event.preventDefault();
  }

  render() {
    if (this.state.isActive === true) {
      return (
        <div className="row">
          <div className="column">
            <form className="form" onSubmit={this.handleSubmit}>
              {" "}
              <label>
                Origin:
                <input
                  className="form_email"
                  type="text"
                  placeholder="15 Elmwood, Clinton, CT"
                  value={this.state.origin}
                  onChange={this.handleChangeOrigin}
                />{" "}
              </label>
              <label>
                Destination:
                <input
                  className="form_email"
                  type="text"
                  placeholder="100 Main St, New York, NY"
                  value={this.state.dest}
                  onChange={this.handleChangeDest}
                />{" "}
              </label>
              <input className="form_button" type="submit" value="Submit" />
            </form>
            <h4>Enter origin and destination points as shown.</h4>
          </div>
        </div>
      );
    }

    if (this.state.isActive !== true) {
      if (
        this.state.route[0] !== "processing" &&
        this.state.weather[0] !== "processing"
      ) {
        return (
          <div className="row">
            <div className="column">
              <img src={this.state.map} />
              <WeatherRouteText
                weather={this.state.weather}
                route={this.state.route}
              />

              <Button function={this.returnToInput} text={"New Search"} />
            </div>
          </div>
        );
      } else {
        return <h3>Processing...</h3>;
      }
    }
  }
}

export default Inputs;
