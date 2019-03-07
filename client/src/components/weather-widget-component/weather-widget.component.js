import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./weather-widget.component.scss";

const defaults = {
  icon: "RAIN",
  color: "lightblue",
  size: 40,
  animate: true
};

const ICONS = [
  "CLEAR_DAY",
  "CLEAR_NIGHT",
  "PARTLY_CLOUDY_DAY",
  "PARTLY_CLOUDY_NIGHT",
  "CLOUDY",
  "RAIN",
  "SLEET",
  "SNOW",
  "WIND",
  "FOG"
];

export class WeatherWidget extends Component {
  constructor(props) {
    super(props);
  }

  formateStr = str => {
    return str.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  };

  formanttedIcons = (icons) => {
    return icons.map(icon => {
      return this.formateStr(icon);
    });
  };

  setIcon = icon => {
    if(this.formanttedIcons(ICONS).some(i => {
      return i === this.formateStr(icon);
    })) {
      return ICONS[this.formanttedIcons(ICONS).indexOf(this.formateStr(icon))];
    } else {
      return 'CLOUDY'
    }
  };

  render() {
    const { weatherData } = this.props;
    return (
      <div className="weather-widget">
        <ReactAnimatedWeather
          icon={this.setIcon(weatherData.currently.icon)}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
    );
  }
}
