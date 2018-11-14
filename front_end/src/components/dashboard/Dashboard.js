import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";

// Dashboard is the users' profile-overview where he/she can edit info, view history, delete account
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />; // show the spinner while loading
    } else {
      // Check if logged in user has set up profile data
      if (Object.keys(profile).length > 0) {
        // User has already set up the profile
        dashboardContent = (
          <div>
            <p className="lead test-muted">This is your Profile </p>
            <p>Please choose one of the following options</p>
            <ProfileActions />

            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in, but profile it not set up yet
        dashboardContent = (
          <div>
            <p className="lead test-muted">Welcome {user.name} </p>
            <p>You have not yet set up your profile. Please add your info</p>
            <Link to="/create-profile" className="btn btn-info">
              Set up Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="display-4">Welcome {user.name}</h4>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
