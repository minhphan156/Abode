// React Essentials
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux-Action Workflow Imports
import { connect } from "react-redux";
import { fetchCityById } from "../../actions/cityActions";

// Material-UI Imports
import { Grid, withStyles, withWidth } from "@material-ui/core";

// CSS to JavaScript Component Styling
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
  }
});

// Main Component for City Overview Page
class CityOverview extends Component {
  constructor() {
    super();
    this.state = {};
  }

  /*
    TODO: Call backend to fetch city data based on :cityid parameter
    componentDidMount = () => {
        this.props.fetchCityById(this.props.match.params.id);
    }
  */

  render() {
    let { classes } = this.props;
    return <div className={classes.pageMargins} />;
  }
}

CityOverview.PropTypes = {
  auth: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  city: state.city
});

export default connect(
  mapStateToProps,
  { fetchCityById }
)(withWidth()(withStyles(styles)(CityOverview)));
