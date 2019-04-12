import React, { Component } from "react";
import { connect } from "react-redux";
import Payment from "./Payment";
import { submitBooking } from "../../actions/bookingActions";

import BookingInfo from "./BookingInfo";
import { Grid, withWidth } from "@material-ui/core";
import "./PaymentPage.css";

class PaymentPage extends Component {
  constructor() {
    super();
    this.state = {
      combinedPaymentData: {
        hotelID: null,
        roomType: null,
        numberRooms: null,
        checkIn: null,
        checkOut: null,
        numberOfNights: null,
        Firstname: null,
        Lastname: null,
        email: null,
        subtotal: null,
        discount: null,
        rewardDiscount: 0,
        taxesAndFees: null,
        total: null,
        rewardPointsUsed: null,
        rewardPointsEarned: null
      }
    };
    this.getDataFromPaymentPage = this.getDataFromPaymentPage.bind(this);
    this.getDataFromBookingInfoPage = this.getDataFromBookingInfoPage.bind(
      this
    );
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  getDataFromPaymentPage(paymentData) {
    this.state.combinedPaymentData.hotelID = paymentData.hotelID;
    this.state.combinedPaymentData.roomType = paymentData.roomType;
    this.state.combinedPaymentData.checkIn = paymentData.checkIn;
    this.state.combinedPaymentData.checkOut = paymentData.checkOut;
    this.state.combinedPaymentData.numberRooms = paymentData.numberRooms;
    this.state.combinedPaymentData.Firstname = paymentData.Firstname;
    this.state.combinedPaymentData.Lastname = paymentData.Lastname;
    this.state.combinedPaymentData.email = paymentData.email;
    this.state.combinedPaymentData.subtotal = paymentData.subtotal;
    this.state.combinedPaymentData.discount = paymentData.discount;
    this.state.combinedPaymentData.numberOfNights = paymentData.numberOfNights; // /new

    var taxesAndFees =
      (paymentData.subtotal -
        paymentData.discount -
        this.state.combinedPaymentData.rewardDiscount) *
      this.props.bookingData.tempBookingData.taxRate;
    this.state.combinedPaymentData.taxesAndFees = taxesAndFees;

    this.state.combinedPaymentData.total =
      paymentData.subtotal -
      paymentData.discount -
      this.state.combinedPaymentData.rewardDiscount +
      taxesAndFees;

    this.props.submitBooking(this.state.combinedPaymentData);
  }

  getDataFromBookingInfoPage(rewardsPointsDiscount, rewardsPointsEarned) {
    this.state.combinedPaymentData.rewardDiscount = rewardsPointsDiscount; // /new

    this.state.combinedPaymentData.rewardPointsUsed =
      rewardsPointsDiscount * 100;
    this.state.combinedPaymentData.rewardPointsEarned = rewardsPointsEarned;
  }

  render() {
    let { width } = this.props;

    if (this.props.bookingData.tempBookingData === null) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <div>
          <Grid className="paymentHeaderContainers">
            <h3 className="PaymentSmallTitle">Your Stay at</h3>
            <h4 className="PaymentTitle">
              {this.props.bookingData.tempBookingData.name}
            </h4>
          </Grid>
          <Grid
            container
            direction={
              width == "xs" || width == "sm" ? "column-reverse" : "row"
            }
          >
            <Grid item xs={12} sm={12} md={6} lg={7}>
              <Payment getDataFromPaymentPage={this.getDataFromPaymentPage} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5}>
              <BookingInfo
                getDataFromBookingInfoPage={this.getDataFromBookingInfoPage}
              />
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
  { submitBooking }
)(withWidth()(PaymentPage));
