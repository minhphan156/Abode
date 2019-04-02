import React, { Component } from "react";
import { connect } from "react-redux";
import Payment from "./Payment";
import BookingInfo from "./BookingInfo";
import { Grid } from "@material-ui/core";
import "./PaymentPage.css";

class PaymentPage extends Component {
  constructor() {
    super();
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    if (this.props.bookingData.tempBookingData === null) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <div>
          <Grid container>
            <Grid item xs={8}>
              <Payment />
            </Grid>
            <Grid item xs={4}>
              <BookingInfo />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  {}
)(PaymentPage);
