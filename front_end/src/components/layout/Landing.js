import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import shopLogo from "../common/transparent_logo.png";

class Landing extends Component {
  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
              <img className="shop-logo" src={shopLogo} alt="" />
                <h1 className="display-3 mb-4">SpartanStop</h1>
                <p>One Grocery Store for all of SJSU</p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
