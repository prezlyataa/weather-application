import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactAnimatedWeather from 'react-animated-weather';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import './app.component.scss';

const defaults = {
    icon: 'CLEAR_DAY',
    color: 'goldenrod',
    size: 100,
    animate: true
};

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
      address: ''
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="app">
        <div className="app__title">
            <h2>Weather app</h2>
        </div>
        <div className="app__search">
          <Paper className={classes.root} elevation={1}>
            <InputBase className={classes.input} placeholder="City, zip code" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="app__widget">
          <ReactAnimatedWeather
            icon={defaults.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
      </div>
    );
  }
}

AppComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppComponent);
