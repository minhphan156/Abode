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
import { isWidthDown } from "@material-ui/core/withWidth";

let styles = theme => {};

let CityDescription = props => {
  let { classes, city } = props;
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
            <Typography variant="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
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
            <ul>
              <li>
                <Typography variant="body">Golden Gate Bridge</Typography>
              </li>
              <li>
                <Typography variant="body">Alcatraz Island</Typography>
              </li>
              <li>
                <Typography variant="body">Fisherman's Wharf</Typography>
              </li>
              <li>
                <Typography variant="body">Golden Gate Park</Typography>
              </li>
              <li>
                <Typography variant="body">Pier 39</Typography>
              </li>
            </ul>
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
