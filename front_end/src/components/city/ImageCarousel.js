// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Material-UI imports
import { Grid, withStyles, withWidth } from "@material-ui/core";

// CSS to JavaScript component styling
let styles = theme => ({});

// Child functional component for the image carousel used in <CityOverview />
let ImageCarousel = () => {
  return <div />;
};

ImageCarousel.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ImageCarousel));
