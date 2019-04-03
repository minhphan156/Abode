import React, { Component } from "react";
import PropTypes from "prop-types";

// Additional Libraries Imports
import ReactStars from "react-stars";
import NumberFormat from "react-number-format";

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
  InputAdornment,
  MenuItem,
  Button,
  Menu
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

// Component styling
let styles = theme => ({
  rating: {
    padding: 0,
    margin: 0
  },
  subtitles: { fontWeight: "bold", color: "#808080" }
});

// React Functional Component (has no states) for the filters window of SearchResultOverview component
class FiltersWindow extends Component {
  constructor() {
    super();

    this.state = {
      priceRangeAnchorEl: null,
      priceRangeEquality: "to"
    };

    this.handleEqualityMenuClose = this.handleEqualityMenuClose.bind(this);
    this.handleEqualityMenuOpen = this.handleEqualityMenuOpen.bind(this);
  }

  handleEqualityMenuOpen = event => {
    event.preventDefault();
    this.setState({
      priceRangeAnchorEl: event.currentTarget
    });
  };

  handleEqualityMenuClose = value => event => {
    event.preventDefault();
    this.setState({
      priceRangeEquality: value,
      priceRangeAnchorEl: null
    });
  };

  render() {
    let { priceRangeEquality, priceRangeAnchorEl } = this.state;

    let {
      classes,
      width,
      guest_rate,
      star_rate,
      price_low,
      price_high,
      handleAmenities,
      handleStarRatings,
      handleGuestRatings,
      handlePriceRangeChange
    } = this.props;

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
            <Grid container direction="column" spacing={0}>
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
              <Grid item xs={4}>
                <TextField
                  id="min_price"
                  name="price_low"
                  value={priceRangeEquality != "To" ? "" : price_low}
                  disabled={priceRangeEquality != "To" ? true : false}
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                  onChange={handlePriceRangeChange}
                  error={price_low > price_high ? true : false}
                  margin="none"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={this.handleEqualityMenuOpen}
                  textTransform="false"
                >
                  <Typography className={classes.subtitles} variant="caption">
                    {priceRangeEquality}
                  </Typography>
                </Button>
                <Menu
                  anchorEl={priceRangeAnchorEl}
                  open={Boolean(priceRangeAnchorEl)}
                  onClose={this.handleEqualityMenuClose}
                >
                  <MenuItem onClick={this.handleEqualityMenuClose("To")}>
                    To
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleEqualityMenuClose("Greater than")}
                  >
                    Greater than
                  </MenuItem>
                  <MenuItem onClick={this.handleEqualityMenuClose("Less than")}>
                    Less than
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="max_price"
                  name="price_high"
                  value={price_high}
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                  onChange={handlePriceRangeChange}
                  error={price_low > price_high ? true : false}
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
  }
}

FiltersWindow.propTypes = {
  classes: PropTypes.object.isRequired,
  star_rate: PropTypes.number.isRequired,
  guest_rate: PropTypes.number.isRequired,
  price_low: PropTypes.number.isRequired,
  price_high: PropTypes.number.isrequired,
  handleAmenities: PropTypes.func.isRequired,
  handleStarRatings: PropTypes.func.isRequired,
  handleGuestRatings: PropTypes.func.isRequired,
  handlePriceRangeChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(FiltersWindow));
