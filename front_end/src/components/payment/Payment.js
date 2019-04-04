// TO DO: name and email need to be stored in this.state and then passed on
// Input validation for this page

import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { submitBooking } from "../../actions/bookingActions";
import moment from "moment";

import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { CreditCard, Room } from "@material-ui/icons/";
import { CardElement, injectStripe } from "react-stripe-elements";
import { withStyles } from "@material-ui/core";

import TextFieldGroup from "../common/TextFieldGroup";

const styles = theme => ({
  cssLabel: {
    "&$cssFocused": {
      color: "#0c4b78"
    }
  }
});

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastName: "",
      email: "",
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
      errors: {},
      numDays: 0
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
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const bookingData = {
      hotelID: this.props.individualHotelData.individualHotelData.hotelID,
      roomType: this.props.bookingData.tempBookingData.roomType,
      checkIn: this.props.bookingData.tempBookingData.checkIn,
      checkOut: this.props.bookingData.tempBookingData.checkOut,
      numberRooms: this.props.bookingData.tempBookingData.numRooms,
      // Firstname: this.state.firstname,
      // Lastname: this.state.lastName,
      // email: this.state.email,
      Firstname: "minh",
      Lastname: "and sandro",
      email: "email",
      subtotal:
        this.props.bookingData.tempBookingData.pricePerNight *
        this.props.bookingData.tempBookingData.numRooms *
        this.state.numDays,
      discount: this.props.bookingData.tempBookingData.discounts,
      rewardPointsUsed: this.state.rewardPointsUsed,
      rewardPointsEarned: this.state.rewardPointsEarned
    };
    this.props.submitBooking(bookingData);
  }

  render() {
    const { tempBookingData } = this.props.bookingData;
    const { classes } = this.props;
    const { errors } = this.state;

    var duration = moment.duration(
      tempBookingData.checkOut.diff(tempBookingData.checkIn)
    );
    this.state.numDays = duration.asDays();

    var numberOfRooms = Array.from(
      { length: tempBookingData.numRooms - 1 },
      (v, k) => k + 1
    );

    let roomContainer;
    let additionalRoomContainers;
    additionalRoomContainers = numberOfRooms.map(room => {
      roomContainer = (
        <Paper style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}>
          <CardContent>
            <h4 style={{ marginTop: "1%" }}>Room {room + 1}:</h4>
            <hr />
            <input
              type="text"
              id="sample-input"
              name="fname"
              placeholder="First Name"
              onChange={this.onChange}
            />
            <br />
            <br />
            <input
              type="text"
              id="sample-input"
              name="lname"
              placeholder="Last Name"
              onChange={this.onChange}
            />
          </CardContent>
        </Paper>
      );

      return <div>{roomContainer}</div>;
    });

    return (
      <React.Fragment>
        <Grid>
          <div style={{ marginLeft: "8%", marginTop: "5%" }}>
            <h3 className="PaymentSmallTitle">Your Stay at</h3>
            <h4 className="PaymentTitle">{tempBookingData.name}</h4>
          </div>

          <form onSubmit={this.onSubmit}>
            <Paper
              style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}
            >
              <CardContent>
                <h4 style={{ marginTop: "1%" }}>Room 1 here:</h4>
                <hr />
                <TextFieldGroup
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.firstname}
                />
                <br />
                <br />
                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                />
              </CardContent>
            </Paper>
            {additionalRoomContainers}
            <Paper
              style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}
            >
              <CardContent>
                <h4 style={{ marginTop: "1%" }}>Step 2: Your details</h4>
                <hr />
                <p style={{ fontSize: 14, color: "#808080" }}>
                  We’ll send your confirmation email to this address
                </p>
                <label for="email">
                  <i className="fa fa-envelope" /> Email
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="email"
                  placeholder="john@example.com"
                  onChange={this.onChange}
                />
                <label for="address1">
                  <Room /> Address 1
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="address1"
                  placeholder="542 W. 15th Street"
                  onChange={this.onChange}
                />
                <label for="address2">
                  <Room />
                  Address 2
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="address2"
                  placeholder="optional"
                  onChange={this.onChange}
                />
                <label for="city">
                  <i className="fa fa-institution" /> City
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="city"
                  placeholder="San Jose"
                  value={this.state.firstname}
                  onChange={this.onChange}
                />
                <label for="aState">State</label>
                <input
                  type="text"
                  id="sample-input"
                  name="aState"
                  placeholder="CA"
                  onChange={this.onChange}
                />
                <label for="country">Country</label>
                <input
                  type="text"
                  id="sample-input"
                  name="country"
                  placeholder="USA"
                  onChange={this.onChange}
                />
                <label for="zip">Zip</label>
                <input
                  type="text"
                  id="sample-input"
                  name="zip"
                  placeholder="95111"
                  onChange={this.onChange}
                />
              </CardContent>
            </Paper>

            <Paper
              style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}
            >
              <CardContent>
                <h4 style={{ marginTop: "1%" }}>Step 3: Payment details</h4>
                <hr />
                <CreditCard />
                <label for="nameOnCard">Name on Card</label>
                <input
                  type="text"
                  id="sample-input"
                  name="nameOnCard"
                  placeholder="John More Doe"
                  onChange={this.onChange}
                />
                <label for="cardNumber">Credit card number</label>
                <CardElement
                  name="paymentField"
                  onChange={this.stripeValidate}
                  id="sample-input"
                />
              </CardContent>
            </Paper>
            <input
              id="sample-input"
              type="submit"
              value="Checkout"
              class="payment-btn"
            />
          </form>
        </Grid>
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

export default injectStripe(
  connect(
    mapStateToProps,
    { submitBooking }
  )(withStyles(styles)(Payment))
);
