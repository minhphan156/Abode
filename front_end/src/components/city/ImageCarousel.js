// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Material-UI imports
import { Grid, GridList, GridListTile, withStyles, withWidth } from "@material-ui/core";

// CSS to JavaScript component styling
let styles = theme => ({
  containerSize: {
    [theme.breakpoints.only("lg")]: {
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
    objectFit: "contain"
  }
});

// Child functional component for the image carousel used in <CityOverview />
let ImageCarousel = (props) => {
  let { classes, images, handleClickImage } = props;
  return (
    <Grid container className={classes.containerSize} direction="row" justify="center" alignItems="center">
      <Grid item className={classes.itemMain} lg={8}>
        <img className={classes.imgSize} src={images[0]} />
      </Grid>
      <Grid item className={classes.itemMain} lg={4}>
        <Grid container className={classes.itemMain} direction="row" justify="center" alignItems="center">
          <Grid item className={classes.itemDetail} lg={12}>
            <img className={classes.imgSize} src={images[1]} onClick={() => handleClickImage(1)}/>
          </Grid>
          <Grid item className={classes.itemDetail} lg={12}>
            <img className={classes.imgSize} src={images[2]} onClick={() => handleClickImage(2)}/>
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
