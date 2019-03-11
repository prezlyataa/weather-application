import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import WeatherInfo from "../weather-info-component/weather-info-component";
import { SavedPlaces } from "../saved-places-component/saved-places.component";
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
      weatherData: {},
      places: []
    };
  }

  componentDidMount() {
    this.setPlaces();
  }

  handleChange = e => {
    this.setState({ address: e.target.value });
  };

  savePlace = place => {
    let places = [];
    let localStoragePlaces = JSON.parse(localStorage.getItem("places"));
    if (localStoragePlaces !== null) {
      places = localStoragePlaces;
      if (!places.includes(place)) {
        places.push(place);
      }
      localStorage.setItem("places", JSON.stringify(places));
    } else {
      if (!places.includes(place)) {
        places.push(place);
      }
      localStorage.setItem("places", JSON.stringify(places));
    }
  };

  setPlaces = () => {
    let places = JSON.parse(localStorage.getItem("places"));
    if (places !== null) {
      this.setState({ places: places.slice(-5) });
    }
  };

  fetchWeather = () => {
    const { address } = this.state;
    if (address.length > 0) {
      axios
        .get("http://localhost:5000/weather", { params: { address: address } })
        .then(res => {
          this.setState({ weatherData: res.data });
        })
        .then(() => {
          this.savePlace(address);
          this.setPlaces();
        });
    }
  };

  setPlaceFromLast = place => {
    this.setState({ address: place });
    this.fetchWeather();
  };

  render() {
    const { classes } = this.props;
    const { weatherData, places } = this.state;
    console.log(this.state.address);
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
        <SavedPlaces places={places} setPlaceFromLast={this.setPlaceFromLast} />
        {Object.keys(weatherData).length > 0 && (
          <div>
            <WeatherInfo weatherData={weatherData} />
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
