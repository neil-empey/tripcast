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

  getMinFeels(x) {
    return this.state.weather[x]["daily"][0]["feels_like"]["morn"];
  }

  getMaxFeels(x) {
    return this.state.weather[x]["daily"][0]["feels_like"]["day"];
  }

  getWeather() {
    let descrip = [];

    this.state.weather.map((x, i) => {
      let conditions = {
        current_descrip: x["daily"][0]["weather"][0]["description"],
        alerts: x["alerts"][0]["event"],
        icon: x["daily"][0]["weather"][0]["icon"]
      };
      descrip.push(conditions);
    });

    return descrip;
  }

  render() {
    console.log(this.state.weather);
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
              <h5 className="stage">Stage {i + 1}</h5>
              <li className="no-bullets" key={i}>
                <img src="http://openweathermap.org/img/wn/`${{x["icon"]}}`@2x.png" alt="weather icon"/>
                <p>{x["current_descrip"]}</p>
                <h5><u>Roads Hazards and Alerts</u></h5>
                <p>{x["alerts"]}</p>
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
