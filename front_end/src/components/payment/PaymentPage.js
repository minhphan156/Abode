import React, { Component } from "react";
import Checkout from "./Checkout";
import BookingInfo from "./BookingInfo";
import { Grid } from "@material-ui/core";

class PaymentPage extends Component {
  render() {
    return (
      <div container>
        <br />
        <h2>Secure booking — only takes 2 minutes!</h2>
        <Grid container>
          <Grid item xs={6}>
            <Checkout />
          </Grid>
          <Grid item xs={6}>
            <BookingInfo />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PaymentPage;
