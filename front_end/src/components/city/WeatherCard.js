// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Material-UI imports
import {
  withStyles,
  withWidth,
  Grid,
  Card,
  Typography
} from "@material-ui/core";

let styles = theme => ({
  pad8: {
    padding: 8
  },
  weatherIcon: {
    width: 50,
    height: 50
  }
});

let WeatherCard = props => {
  let { classes, city } = props;

  let weatherIcon = () => {
    if (city.weatherData != null) {
      return (
        <img
          className={classes.weatherIcon}
          src={`http://openweathermap.org/img/w/${
            city.weatherData.weather[0].icon
          }.png`}
          alt="weather icon"
        />
      );
    } else {
      return "";
    }
  };

  return (
    <Card className={classes.pad8}>
      <Grid container direction="column">
        <Grid item xl={12}>
          <Typography variant="h6">Current Weather Conditions:</Typography>
        </Grid>
        <Grid item xl={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xl={6}>
              <Typography variant="subtitle">Weather</Typography>
            </Grid>
            <Grid item xl={6}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={8}
              >
                <Grid item>
                  <Typography variant="subtitle">
                    {city.weatherData != null
                      ? city.weatherData.weather[0].main
                      : ""}
                  </Typography>
                </Grid>
                <Grid item>{weatherIcon()}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

// Expected props
WeatherCard.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(WeatherCard));
