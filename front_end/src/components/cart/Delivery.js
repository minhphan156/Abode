import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { setDelivery } from "../../actions/cartActions";
import {
  CardElement,
  injectStripe,
  PaymentRequestButtonElement
} from "react-stripe-elements";

// Delivery is a form that asks user to provide address, credit card info
class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      apartment: "",
      city: "",
      zip: "",
      homeState: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  stripeValidate(e) {
    console.log([e.complete]);
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

    const profileData = {
      street: this.state.street,
      apartment: this.state.apartment,
      city: this.state.city,
      zip: this.state.zip,
      homeState: this.state.homeState,
      ccNumber: "",
      ccExp: "",
      ccCvv: "",
      delivery: true
    };
    console.log(this.props.auth.isAuthenticated)
    this.props.setDelivery(profileData, this.props.history, this.props.auth.isAuthenticated);
  }

  render() {
    const { errors } = this.state;

    // select options for US State
    const options = [
      { label: "* Select State", value: null },
      { label: "Arizona", value: "Arizona" },
      { label: "California", value: "California" },
      { label: "Nevada", value: "Nevada" },
      { label: "Oregon", value: "Oregon" },
      { label: "Washington", value: "Washington" }
    ];

    return (
      <div className="delivery">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Delivery Details</h1>
              <small className="d-block pb-3 text-right text-muted">
                * = required fields
              </small>
              <form onSubmit={this.onSubmit}>
                <h4 className="d-block pb-3" />
                <p className="lead">Your address for Deliveries</p>

                <TextFieldGroup
                  placeholder="* Street and number"
                  name="street"
                  value={this.state.street}
                  onChange={this.onChange}
                  error={errors.street}
                  info=""
                />

                <TextFieldGroup
                  placeholder="Apartment number"
                  name="apartment"
                  value={this.state.apartment}
                  onChange={this.onChange}
                  error={errors.apartment}
                  info=""
                />

                <TextFieldGroup
                  placeholder="* City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  info=""
                />

                <TextFieldGroup
                  placeholder="* ZIP"
                  name="zip"
                  value={this.state.zip}
                  onChange={this.onChange}
                  error={errors.zip}
                  info=""
                />

                <SelectListGroup
                  placeholder="State"
                  name="homeState"
                  value={this.state.homeState} // ERRRRORRRRR
                  onChange={this.onChange}
                  options={options}
                  error={errors.homeState}
                  info=""
                />

                <p class="lead">Please enter payment info</p>
                <CardElement onChange={this.stripeValidate} />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Delivery.PropTypes = {
  setDelivery: PropTypes.func.isRequired,
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
    { getCurrentProfile, setDelivery }
  )(Delivery)
);
