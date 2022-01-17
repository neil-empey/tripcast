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
    this.createMarkup = this.createMarkup.bind(this);
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

  createMarkup() {
    return {_html: this.state.map}
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
        this.state.weather[0] !== "processing" && this.state.url !== ""
      ) {
        return (
          <div>
            <div dangerouslySetInnerHTML={this.createMarkup}></div>
            <WeatherRouteText
              weather={this.state.weather}
              route={this.state.route}
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
