// React essential imports
import React from "react";
import PropTypes from "prop-types";

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
  let { city } = props;

  let attractionsMarkup = city.cityData.landmarkNames.map(landmark => {
    return (
      <li>
        <Typography variant="body">{landmark}</Typography>
      </li>
    );
  });

  return (
    <Grid container direction="row" justify="center" spacing={16}>
      <Grid item xs={12} md={6} style={{ width: "100%" }}>
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
            <Typography variant="h6">Description</Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body">{city.cityData.description}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} style={{ width: "100%" }}>
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
          <Grid item xs={12}>
            <ul>{attractionsMarkup}</ul>
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
