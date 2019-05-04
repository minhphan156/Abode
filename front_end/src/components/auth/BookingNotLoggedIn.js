import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import { isWidthDown } from "@material-ui/core/withWidth";
import {
  getHistoryNotLoggedIn,
  cleanUpNotLoggedInHistoryState
} from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Paper from "@material-ui/core/Paper";

import "./auth.css";

const styles = {
  container: {
    minHeight: 300,
    Width: 900
  },
  PaperContainer: {
    marginTop: 130,
    marginBottom: 50,

    padding: 20
  }
};
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

  componentWillMount() {
    this.props.cleanUpNotLoggedInHistoryState();
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
    const { classes } = this.props;
    const width = this.props.width;

    return (
      <Grid
        container
        className="SearchBookingContainer"
        // direction="column"
        justify="center"
        alignItems="baseline"
      >
        <Paper className={classes.PaperContainer}>
          <Grid item xs={12} className="SearchBookingTitle">
            Search Booking
          </Grid>
          <form onSubmit={this.onSubmit}>
            <Grid
              style={{ marginTop: 10 }}
              container
              spacing={isWidthDown("xs", width) ? 0 : 24}
              direction={isWidthDown("xs", width) ? "column" : "row"}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={isWidthDown("xs", width) ? 12 : 5}>
                <TextFieldGroup
                  placeholder="Booking ID"
                  name="bookingID"
                  type="bookingID"
                  value={this.state.bookingID}
                  onChange={this.onChange}
                  error={errors.bookingID}
                />
              </Grid>
              <Grid item xs={isWidthDown("xs", width) ? 12 : 5}>
                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastName"
                  type="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                />
              </Grid>
              <Grid
                item
                xs={isWidthDown("xs", width) ? 4 : 2}
                style={{ marginBottom: 16 }}
              >
                <input type="submit" className="btn btn-info" />
              </Grid>
            </Grid>
          </form>
          {this.props.errors.guestHistoryError ? (
            <Grid item xs={12}>
              <div style={{ color: "red", textAlign: "center" }}>
                Booking ID or Last Name was entered incorrectly
              </div>
            </Grid>
          ) : null}
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
  { getHistoryNotLoggedIn, cleanUpNotLoggedInHistoryState }
)(withStyles(styles)(withWidth()(BookingNotLoggedIn)));
