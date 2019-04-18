// React essential imports
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux-Action workflow imports
import { connect } from "react-redux";
import { fetchCityById, fetchCityWeather } from "../../actions/cityActions";

// Child component imports
import ImageCarousel from "./ImageCarousel";
import CityDescription from "./CityDescription";
import WeatherCard from "./WeatherCard";

// Material-UI imports
import {
  Grid,
  withStyles,
  withWidth,
  CircularProgress,
  Hidden,
  Divider,
  Typography
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";

// Prototype Imports
import SF0 from "./SF0.jpg";
import SF1 from "./SF1.jpg";
import SF2 from "./SF2.jpg";

// CSS to JavaScript component styling
let styles = theme => ({
  pageMargins: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
    marginBottom: "2%"
  },
  loadingSpinner: {
    height: "82vh",
    width: "100%"
  },
  rootContainer: {
    height: "100%",
    width: "100%"
  },
  weatherIcon: {
    width: "100%"
  },
  dividerMargin: {
    marginTop: 5
  }
});

// Main Component for City Overview Page
class CityOverview extends Component {
  constructor() {
    super();
    this.state = {
      images: [SF0, SF1, SF2],
      openDialog: false
    };

    this.handleClickImage = this.handleClickImage.bind(this);
  }

  // Fetches needed city data upon mounting
  componentDidMount = () => {
    this.props.fetchCityById(this.props.match.params.cityId);
    this.props.fetchCityWeather("San+Francisco");
    // TODO: Update the following code once backend is completed
    if (this.props.city.cityData != null) {
      this.setState({
        images: this.props.city.images
      });
    }
  };

  // Used to disable 2nd re-rendering after initial data fetch upon mounting this component
  shouldComponentUpdate(prevProps, nextProps) {
    if (this.state.images.length == 0) {
      return false;
    }
    return true;
  }

  // Used to change the main image in Carousel
  handleClickImage = index => {
    let newImages = this.state.images;
    let temp = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = temp;
    this.setState({
      ...this.state,
      images: newImages
    });
  };

  // Used to toggle the dialog on and off
  handleCloseDialog = event => {
    event.preventDefault();
    this.setState({
      openDialog = !this.state.openDialog
    })
  }

  render() {
    let { images } = this.state;
    let { classes, city } = this.props;

    if (city.fetchingCity == false) {
      return (
        <div className={classes.pageMargins}>
          <Grid
            container
            className={classes.rootContainer}
            direction="row"
            spacing={8}
          >
            <Grid item xs={12}>
              <Grid container direction="column" spacing={16}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={16}
                  >
                    <Grid item xs>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">San Francisco</Typography>
                    </Grid>
                    <Grid item xs>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <ImageCarousel
                    images={images}
                    handleClickImage={this.handleClickImage}
                    city={city}
                  />
                </Grid>
                <Grid item xs={12}>
                    <WeatherCard city={city} />
                  </Grid>
                <Grid item md={12}>
                  <CityDescription city={city} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            maxWidth={"md"}
            scroll={"body"}
            fullScreen={width === "xs" ? true : false}
            open={this.state.openDialog}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle className="BookingInfoTitle">
              <div className="BookingInfoTitle">
                Please choose your travel dates and number of rooms:
              </div>
            </DialogTitle>

            <DialogContent>
              <SearchWidget
                dealPage={true}
                dealDestination={this.state.chosenDealHotel}
              />
              <Grid
                container
                className="dealPopUpTitle"
                direction="column"
                justify="space-between"
                alignItems="center"
              >
                <br />
                {this.state.chosenDealHotel} <br />
                <img src={this.state.chosenDealImage} className="dealImage" />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return (
        <div className={classes.pageMargins}>
          <Grid
            container
            className={classes.loadingSpinner}
            direction="flow"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

// Expected props
CityOverview.PropTypes = {
  auth: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  fetchCityById: PropTypes.func.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  city: state.city
});

export default connect(
  mapStateToProps,
  { fetchCityById, fetchCityWeather }
)(withWidth()(withStyles(styles)(CityOverview)));
