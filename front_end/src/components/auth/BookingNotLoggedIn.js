import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getHistoryNotLoggedIn } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Paper from "@material-ui/core/Paper";

import "./auth.css";

const styles = {
  container: {
    maxHeight: 300,
    Width: 900
  },
  PaperContainer: {
    marginTop: 50,
    marginBottom: 50,
    height: 170,
    width: "50%",
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

    return (
      <Grid
        container
        className="AuthContainerLogin"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.PaperContainer}>
          <Grid item xs={12} className="AuthTitle">
            Guest Booking
          </Grid>
          <form onSubmit={this.onSubmit}>
            <Grid
              style={{ marginTop: 10 }}
              container
              spacing={24}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={5}>
                <TextFieldGroup
                  placeholder="Booking ID"
                  name="bookingID"
                  type="bookingID"
                  value={this.state.bookingID}
                  onChange={this.onChange}
                  error={errors.bookingID}
                />
              </Grid>
              <Grid item xs={5}>
                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastName"
                  type="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                />
              </Grid>
              <Grid item xs={2} style={{ marginBottom: 16 }}>
                <input type="submit" className="btn btn-info" />
              </Grid>
            </Grid>
          </form>
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
)(withStyles(styles)(BookingNotLoggedIn));
