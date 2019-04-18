// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Child Component imports
import WeatherCard from "./WeatherCard";

// Material UI imports
import {
  Grid,
  withStyles,
  withWidth,
  Typography,
  Divider
} from "@material-ui/core";

let styles = theme => {};

let CityDescription = props => {
  let { classes, city } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={16}
    >
      <Grid item xs={12} style={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ width: "100%" }}
          spacing={16}
        >
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h3">San Francisco</Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={16}
          style={{ width: "100%" }}
        >
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h6">Attractions</Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CityDescription.PropTypes = {
  styles: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(CityDescription));
