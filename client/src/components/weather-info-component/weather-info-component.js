import React, { Component } from "react";
import PropTypes from "prop-types";
import Clock from "react-live-clock";
import { WeatherWidget } from "../weather-widget-component/weather-widget.component";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./weather-info.component.scss";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 320,
    width: 600
  }
});

class WeatherInfo extends Component {
  convertFToC = f => {
    let c = Math.round((f - 32) * (5 / 9));
    if (c > 0) {
      return `+${c}°C`;
    } else {
      return `${c}°C`;
    }
  };

  render() {
    const { classes } = this.props;

    const { weatherData } = this.props;
    return (
      <div className="weather-info">
        <div className="weather-info__table">
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Weather information</TableCell>
                  <TableCell align="left">
                    <WeatherWidget weatherData={weatherData} />
                  </TableCell>
                  <TableCell align="right">
                    {weatherData.currently.summary}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Temperature</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="right">
                    {this.convertFToC(weatherData.currently.temperature)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Apparent temperature</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="right">
                    {this.convertFToC(
                      weatherData.currently.apparentTemperature
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Humidity</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="right">
                    {(weatherData.currently.humidity * 100).toFixed(0)}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Clock
                      format={"HH:mm:ss"}
                      ticking={true}
                      timezone={weatherData.timezone}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Timezone</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="right">{weatherData.timezone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WeatherInfo);
