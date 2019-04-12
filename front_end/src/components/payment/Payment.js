// TO DO:
// Input validation for this page

import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";

import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { CreditCard, Room } from "@material-ui/icons/";
import { CardElement, injectStripe } from "react-stripe-elements";

import TextFieldGroup from "../common/TextFieldGroup";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      address1: "",
      address2: "",
      city: "",
      aState: "",
      zip: "",
      country: "",
      nameOnCard: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripeValidate = this.stripeValidate.bind(this);
  }

  stripeValidate(e) {
    this.setState({ paymentField: e.complete });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.bookingData.bookingConfirmationData.code === 200) {
      this.props.history.push("./confirmation");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const paymentData = {
      hotelID: this.props.individualHotelData.individualHotelData.hotelID,
      roomType: this.props.bookingData.tempBookingData.roomType,
      checkIn: this.props.bookingData.tempBookingData.checkIn,
      checkOut: this.props.bookingData.tempBookingData.checkOut,
      numberRooms: this.props.bookingData.tempBookingData.numRooms,
      Firstname: this.state.firstname,
      Lastname: this.state.lastname,
      email: this.state.email,
      subtotal:
        this.props.bookingData.tempBookingData.pricePerNight *
        this.props.bookingData.tempBookingData.numRooms *
        this.props.bookingData.tempBookingData.numberOfNights,
      discount: this.props.bookingData.tempBookingData.discounts,
      numberOfNights: this.props.bookingData.tempBookingData.numberOfNights
    };

    this.props.getDataFromPaymentPage(paymentData);
  }

  render() {
    const { tempBookingData } = this.props.bookingData;
    const { errors } = this.state;

    var numberOfRooms = Array.from(
      { length: tempBookingData.numRooms - 1 },
      (v, k) => k + 1
    );

    let roomContainer;
    let additionalRoomContainers;
    additionalRoomContainers = numberOfRooms.map(room => {
      roomContainer = (
        <Grid>
          <Paper className="paymentContainers">
            <CardContent>
              <h4 style={{ marginTop: "1%" }}>Room {room + 1}:</h4>
              <hr />
              <TextFieldGroup
                placeholder="First Name"
                name="fname"
                onChange={this.onChange}
                error={errors.firstname}
              />
              <TextFieldGroup
                placeholder="Last Name"
                name="lname"
                onChange={this.onChange}
                error={errors.lastname}
              />
            </CardContent>
          </Paper>
        </Grid>
      );

      return <div>{roomContainer}</div>;
    });

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignContent="center"
          >
            <Grid>
              <Paper className="paymentContainers">
                <CardContent>
                  <h4 style={{ marginTop: "1%" }}>Room 1:</h4>
                  <hr />
                  <TextFieldGroup
                    placeholder="First Name"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                    error={errors.firstname}
                  />
                  <TextFieldGroup
                    placeholder="Last Name"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    error={errors.lastname}
                  />
                </CardContent>
              </Paper>
            </Grid>

            {additionalRoomContainers}
            <Grid>
              <Paper className="paymentContainers">
                <CardContent>
                  <h4 style={{ marginTop: "1%" }}>Booking Information:</h4>
                  <hr />

                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    error={errors.address}
                  />
                  <TextFieldGroup
                    placeholder="Address 2"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.onChange}
                    error={errors.address2}
                  />
                  <TextFieldGroup
                    placeholder="City"
                    name="city"
                    value={this.state.addcityress2}
                    onChange={this.onChange}
                    error={errors.city}
                  />
                  <TextFieldGroup
                    placeholder="State"
                    name="state"
                    value={this.state.state}
                    onChange={this.onChange}
                    error={errors.state}
                  />
                  <TextFieldGroup
                    placeholder="Country"
                    name="country"
                    value={this.state.country}
                    onChange={this.onChange}
                    error={errors.country}
                  />
                  <TextFieldGroup
                    placeholder="Zip"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.onChange}
                    error={errors.zip}
                  />
                </CardContent>
              </Paper>
            </Grid>
            <Grid>
              <Paper className="paymentContainers">
                <CardContent>
                  <h4 style={{ marginTop: "1%" }}>Credit Card Details</h4>
                  <hr />
                  {/* <CreditCard /> */}
                  <TextFieldGroup
                    placeholder="Name on Card"
                    name="creditcard"
                    value={this.state.creditcard}
                    onChange={this.onChange}
                    error={errors.creditcard}
                  />

                  <CardElement
                    name="paymentField"
                    onChange={this.stripeValidate}
                    id="sample-input"
                  />
                </CardContent>
              </Paper>
            </Grid>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignContent="center"
            >
              <Grid style={{ marginBottom: "7%" }}>
                <input
                  id="sample-input"
                  type="submit"
                  value="Checkout"
                  class="payment-btn"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}
Payment.PropTypes = {
  payment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bookingData: state.bookingData,
  individualHotelData: state.individualHotelData,
  errors: state.errors,
  auth: state.auth
});

export default withRouter(
  injectStripe(
    connect(
      mapStateToProps,
      {}
    )(Payment)
  )
);
