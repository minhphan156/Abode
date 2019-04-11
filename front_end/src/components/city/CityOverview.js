// React essential imports
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux-Action workflow imports
import { connect } from "react-redux";
import { fetchCityById } from "../../actions/cityActions";

// Child component imports
import ImageCarousel from "./ImageCarousel";

// Material-UI imports
import {
  Grid,
  withStyles,
  withWidth,
  CircularProgress
} from "@material-ui/core";

// Prototype Imports

// CSS to JavaScript component styling
let styles = theme => ({
  pageMargins: {
    [theme.breakpoints.down("lg")]: {
      marginLeft: "10%",
      marginRight: "10%",
      marginTop: "5%",
      marginBottom: "5%"
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: "2%",
      marginBottom: "2%"
    }
  },
  loadingSpinner: {
    height: "82vh",
    width: "100%"
  },
  rootContainer: {
    height: "100%",
    width: "100%"
  }
});

// Main Component for City Overview Page
class CityOverview extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    this.props.fetchCityById(this.props.match.params.cityId);
  };

  render() {
    let { classes, city } = this.props;
    if (city.fetchingCity == false) {
      return (
        <div className={classes.pageMargins}>
          <Grid
            container
            className={`${classes.rootContainer} border border-primary`}
            direction="flow"
            spacing={8}
          >
            <Grid item className="border" xl={8}>
              <Grid container direction="column" spacing={8}>
                <Grid item>
                  <ImageCarousel />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="border" />
          </Grid>
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
  { fetchCityById }
)(withWidth()(withStyles(styles)(CityOverview)));
