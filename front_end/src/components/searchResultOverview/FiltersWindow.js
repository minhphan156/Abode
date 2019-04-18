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
import {
  ExpandMore,
  FilterList,
  ChevronLeft,
  ChevronRight,
  Remove
} from "@material-ui/icons";
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
let FiltersWindow = props => {
  let {
    classes,
    width,
    guest_rate,
    star_rate,
    price_low,
    price_high,
    priceRangeEquality,
    priceRangeAnchorEl,
    handleAmenities,
    handleStarRatings,
    handleGuestRatings,
    handlePriceRangeChange,
    handleFiltersApply,
    handleEqualityMenuOpen,
    handleEqualityMenuClose,
    free_wifi,
    free_parking,
    free_breakfast,
    pool,
    pet_friendly
  } = props;

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      lg={3}
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
            <Grid item xs={12} md="auto" boxShadow="false">
              <Grid
                container
                className={classes.pad10}
                direction="row"
                justify="center"
                spacing={0}
              >
                <Grid item xs={12}>
                  <Typography className={classes.subtitles} variant="subtitle2">
                    {`Star Rating: (${star_rate} and up)`}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
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
                  <Typography className={classes.subtitles} variant="subtitle2">
                    {`Guest Rating: (${guest_rate} and up)`}
                  </Typography>
                </Grid>
                <Grid item direction="flow">
                  <Slider
                    style={{ padding: 15 }}
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
                justify="center"
                alignItems="center"
                spacing={8}
              >
                <Grid item xs={12}>
                  <Typography className={classes.subtitles} variant="subtitle2">
                    Price Range:
                  </Typography>
                </Grid>
                <Hidden xlDown={priceRangeEquality != "To" ? true : false}>
                  <Grid item xs>
                    <TextField
                      label="min"
                      value={priceRangeEquality != "To" ? "" : price_low}
                      disabled={priceRangeEquality != "To" ? true : false}
                      InputProps={{
                        inputComponent: NumberFormatCustom
                      }}
                      onChange={handlePriceRangeChange("price_low")}
                      error={
                        (price_low != null && price_low == price_high) ||
                        price_low > price_high
                          ? true
                          : false
                      }
                      margin="none"
                      variant="outlined"
                    />
                  </Grid>
                </Hidden>
                <Grid item xs="auto">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={handleEqualityMenuOpen}
                  >
                    <Typography className={classes.subtitles} variant="caption">
                      {priceRangeEquality}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={priceRangeAnchorEl}
                    open={Boolean(priceRangeAnchorEl)}
                    onClose={handleEqualityMenuClose(null)}
                  >
                    <MenuItem onClick={handleEqualityMenuClose("To")}>
                      To
                    </MenuItem>
                    <MenuItem onClick={handleEqualityMenuClose("Greater than")}>
                      Greater than
                    </MenuItem>
                    <MenuItem onClick={handleEqualityMenuClose("Less than")}>
                      Less than
                    </MenuItem>
                  </Menu>
                </Grid>
                <Grid item xs>
                  <TextField
                    label={priceRangeEquality != "To" ? "price" : "max"}
                    value={price_high}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    onChange={handlePriceRangeChange("price_high")}
                    error={
                      (price_high != null && price_low == price_high) ||
                      price_low > price_high
                        ? true
                        : false
                    }
                    margin="none"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Divider />
            </Grid>
            <Grid item xs={12} md="auto" spacing={0}>
              <Grid container direction="column" className={classes.pad10}>
                <Grid item>
                  <Typography className={classes.subtitles} variant="subtitle2">
                    Amenities:
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Free WiFi"
                    control={
                      <Checkbox
                        checked={free_wifi}
                        onChange={handleAmenities("free_wifi")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Free Parking"
                    control={
                      <Checkbox
                        checked={free_parking}
                        onChange={handleAmenities("free_parking")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Free Breakfast"
                    control={
                      <Checkbox
                        checked={free_breakfast}
                        onChange={handleAmenities("free_breakfast")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Recreational Pool"
                    control={
                      <Checkbox
                        checked={pool}
                        onChange={handleAmenities("pool")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Pet Friendly"
                    control={
                      <Checkbox
                        checked={pet_friendly}
                        onChange={handleAmenities("pet_friendly")}
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Divider />
            </Grid>
            <Grid item xs={12} md="auto">
              <Grid container className={classes.pad10} justify="center">
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFiltersApply}
                    style={{ width: "100%" }}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};

FiltersWindow.propTypes = {
  classes: PropTypes.object.isRequired,
  star_rate: PropTypes.number.isRequired,
  guest_rate: PropTypes.number.isRequired,
  price_low: PropTypes.number.isRequired,
  price_high: PropTypes.number.isrequired,
  handleAmenities: PropTypes.func.isRequired,
  handleStarRatings: PropTypes.func.isRequired,
  handleGuestRatings: PropTypes.func.isRequired,
  handlePriceRangeChange: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(FiltersWindow));
