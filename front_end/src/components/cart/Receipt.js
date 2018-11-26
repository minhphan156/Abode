import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import shopLogo from "../common/transparent_logo.png";

class Receipt extends Component {
  render() {
    return (
      <div class="container">
        <h2 className="display-4 text-center">
          Your Order has been successfully placed
        </h2>
        <br />
        <h4 className="text-center">
          <img className="shop-logo" src={shopLogo} alt="" />
        </h4>
        <br />

        <h4 className="text-center">
          Thank you for shopping with SpartanStop!{" "}
        </h4>
      </div>
    );
  }
}
Receipt.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Receipt);
