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
              {/* TODO: Update placeholder once backend is connected */}
              San Francisco is often called "Everybody’s Favorite City," a title earned by its scenic beauty, cultural attractions, diverse communities, and world-class cuisine. Measuring 49 square miles, this very walk-able city is dotted with landmarks like the Golden Gate Bridge, cable cars, Alcatraz and the largest Chinatown in the United States. A stroll of the City’s streets can lead from Union Square to North Beach to Fisherman’s Wharf, with intriguing neighborhoods to explore at every turn. Views of the Pacific Ocean and San Francisco Bay are often laced with fog, creating a romantic mood in this most European of American cities.
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
            {/* TODO: Update placeholder once backend is connected */}
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
