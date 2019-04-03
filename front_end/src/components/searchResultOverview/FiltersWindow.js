import React from "react";
import PropTypes from "prop-types";
import ReactStars from "react-stars";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  Typography,
  TextField,
  InputAdornment
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";

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
  let {
    classes,
    width,
    handleAmenities,
    handleStarRatings,
    handleGuestRatings,
    guest_rate,
    star_rate
  } = props;
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
      <Grid item xs={12} md="auto">
        <Card style={{ padding: 10 }} square="false">
          <Grid container direction="column" spacing={0}>
            <Grid item>
              <Typography className={classes.subtitles} variant="subtitle2">
                {`Star Rating: ${star_rate > 0 ? `(${star_rate})` : ""}`}
              </Typography>
            </Grid>
            <Grid item>
              <ReactStars
                value={star_rate}
                count={5}
                onChange={handleStarRatings}
                size={32}
                color2={"#ffd700"}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md="auto">
        <Card style={{ padding: 10 }} square="false">
          <Grid container direction="flow" spacing={0}>
            <Grid item xs={12}>
              <Typography className={classes.subtitles} variant="subtitle2">
                {`Guest Rating: ${guest_rate > 0 ? `(${guest_rate})` : ""}`}
              </Typography>
            </Grid>
            <Grid item direction="flow">
              <ReactStars
                value={guest_rate}
                count={10}
                onChange={handleGuestRatings}
                size={24}
                color2={"#ffd700"}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md="auto" spacing={0}>
        <Card style={{ padding: 10 }} square="false">
          <Grid
            container
            direction="flow"
            alignItems="center"
            justify="center"
            spacing={8}
          >
            <Grid item xs={12}>
              <Typography className={classes.subtitles} variant="subtitle2">
                Price Range:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="min_price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                margin="none"
              />
            </Grid>
            <Grid item xs={1}>
              <Typography
                className={classes.subtitles}
                style={{ height: "auto" }}
                variant="subtitle2"
              >
                -
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="max_price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                margin="none"
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
              name="free_wifi"
              onChange={handleAmenities}
              control={<Checkbox value="free_wifi" />}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Free Parking"
              name="free_parking"
              control={<Checkbox value="free_parking" />}
              onChange={handleAmenities}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Free Breakfast"
              name="free_breakfast"
              control={<Checkbox value="free_breakfast" />}
              onChange={handleAmenities}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Recreational Pool"
              name="pool"
              control={<Checkbox value="pool" />}
              onChange={handleAmenities}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.rating}
              label="Pet Friendly"
              name="pet_friendly"
              control={<Checkbox value="pet_friendly" />}
              onChange={handleAmenities}
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
