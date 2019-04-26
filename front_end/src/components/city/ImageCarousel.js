// React essential imports
import React from "react";
import PropTypes from "prop-types";

// Material-UI imports
import { Grid, withStyles, withWidth} from "@material-ui/core";

// CSS to JavaScript component styling
let styles = theme => ({
  itemMain: {
    width: "100%"
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
    objectFit: "cover",
    margin: 0
  }
});

// Child functional component for the image carousel used in <CityOverview />
let ImageCarousel = props => {
  let { classes, images } = props;
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={8}
    >
      <Grid item className={classes.itemMain} xs={6} >
        <img className={classes.imgSize} src={images[0]}/>
      </Grid>
      <Grid item className={classes.itemMain} xs={6}>
        <img className={classes.imgSize} src={images[1]} />
      </Grid>
    </Grid>
  );
};

ImageCarousel.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ImageCarousel));
