import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  getProfileInfo
} from "../../actions/profileActions";
import AnchorLink from "react-anchor-link-smooth-scroll";
import NavbarMenu from "./NavbarMenu";
import NavBarMenuLeft from "./NavBarMenuLeft";

import AbodeLogo from "./logo.png";
import withWidth from "@material-ui/core/withWidth";
import { isWidthDown } from "@material-ui/core/withWidth";

import "./navbar.css";

// Material-UI Imports Below
import { Button, Grid } from "@material-ui/core";

class Navbar extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  componentWillMount() {
    if (localStorage.jwtToken) {
      this.props.getProfileInfo();
    }
  }

  render() {
    // Markup shown on the right hand side of Navbar when user is GUEST.
    const width = this.props.width;

    let guestMarkUp = isWidthDown("xs", width) ? (
      <NavBarMenuLeft />
    ) : (
      <Grid
        container
        spacing={0}
        justify="space-evenly"
        alignItems="center"
        direction="row"
        xs={4}
        sm={4}
        md={3}
        lg={3}
      >
        <Grid item>
          <Link to="/register">
            <Button class="navButtons buttonGrey" primary>
              Sign Up
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/login">
            <Button class="navButtons buttonBlue" primary>
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    );

    // Markup shown on the right hand side of Navbar when user is LOGGED IN.
    let loggedInMarkup = (
      <Grid
        container
        spacing={0}
        justify="space-around"
        alignItems="center"
        xs={2}
        sm={2}
        md={3}
        lg={3}
      >
        <Grid className="adjustMenuBurger" item>
          <NavbarMenu
            onLogoutClick={this.onLogoutClick}
            userEmail={this.props.auth.user.email}
          />
        </Grid>
      </Grid>
    );

    let inLandingMarkup = (
      <Grid
        container
        spacing={0}
        justify="space-evenly"
        alignItems="center"
        xs={4}
        sm={4}
        md={5}
        lg={4}
      >
        <Grid item className="headerMenu">
          <AnchorLink
            href="#topDealsAnchor"
            offset="-450"
            style={{ color: "white" }}
          >
            Deals of the Week
          </AnchorLink>
        </Grid>
        <Grid item className="headerMenu">
          <AnchorLink
            href="#featuredCitiesAnchor"
            offset="-500"
            style={{ color: "white" }}
          >
            Featured Cities
          </AnchorLink>
        </Grid>

        {this.props.auth.isAuthenticated ? null : (
          <Grid item className="headerMenu">
            <Link
              to="/booking-not-logged-in"
              offset="-550"
              style={{ color: "white" }}
            >
              Check Booking
            </Link>
          </Grid>
        )}
      </Grid>
    );

    let notInLandingMarkup = <Grid item />;

    return (
      <div className="navbarContainer">
        <Grid
          container
          className="navbarContainer headerfont"
          spacing={0}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid className="navbarLogo" item>
            <Link to="/">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <img
                    className="abode-logo"
                    src={AbodeLogo}
                    alt="Abode Logo"
                  />
                </Grid>

                <Grid item className="abodeHome">
                  Abode
                </Grid>
              </Grid>
            </Link>
          </Grid>

          {this.props.landing.isInLanding == true
            ? inLandingMarkup
            : notInLandingMarkup}
          {this.props.auth.isAuthenticated ? loggedInMarkup : guestMarkUp}
        </Grid>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  landing: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  landing: state.landing,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getProfileInfo }
)(withWidth()(Navbar));
