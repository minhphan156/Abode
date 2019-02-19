import React from "react";
import { Link } from "react-router-dom";

// Actions that can be taken form dashboard
const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-home text-info mr-1" />
        Edit Delivery Address
      </Link>
      <Link to="/history" className="btn btn-light">
        <i className="fas fa-history text-info mr-1" />
        View Shopping History
      </Link>
    </div>
  );
};

export default ProfileActions;
