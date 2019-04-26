// React essential imports
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux-Action workflow imports
import { connect } from "react-redux";
import { fetchCityById, clearCityReducer } from "../../actions/cityActions";

// Child component imports
import ImageCarousel from "./ImageCarousel";
import CityDescription from "./CityDescription";
import WeatherCard from "./WeatherCard";
import SearchWidget from "../landing_page/search_widget/SearchWidget";

// Material-UI imports
import {
  Grid,
  withStyles,
  withWidth,
  CircularProgress,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import { Search } from "@material-ui/icons";

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
      openDialog: false
    };
    
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  // Fetches needed city data upon mounting
  componentDidMount = () => {
    this.props.fetchCityById(this.props.match.params.cityId);
    if (this.props.city.cityData != null) {
      this.setState({
        images: this.props.city.images
      });
    }
  };

  componentDidUnmount = () => {
    this.props.clearCityReducer();
  }

  // Used to toggle the dialog on and off
  handleCloseDialog = event => {
    event.preventDefault();
    this.setState({
      openDialog: !this.state.openDialog
    });
  };

  render() {
    let { openDialog } = this.state;
    let { classes, city, width } = this.props;

    if (city.fetchingCity == false && city.cityData != null) {
      return (
        <div className={classes.pageMargins}>
          <Grid
            container
            className={classes.rootContainer}
            direction="row"
            justify={isWidthDown("sm", width) ? "center" : "flex-start"}
            spacing={8}
          >
            <Grid item xs={12}>
              <Grid container direction="column" spacing={8}>
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
                      <Typography variant="h3">{city.cityData.name}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <ImageCarousel
                    images={this.props.city.cityData.imgAlt}
                    city={city}
                  />
                </Grid>
                <Grid item xs={12}>
                  <WeatherCard city={city} />
                </Grid>
                <Grid item xs="auto" md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleCloseDialog}
                  >
                    <Search /> Search for hotels in this city
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <CityDescription city={city} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            maxWidth={width}
            scroll={"body"}
            fullScreen={width == "xs" ? true : false}
            open={openDialog}
            onClose={this.handleCloseDialog}
          >
            <DialogTitle>
              <Typography color="primary" variant="body">
                Choose your travel dates and desired number of rooms:
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={8}
              >
                <Grid item xs={12} style={{ width: "100%" }}>
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
                      <Typography variant={isWidthDown("sm") ? "h4" : "h3"}>
                        {city.cityData.name}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <img
                    src={this.props.city.cityData.imgAlt[0]}
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  {/* TODO: Update placedholder once backend is connected  */}
                  <SearchWidget
                    dealPage={true}
                    dealDestination={city.cityData.name}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="primary">
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
  { fetchCityById, clearCityReducer }
)(withWidth()(withStyles(styles)(CityOverview)));
