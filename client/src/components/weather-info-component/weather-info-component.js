import React, { Component } from "react";
import "./weather-info.component.scss";

export class WeatherInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { weatherData } = this.props;
    return (
      <div className="weather-info">
        <p>
          Timezone: {weatherData.timezone} | time: {weatherData.currently.time}
        </p>
        <p>{weatherData.currently.summary}</p>
        <p>Apparent temperature {weatherData.currently.apparentTemperature}</p>
        <p>Temperature {weatherData.currently.temperature}</p>
      </div>
    );
  }
}
