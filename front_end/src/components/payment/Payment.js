import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { clearBooking } from "../../actions/bookingActions";

import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { CardElement, injectStripe } from "react-stripe-elements";

import TextFieldGroup from "../common/TextFieldGroup";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      address1: "",
      address2: null,
      city: "",
      aState: "",
      zip: "",
      country: "",
      nameOnCard: "",
      cardNumber: null,
      expMonth: null,
      expYear: null,
      cvv: null,
      errors: {},
      inputErrors: {
        firstname: null,
        lastname: null,
        email: null,
        address: null,
        city: null,
        state: null,
        country: null,
        zip: null,
        nameCC: null
      },
      errorMessage: "* field required",
      doubleBookingError: false,
      unavailabilityError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripeValidate = this.stripeValidate.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  stripeValidate(e) {
    this.setState({ paymentField: e.complete });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    this.props.clearBooking();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookingData.bookingConfirmationData.code === 200) {
      this.props.history.push("./confirmation");
    }

    if (nextProps.bookingData.bookingConfirmationData.code === 409) {
      this.setState({ unavailabilityError: true });
    }

    if (nextProps.bookingData.bookingConfirmationData.code === 403) {
      this.setState({ doubleBookingError: true });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    // check if there is any invalid input
    if (!this.validateInput()) {
      // paymentData will be forwarded to parent component 'PaymentPage.js'
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
  }

  validateInput() {
    let inputError = false;

    // these if-statements go over all the fields and check whether they are an empty string.
    // if so, it displays error message
    // ugly 150 lines, but it's midnight and I'm tired and I don't wanna write any loops right now :D
    if (this.state.firstname === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          firstname: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          firstname: null
        }
      }));
    }
    if (this.state.lastname === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          lastname: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          lastname: null
        }
      }));
    }
    if (this.state.email === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          email: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          email: null
        }
      }));
    }
    if (this.state.address1 === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          address: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          address: null
        }
      }));
    }
    if (this.state.city === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          city: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          city: null
        }
      }));
    }
    if (this.state.aState === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          state: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          state: null
        }
      }));
    }
    if (this.state.country === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          country: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          country: null
        }
      }));
    }
    if (this.state.zip === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          zip: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          zip: null
        }
      }));
    }
    if (this.state.nameOnCard === "") {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          nameCC: this.state.errorMessage
        }
      }));
      inputError = true;
    } else {
      this.setState(prevState => ({
        inputErrors: {
          ...prevState.inputErrors,
          nameCC: null
        }
      }));
    }

    return inputError;
  }

  render() {
    const { tempBookingData } = this.props.bookingData;
    const { errors } = this.state;
    let errorSnackBar = null;

    // errorSnackBar is displayed in two cases: double booking on same email, or rooms are not available anymore
    if (this.state.doubleBookingError === true) {
      errorSnackBar = (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={true}
          autoHideDuration={60000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              You have already booked a hotel under this email address on the
              same date(s).
            </span>
          }
          action={[
            <Link to="/">
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleClose}
              >
                Back to Home
              </Button>
            </Link>
          ]}
        />
      );
    }
    if (this.state.unavailabilityError === true) {
      errorSnackBar = (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={true}
          autoHideDuration={60000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Unfortunately, the rooms are no longer available.
            </span>
          }
          action={[
            <Link to="/">
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleClose}
              >
                Back to Home
              </Button>
            </Link>
          ]}
        />
      );
    }

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
        {errorSnackBar}
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
                    error={this.state.inputErrors.firstname}
                  />
                  <TextFieldGroup
                    placeholder="Last Name"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    error={this.state.inputErrors.lastname}
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
                    error={this.state.inputErrors.email}
                  />
                  <TextFieldGroup
                    placeholder="Address"
                    name="address1"
                    value={this.state.address1}
                    onChange={this.onChange}
                    error={this.state.inputErrors.address}
                  />
                  <TextFieldGroup
                    placeholder="Address 2"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.onChange}
                    // error={this.state.errors.test}
                  />
                  <TextFieldGroup
                    placeholder="City"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                    error={this.state.inputErrors.city}
                  />
                  <TextFieldGroup
                    placeholder="State"
                    name="aState"
                    value={this.state.aState}
                    onChange={this.onChange}
                    error={this.state.inputErrors.state}
                  />
                  <TextFieldGroup
                    placeholder="Country"
                    name="country"
                    value={this.state.country}
                    onChange={this.onChange}
                    error={this.state.inputErrors.country}
                  />
                  <TextFieldGroup
                    placeholder="Zip"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.onChange}
                    error={this.state.inputErrors.zip}
                  />
                </CardContent>
              </Paper>
            </Grid>
            <Grid>
              <Paper className="paymentContainers">
                <CardContent>
                  <h4 style={{ marginTop: "1%" }}>Credit Card Details</h4>
                  <hr />
                  <TextFieldGroup
                    placeholder="Name on Card"
                    name="nameOnCard"
                    value={this.state.nameOnCard}
                    onChange={this.onChange}
                    error={this.state.inputErrors.nameCC}
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
      { clearBooking }
    )(Payment)
  )
);
