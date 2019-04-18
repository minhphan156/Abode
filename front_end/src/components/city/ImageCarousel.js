// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Child component imports
import WeatherCard from "./WeatherCard";

// Material-UI imports
import { Grid, withStyles, withWidth, Hidden } from "@material-ui/core";

// CSS to JavaScript component styling
let styles = theme => ({
  containerSize: {
    [theme.breakpoints.only("md")]: {
      height: 500
    },
    [theme.breakpoints.only("lg")]: {
      height: 600
    },
    [theme.breakpoints.only("xl")]: {
      height: 700
    }
  },
  itemMain: {
    [theme.breakpoints.up("md")]: {
      height: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      height: "50%"
    }
  },
  itemDetail: {
    [theme.breakpoints.up("md")]: {
      height: "40%"
    },
    [theme.breakpoints.down("sm")]: {
      height: "50%"
    }
  },
  imgSize: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
});

// Child functional component for the image carousel used in <CityOverview />
let ImageCarousel = props => {
  let { classes, images, handleClickImage, city } = props;
  return (
    <Grid
      container
      className={classes.containerSize}
      direction="row"
      justify="center"
      alignItems="center"
      spacing={8}
    >
      <Grid item className={classes.itemMain} xs={12}>
        <img className={classes.imgSize} src={images[0]} />
      </Grid>
      <Grid item className={classes.itemDetail} xs={6} md={4}>
        <img
          className={classes.imgSize}
          src={images[1]}
          onClick={() => handleClickImage(1)}
        />
      </Grid>
      <Grid item className={classes.itemDetail} xs={6} md={4}>
        <img
          className={classes.imgSize}
          src={images[2]}
          onClick={() => handleClickImage(2)}
        />
      </Grid>
      <Hidden smDown>
        <Grid item className={classes.itemDetail} xs={6} md={4}>
          <WeatherCard city={city} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

ImageCarousel.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ImageCarousel));
