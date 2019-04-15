// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Material-UI imports
import { Grid, Card, withStyles, Grow, withWidth } from "@material-ui/core";

// CSS to JavaScript component styling
let styles = theme => ({
  containerSize: {
    [theme.breakpoints.only("xl")]: {
      height: 500
    }
  },
  itemMain: {
    height: "100%"
  },
  itemDetail: {
    height: "50%"
  },
  imgSize: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10
  }
});

// Child functional component for the image carousel used in <CityOverview />
let ImageCarousel = props => {
  let { classes, images, handleClickImage } = props;
  return (
    <Grid
      container
      className={classes.containerSize}
      direction="row"
      justify="center"
      alignItems="center"
      spacing={8}
    >
      <Grid item className={classes.itemMain} xs={8}>
        <img className={classes.imgSize} src={images[0]} />
      </Grid>
      <Grid item className={classes.itemMain} xs={4}>
        <Grid
          container
          className={classes.itemMain}
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={8}
        >
          <Grid item className={classes.itemDetail} xs={12}>
            <img
              className={classes.imgSize}
              src={images[1]}
              onClick={() => handleClickImage(1)}
            />
          </Grid>
          <Grid item className={classes.itemDetail} xs={12}>
            <img
              className={classes.imgSize}
              src={images[2]}
              onClick={() => handleClickImage(2)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ImageCarousel.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ImageCarousel));
