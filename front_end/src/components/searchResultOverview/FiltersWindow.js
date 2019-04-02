import React from "react";
import PropTypes from "prop-types";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  Typography
} from "@material-ui/core";
import { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

// Component styling
let styles = theme => ({
  rating: {
    padding: 0,
    margin: 0
  },
  subtitles: { fontWeight: "bold", color: "#808080" }
});

// React Functional Component (has no states) for the filters window of SearchResultOverview component
let FiltersWindow = props => {
  let { classes, width, handleCheck } = props;
  return (
    <Grid
      item
      container
      xs={12}
      md={2}
      direction={isWidthDown("sm", width) ? "flow" : "column"}
      justify={isWidthDown("sm", width) ? "center" : "flex-start"}
      spacing={0}
    >
      <Grid item xs={6} md="auto">
        <Card style={{ padding: 10 }} square="false">
          <Grid container direction="column" spacing={0}>
            <Grid item>
              <Typography className={classes.subtitles} variant="subtitle2">
                Star Rating:
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="star5" />}
                label="5-star"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="star4" />}
                label="4-star"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="star3" />}
                label="3-star"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="star2" />}
                label="2-star"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="star1" />}
                label="1-star"
                className={classes.rating}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={6} md="auto">
        <Card style={{ padding: 10 }} square="false">
          <Grid container direction="column" spacing={0}>
            <Grid item>
              <Typography className={classes.subtitles} variant="subtitle2">
                Guest Rating:
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="Awesome" />}
                label="Awesome: (9+)"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="Very Good" />}
                label="Very Good: (8+)"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="Good" />}
                label="Good: (7+)"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="Adequate" />}
                label="Adequate: (6+)"
                className={classes.rating}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="No Rating" />}
                label="No Rating"
                className={classes.rating}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md="auto" spacing={0}>
        <Card style={{ padding: 10 }} square="false">
          <Grid item>
            <Typography className={classes.subtitles} variant="subtitle2">
              Amenities:
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Free WiFi"
              onChange={handleCheck("free_wifi")}
              control={<Checkbox value="free_wifi" />}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Free Parking"
              control={<Checkbox value="free_parking" />}
              onChange={handleCheck("free_parking")}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Free Breakfast"
              control={<Checkbox value="free_breakfast" />}
              onChange={handleCheck("free_breakfast")}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Recreational Pool"
              control={<Checkbox value="pool" />}
              onChange={handleCheck("pool")}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Pet Friendly"
              control={<Checkbox value="pet_friendly" />}
              onChange={handleCheck("pet_friendly")}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

FiltersWindow.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCheck: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(FiltersWindow));
