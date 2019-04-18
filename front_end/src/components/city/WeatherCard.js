// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Material-UI imports
import {
  withStyles,
  withWidth,
  Grid,
  Card,
  Typography,
  CircularProgress
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
      <Card className={classes.cardMargin} style={{ height: "100%" }}>
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

  if (city.weatherData != null) {
    return (
      <Card className={classes.cardMargin} square={true}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant={isWidthDown("lg", width) ? "h2" : "h1"}
              style={{ fontWeight: "bold" }}
            >
              {`${city.weatherData.main.temp}°F`}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              style={{ width: "100%" }}
            >
              <Grid item>
                <Typography variant="subtitle">
                  {city.weatherData.weather[0].main}
                </Typography>
              </Grid>
              <Grid item lg={2}>
                {weatherIcon()}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ width: "100%" }}
            >
              <Grid item>
                <Typography variant="subtitle">
                  <span className={classes.greyText}>Lo: </span>
                  {`${city.weatherData.main.temp_min}°F`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle">
                  <span className={classes.greyText}>Hi: </span>
                  {`${city.weatherData.main.temp_max}°F`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ width: "100%" }}
            >
              <Grid item>
                <Typography className={classes.greyText} variant="subtitle">
                  Humidity
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle">
                  {`${city.weatherData.main.humidity}g/m3`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }} />
        </Grid>
      </Card>
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
