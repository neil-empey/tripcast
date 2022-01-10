import React, { Component } from "react";

class WeatherRouteText extends Component {
  state = {
    weather: this.props.weather,
    route: this.props.route
  };

  getMinMax() {
    let max = [];
    let min = [];
    this.state.weather.map((x, i) => {
      min.push(x["daily"][0]["temp"]["min"]);
      max.push(x["daily"][0]["temp"]["max"]);
    });

    const getMin = (a, b) => (a < b ? a : b);
    const getMax = (a, b) => (a > b ? a : b);

    let low = min.reduce(getMin);
    let high = max.reduce(getMax);

    return [low, high];
  }

  getWeather() {
    let descrip = [];
    this.state.weather.map((x, i) => {
      if (!descrip.includes(x["daily"][0]["weather"][0]["description"])) {
        descrip.push(x["daily"][0]["weather"][0]["description"]);
      }
    });

    return descrip;
  }

  render() {
    console.log(this.state.weather);
    console.log(this.state.route);
    return (
      <div className="row">
        <div className="column">
          <h3>Directions</h3>
          <ul className="no-bullets">
            {this.state.route.map((x, i) => (
              <>
                <p>STEP {i + 1}</p>
                <li key={i}>{x}</li>
              </>
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>
            You can plan on the following weather conditions over the course of
            your trip.
          </h3>
          {this.getWeather().map((x, i) => (
            <li key={i}>{x}</li>
          ))}

          <br></br>
          <h3>
            Expect a minimum temperature of {this.getMinMax()[0]} and maximum of{" "}
            {this.getMinMax()[1]}
          </h3>
        </div>
        <footer>
          <p>
            <small>
              *All weather data is for the current calendar day of travel
            </small>
          </p>
        </footer>
      </div>
    );
  }
}

export default WeatherRouteText;

//<WeatherText weather={this.state.weather} />
//<Button function={this.returnToInput} text={"New Search"} />
