import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./weather-widget.component.scss";

const defaults = {
  icon: "RAIN",
  color: "lightblue",
  size: 100,
  animate: true
};

export class WeatherWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { weatherData } = this.props;
    return (
      <div className="weather-widget">
        <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
    );
  }
}
