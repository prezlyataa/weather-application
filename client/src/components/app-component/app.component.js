import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import WeatherInfo from "../weather-info-component/weather-info-component";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import "./app.component.scss";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
};

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      weatherData: {}
    };
  }

  handleChange = e => {
    this.setState({ address: e.target.value });
  };

  fetchWeather = () => {
    const { address } = this.state;
    if (address.length > 0) {
      axios
        .get("http://localhost:5000/weather", { params: { address: address } })
        .then(res => {
          this.setState({ weatherData: res.data });
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { weatherData } = this.state;
    console.log(weatherData);

    return (
      <div className="app">
        <div className="app__title">
          <h2>Weather app</h2>
        </div>
        <div className="app__search">
          <Paper className={classes.root} elevation={1}>
            <InputBase
              className={classes.input}
              placeholder="Country, city or zip code"
              onChange={this.handleChange}
            />
            <IconButton
              className={classes.iconButton}
              aria-label="Search"
              onClick={this.fetchWeather}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        {Object.keys(weatherData).length > 0 && (
          <div>
            <WeatherInfo weatherData={weatherData}/>
          </div>
        )}
      </div>
    );
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppComponent);
