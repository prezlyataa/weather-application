import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import WeatherInfo from "../weather-info-component/weather-info-component";
import { SavedPlaces } from "../saved-places-component/saved-places.component";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
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
      places: [],
      open: false
    };
  }

  componentDidMount() {
    this.setPlaces();
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

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

  fetchWeather = address => {
    if (address.length > 0) {
      axios
        .get("/weather", { params: { address: address } })
        .then(res => {
          this.setState({ weatherData: res.data });
        })
        .then(() => {
          this.savePlace(address);
          this.setPlaces();
        })
        .catch(e => {
          console.log(e);
          this.handleClick();
        });
    }
  };

  setPlaceFromLast = place => {
    this.setState({ address: place });
    this.fetchWeather(place);
  };

  render() {
    const { classes } = this.props;
    const { weatherData, places, address } = this.state;
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
              onClick={() => {
                this.fetchWeather(address);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Unable to fetch weather</span>}
            action={[
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleClose}
              >
                UNDO
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              />
            ]}
          />
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
