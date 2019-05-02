// React essential imports
import React from "react";
import PropTypes from "prop-types";

import "./WeatherCard.css";
// Material-UI imports
import {
  withStyles,
  withWidth,
  Grid,
  Card,
  Typography,
  CircularProgress,
  Hidden
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";

let styles = theme => ({
  cardMargin: {
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  pad8: {
    padding: 8
  },
  weatherIcon: {
    width: "100%"
  },
  greyText: {
    color: "#808080"
  }
});

let WeatherCard = props => {
  let { classes, city, width } = props;

  let loadingWeather = () => {
    return (
      <Card
        className={classes.cardMargin}
        square={true}
        style={{ height: "100%" }}
      >
        <Grid
          container
          style={{ width: "100%", height: "100%" }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Card>
    );
  };

  if (city.weatherData != null) {
    let weatherIcon = day => {
      return (
        <img
          className={classes.weatherIcon}
          src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
          alt="weather icon"
        />
      );
    };

    let forecastArray = [];
    for (let i = 0; i < city.weatherData.cnt; i += city.weatherData.cnt / 5) {
      forecastArray.push(city.weatherData.list[i]);
    }

    let currentDayOfWeek = new Date().getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    days[currentDayOfWeek] = "Today";
    days[currentDayOfWeek+1] = "Tomorrow";

    let fiveDayForecastMarkup = forecastArray.map(forecastDay => {
      if (currentDayOfWeek === 7) {
        currentDayOfWeek = 0;
      };

      return (
        <Grid item xs={6} md>
          <Card style={{ padding: 8 }} square={true}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item xs={12}>
                <Typography
                  className={classes.greyText}
                  variant={isWidthDown("sm", width) ? "subtitle" : "h6"}
                >
                  {days[currentDayOfWeek++]}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ width: "100%" }}>
                <Grid container direction="row" justify="center">
                  <Grid item>
                    <Typography
                      class="temperature"
                      variant={isWidthDown("sm", width) ? "h6" : "h3"}
                    >
                      {`${forecastDay.main.temp.toFixed(0)}°F`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ width: "100%" }}>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography class="weatherStatus" variant="subtitle">
                      {`${forecastDay.weather[0].main}`}
                    </Typography>
                  </Grid>
                  <Grid item>{weatherIcon(forecastDay)}</Grid>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{color:'#568cba'}}
                  >
                    <Grid item>
                      <span className={classes.greyText}>Lo:</span>{" "}
                      {`${forecastDay.main.temp_min}°F`}
                    </Grid>
                    <Grid item>
                      <span className={classes.greyText}>Hi:</span>{" "}
                      {`${forecastDay.main.temp_max}°F`}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography className={classes.greyText} variant="subtitle">
                        Humidity
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle">
                        {`${forecastDay.main.humidity} g/m3`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Grid>
      );
    });

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={8}
      >
        {fiveDayForecastMarkup}
      </Grid>
    );
  } else {
    return loadingWeather();
  }
};

// Expected props
WeatherCard.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(WeatherCard));
