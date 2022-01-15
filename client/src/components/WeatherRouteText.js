import React, { Component } from "react";

class WeatherRouteText extends Component {
  state = {
    weather: this.props.weather,
    route: this.props.route,
    map: this.props.map
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

  getMinFeels(x) {
    return this.state.weather[x]["daily"][0]["feels_like"]["morn"];
  }

  getMaxFeels(x) {
    return this.state.weather[x]["daily"][0]["feels_like"]["day"];
  }

  getWeather() {
    let descrip = [];
    console.log(this.state.weather);

    this.state.weather.map((x, i) => {
      descrip.push(x["daily"][0]["weather"][0]["description"]);
    });

    return descrip;
  }

  render() {
    // console.log(this.state.weather);
    // console.log(this.state.route);
    return (
      <div className="row">
        <img src={this.state.map} alt="route map"></img>
        <div className="column">
          <h3 className="title">
            <u>Directions</u>
          </h3>
          <ul className="no-bullets">
            {this.state.route.map((x, i) => (
              <>
                <h4 className="stage">Stage {i + 1}</h4>
                <li key={i}>{x}</li>
              </>
            ))}
          </ul>
        </div>
        <div className="column">
          <h3 className="title">
            <u>Plan on the following weather conditions during your trip.</u>
          </h3>
          {this.getWeather().map((x, i) => (
            <span>
              <h4 className="stage">Stage {i + 1}</h4>
              <li className="no-bullets" key={i}>
                {x}
              </li>
              <p>
                <pre>
                  Feels like low {this.getMinFeels(i)}, high{" "}
                  {this.getMaxFeels(i)}, Wind speed{" "}
                  {this.state.weather[i]["daily"][0]["wind_speed"]}
                </pre>
              </p>
            </span>
          ))}

          <br></br>
          <h4>
            Expect an actual minimum temperature of {this.getMinMax()[0]} and
            maximum of {this.getMinMax()[1]}
          </h4>
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
