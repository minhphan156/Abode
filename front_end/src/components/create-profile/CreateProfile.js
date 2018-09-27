import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile } from "../../actions/profileActions";

// CreateProfile is a form that asks user to provide address, credit card info
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      apartment: "",
      city: "",
      zip: "",
      homeState: "",
      ccNumber: "",
      ccExp: "",
      ccCvv: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

    const profileData = {
      street: this.state.street,
      apartment: this.state.apartment,
      city: this.state.city,
      zip: this.state.zip,
      homeState: this.state.homeState,
      ccNumber: this.state.ccNumber,
      ccExp: this.state.ccExp,
      ccCvv: this.state.ccCvv
    };
    this.props.createProfile(profileData, this.props.history);
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
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Set Up Your Profile</h1>
              <p className="lead text-center">Let us get some information</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h4 className="d-block pb-3" />
                <h4 className="d-block pb-3">Your address for Deliveries</h4>

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
                <h4 className="d-block pb-3" />
                <h4 className="d-block pb-3">Your Credit Card</h4>

                <TextFieldGroup
                  placeholder="* Credit Card Number"
                  name="ccNumber"
                  value={this.state.ccNumber}
                  onChange={this.onChange}
                  error={errors.ccNumber}
                  info=""
                />
                <TextFieldGroup
                  placeholder="* Credit Card Expiration date"
                  name="ccExp"
                  value={this.state.ccExp}
                  onChange={this.onChange}
                  error={errors.ccExp}
                  info="Expiration date in the format MM/YY"
                />
                <TextFieldGroup
                  placeholder="* Card Verification Value"
                  name="ccCvv"
                  value={this.state.ccCvv}
                  onChange={this.onChange}
                  error={errors.ccCvv}
                  info="CVV can be found on the back of your card"
                />

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

CreateProfile.PropTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
