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
  Divider,
  Typography,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  MenuItem,
  Button,
  Menu,
  Hidden
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import { ExpandMore, FilterList } from "@material-ui/icons";
import { Slider } from "@material-ui/lab";

// Component styling
let styles = theme => ({
  rating: {
    padding: 0,
    margin: 0
  },
  subtitles: { fontWeight: "bold", color: "#808080" },
  pad10: {
    padding: 10
  }
});

// Custom Number Format Component for Price Range TextFields
// Ensures that user input is restricted to non-negative integers
let NumberFormatCustom = props => {
  let { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      allowNegative={false}
      thousandSeparator
      prefix="$"
    />
  );
};

// React Functional Component (has no states) for the filters window of SearchResultOverview component
class FiltersWindow extends Component {
  constructor() {
    super();

    this.state = {
      priceRangeAnchorEl: null,
      priceRangeEquality: "To"
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
        xs={12}
        sm={4}
        md={3}
        lg={2}
        direction={isWidthDown("sm", width) ? "row" : "column"}
        justify={"flex-start"}
        spacing={0}
      >
        <ExpansionPanel
          defaultExpanded={width == "xs" ? false : true}
          square="false"
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.subtitles} variant="subtitle2">
              <FilterList /> Filters
            </Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails className={classes.rating}>
            <Grid
              container
              direction={isWidthDown("sm", width) ? "row" : "column"}
              justify="flex-start"
              spacing={0}
            >
              <Grid item xs={12} md="auto">
                <Grid container className={classes.pad10} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={this.props.handleApply}>
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12} md="auto" boxShadow="false">
                <Grid
                  container
                  className={classes.pad10}
                  direction="column"
                  spacing={0}
                >
                  <Grid item>
                    <Typography
                      className={classes.subtitles}
                      variant="subtitle2"
                    >
                      {`Star Rating: ${star_rate > 0 ? `(${star_rate} and up)` : ""}`}
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
                <Divider />
              </Grid>
              <Grid item xs={12} md="auto">
                <Grid
                  container
                  className={classes.pad10}
                  direction="column"
                  spacing={0}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={classes.subtitles}
                      variant="subtitle2"
                    >
                      {`Guest Rating: ${
                        guest_rate > 0 ? `(${guest_rate} and up)` : ""
                      }`}
                    </Typography>
                  </Grid>
                  <Grid item direction="flow">
                    <Slider
                      style={{padding: 15}}
                      value={guest_rate}
                      min={0}
                      max={10}
                      step={1}
                      onChange={handleGuestRatings}
                    />
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
              <Grid item xs={12} md="auto" spacing={0}>
                <Grid
                  container
                  className={classes.pad10}
                  direction="flow"
                  alignItems="center"
                  justify="center"
                  spacing={8}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={classes.subtitles}
                      variant="subtitle2"
                    >
                      Price Range:
                    </Typography>
                  </Grid>
                  <Hidden lgDown={priceRangeEquality != "To" ? true : false}>
                    <Grid item xs>
                      <TextField
                        value={priceRangeEquality != "To" ? "" : price_low}
                        disabled={priceRangeEquality != "To" ? true : false}
                        InputProps={{
                          inputComponent: NumberFormatCustom
                        }}
                        onChange={handlePriceRangeChange("price_low")}
                        error={price_low > price_high ? true : false}
                        margin="none"
                      />
                    </Grid>
                  </Hidden>
                  <Grid item xs>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ width: "100%" }}
                      onClick={this.handleEqualityMenuOpen}
                      textTransform="false"
                    >
                      <Typography
                        className={classes.subtitles}
                        variant="caption"
                      >
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
                      <MenuItem
                        onClick={this.handleEqualityMenuClose("Less than")}
                      >
                        Less than
                      </MenuItem>
                    </Menu>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      value={price_high}
                      InputProps={{
                        inputComponent: NumberFormatCustom
                      }}
                      onChange={handlePriceRangeChange("price_high")}
                      error={price_low > price_high ? true : false}
                      margin="none"
                    />
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
              <Grid item xs={12} md="auto" spacing={0}>
                <Grid container direction="column" className={classes.pad10}>
                  <Grid item>
                    <Typography
                      className={classes.subtitles}
                      variant="subtitle2"
                    >
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
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
