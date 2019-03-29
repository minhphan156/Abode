import React, { Component } from "react";
import Payment from "./Payment";
import BookingInfo from "./BookingInfo";
import { Grid } from "@material-ui/core";
import "./PaymentPage.css";

class PaymentPage extends Component {
  constructor() {
    super();
    this.changeToConfirmation = this.changeToConfirmation.bind(this);
  }
  changeToConfirmation = () => {
    this.props.history.push("/confirmation");
  };
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={8}>
            <Payment changeToConfirmation={this.changeToConfirmation} />
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
