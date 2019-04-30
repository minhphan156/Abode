import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { getHistoryNotLoggedIn } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Paper from "@material-ui/core/Paper";
import AbodeLogo from "../../images/logo.png";
import "./auth.css";

class BookingNotLoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      bookingID: "",
      lastName: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticatedNotLoggedIn) {
      this.props.history.push("/history");
    }
    if (nextProps.errors) {
      // this.state.errors = this.props.errors
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookingData = {
      bookingID: this.state.bookingID,
      lastName: this.state.lastName
    };

    this.props.getHistoryNotLoggedIn(bookingData);
  }

  render() {
    const { errors } = this.state;
    let paperSize;

    if (Object.keys(errors).length == 0) {
      paperSize = "AuthPaperLogin";
    } else {
      paperSize = "AuthPaperLoginError";
    }

    return (
      <Grid
        container
        className="AuthContainerLogin"
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className={paperSize}>
          <Grid item className="AuthTitle">
            Guest Booking
          </Grid>
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img className="loginLogo" src={AbodeLogo} alt="" />

            <br />
            <br />
            <Grid className="AuthTextFields">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="bookingID Address"
                  name="bookingID"
                  type="bookingID"
                  value={this.state.bookingID}
                  onChange={this.onChange}
                  error={errors.bookingID}
                />
                <TextFieldGroup
                  placeholder="lastName"
                  name="lastName"
                  type="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,

  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getHistoryNotLoggedIn }
)(BookingNotLoggedIn);
