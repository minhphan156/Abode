import React, { Component } from "react";
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

export default PaymentPage;
