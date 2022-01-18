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
      map: "",
      conditions: []
    };

    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDest = this.handleChangeDest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnToInput = this.returnToInput.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  returnToInput(event) {
    this.setState({
      origin: "",
      dest: "",
      isActive: true,
      route: ["processing"],
      weather: ["processing"],
      map: "",
      conditions: []
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

  getWeather() {
    let descrip = [];

    this.state.weather.map((x, i) => {
      let conditions = {};
      if (x["alerts"] !== undefined) {
        conditions = {
          current_descrip: x["daily"][0]["weather"][0]["description"],
          alerts: x["alerts"][0]["event"],
          icon: x["daily"][0]["weather"][0]["icon"]
        };
        descrip.push(conditions);
      } else {
        conditions = {
          current_descrip: x["daily"][0]["weather"][0]["description"],
          alerts: "N/A",
          icon: x["daily"][0]["weather"][0]["icon"]
        };
        descrip.push({
          current_descrip: x["daily"][0]["weather"][0]["description"],
          icon: x["daily"][0]["weather"][0]["icon"]
        });
      }
    });

    console.log(this.state.conditions);
    return descrip;
  }

  render() {
    if (this.state.isActive === true) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            {" "}
            <label>
              Origin:
              <input
                type="text"
                placeholder="15 Elmwood, Clinton, CT"
                value={this.state.origin}
                onChange={this.handleChangeOrigin}
              />{" "}
            </label>
            <label>
              Destination:
              <input
                type="text"
                placeholder="100 Main St, New York, NY"
                value={this.state.dest}
                onChange={this.handleChangeDest}
              />{" "}
            </label>
            <input type="submit" value="Submit" />
          </form>
          <h4>Enter origin and destination points as shown.</h4>
        </div>
      );
    }

    if (this.state.isActive !== true) {
      if (
        this.state.route[0] !== "processing" &&
        this.state.weather[0] !== "processing"
      ) {
        return (
          <div>
            <img src={this.state.map} />
            <WeatherRouteText
              weather={this.state.weather}
              route={this.state.route}
              conditions={this.getWeather}
            />
            <Button function={this.returnToInput} text={"New Search"} />
          </div>
        );
      } else {
        return <h3>Processing...</h3>;
      }
    }
  }
}

export default Inputs;
