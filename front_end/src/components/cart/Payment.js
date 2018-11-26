import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
// import { setDelivery } from "../../actions/cartActions";
import {
  CardElement,
  injectStripe,
  PaymentRequestButtonElement
} from "react-stripe-elements";

// Delivery is a form that asks user to provide address, credit card info
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      paymentField: false
    };

    this.onChange = this.onChange.bind(this);
    this.stripeValidate = this.stripeValidate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  stripeValidate(e) {
    console.log([e.complete]);
    this.setState({ paymentField: e.complete });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.errors) {
    //   this.setState({
    //     errors: nextProps.errors
    //   });
    // }
  }

  onSubmit(e) {
    //e.preventDefault();

    const profileData = {
      delivery: true,
      paymentField: this.state.paymentField
    };
    // console.log(this.props.auth.isAuthenticated);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="delivery">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Payment Details</h1>
              <form onSubmit={this.onSubmit}>
                <h4 className="d-block pb-3" />
                <p class="lead">Please enter Credit Card Info</p>
                <CardElement
                  name="paymentField"
                  onChange={this.stripeValidate}
                />
                <a className="btn btn-info btn-block mt-4" href="/receipt">
                  Submit
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Payment.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default injectStripe(
  connect(
    mapStateToProps,
    { getCurrentProfile }
  )(Payment)
);
