import React, { Component } from "react";

class WeatherRouteText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: this.props.weather,
      route: this.props.route
    };
  }

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

  render() {
    // console.log(this.state.route);
    return (
      <div className="row">
        <div className="column">
          <h3 className="title">
            <u>Directions</u>
          </h3>
          <ul className="no-bullets">
            {this.state.route.map((x, i) => (
              <>
                <h4 className="stage">Stage {i + 1}</h4>
                <li key={i}>{x}</li>
                <h3 className="title">
                  <u>
                    Plan on the following weather conditions during your trip.
                  </u>
                </h3>
                <span>
                  <li className="no-bullets" key={i}>
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        this.state.weather[i]["daily"][0]["weather"][0][
                          "icon"
                        ] +
                        "@2x.png"
                      }
                      alt="weather icon"
                    />
                    <p>
                      {
                        this.state.weather[i]["daily"][0]["weather"][0][
                          "description"
                        ]
                      }
                    </p>
                    <h5>
                      <u>Roads Hazards and Alerts</u>
                    </h5>
                    <p>{this.state.weather[i]["alerts"][0]["event"]}</p>
                  </li>
                  <p>
                    <pre>
                      <p className="low">Low</p> {this.getMinFeels(i)},{" "}
                      <p className="low">High</p> {this.getMaxFeels(i)},{" "}
                      <p className="low">Wind speed</p>{" "}
                      {this.state.weather[i]["daily"][0]["wind_speed"]}
                    </pre>
                  </p>
                </span>
              </>
            ))}
          </ul>
        </div>
        <div className="column">
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
