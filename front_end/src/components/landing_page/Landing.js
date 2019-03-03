import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import SearchWidget from "./search_widget/SearchWidget";

// Import custom css
import "./Landing.css";

// Material-UI Imports
import { Typography } from "@material-ui/core";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div>
        <div className="background-slideshow">
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} lg={9}>
              <SearchWidget />
            </Grid>
          </Grid>
        </div>
        <br />
        <div className="flexBox fadeIn">
          <Typography variant="h3" fontFamily="Roboto">
            Deals of the Week
          </Typography>
        </div>
        <hr />
      </div>
    );
    // return (
    //   <div className="landing">
    //     <Grid container spacing={24} justify="center">
    //       <Grid item xs={12} lg={9}>
    //         <SearchWidget />
    //       </Grid>
    //     </Grid>
    //   </div>
    // );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
