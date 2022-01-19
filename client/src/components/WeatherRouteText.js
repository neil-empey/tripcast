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
      <div className="">
        <div className="">
          <h5 className="title">
            <u>Directions and Weather at every stage</u>
          </h5>
          <ul className="no-bullets">
            {this.state.route.map((x, i) => (
              <div className="">
                <p className="stage">
                  Stage {i + 1}
                  <li className="stage" key={i}>
                    {x}

                    {i % 2 >= 1 ? (
                      <>
                        <figure>
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
                        </figure>

                        {
                          this.state.weather[i]["daily"][0]["weather"][0][
                            "description"
                          ]
                        }
                      </>
                    ) : (
                      <p></p>
                    )}

                    <u>Roads Hazards and Alerts</u>

                    {this.state.weather[i]["alerts"] !== undefined ? (
                      <p>{this.state.weather[i]["alerts"][0]["event"]}</p>
                    ) : (
                      <p>n/a</p>
                    )}
                  </li>
                  <pre>
                    <p className="low">
                      Low {this.getMinFeels(i)} High {this.getMaxFeels(i)} Wind
                      speed {this.state.weather[i]["daily"][0]["wind_speed"]}
                    </p>
                  </pre>
                </p>
              </div>
            ))}
          </ul>
        </div>
        <div>
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
