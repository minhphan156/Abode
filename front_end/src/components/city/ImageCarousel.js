// React essential imports
import React, { Component } from "react";
import PropTypes from "prop-types";

// Material-UI imports
import { Grid, withStyles, withWidth} from "@material-ui/core";

// CSS to JavaScript component styling
let styles = theme => ({
  containerSize: {
    [theme.breakpoints.down("xl")]: {
      height: 500
    },
    [theme.breakpoints.down("md")]: {
      height: 400
    },
    [theme.breakpoints.down("sm")]: {
      height: 350
    }
  },
  image: {
    height: "100%",
    objectFit: "cover"
  }
});

class ImageCarousel extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.cityData != null && state.images.length == 0) {
      let imgArr = [props.cityData.imgMain, props.cityData.inspire];
      imgArr = imgArr.concat(props.cityData.imgAlt);
      return {
        images: imgArr
      }
    }
    return null;
  }

  handleChangeImage = newImageIndex => {
    let newImages = this.state.images;
    let temp = newImages[0];
    newImages[0] = newImages[newImageIndex];
    newImages[newImageIndex] = temp;
    this.setState({
      images: newImages
    })
  }

  render() {
    let { images } = this.state;
    let { classes, cityData } = this.props;

    let copyOfImages = [];
    for (let i = 1; i < images.length; i++) {
      copyOfImages.push(images[i]);
    }

    let counter = 1;
    let additionalImagesMarkup = copyOfImages.map(img => {
      let innerCounter = counter++;
      return(
        <Grid item md={2} xs>
          <img className={classes.image} src={images[innerCounter]} alt={`${cityData.name} images[${innerCounter}]`} onClick={() => {this.handleChangeImage(innerCounter)}} />
        </Grid>
      );
    });

    return (
      <Grid container direction="column" alignItems="center" justify="center" spacing={8}>
        <Grid item xs={12} md={10}>
          <img className={`${classes.image} ${classes.containerSize}`} src={images[0]} alt={`${cityData.name} images[0]`} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={8}>
            {additionalImagesMarkup}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


ImageCarousel.PropTypes = {
  width: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  cityData: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ImageCarousel));