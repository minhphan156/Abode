import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
class HistoryOverview extends Component {
  constructor() {
    super();
    this.state = {
      history_array: []
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // Set history_array
      this.setState({
        history_array: profile.history
      });
    }
  }
  render() {
    const listItem = this.state.history_array.map(item => {
      const date = item.date;
      const dateOnly = date.substring(0, 10);
      const time = date.substring(11, 16);

      return (
        <tbody key={item.id}>
          <tr>
            <td>
              <Link to={`/history/${date}`}>
                {dateOnly}, {time}
              </Link>
            </td>
            <td>${(item.subtotal / 100).toFixed(2)}</td>
            <td>{((1 - item.discount) * 100).toFixed(0)}%</td>
            <td>${(item.total / 100).toFixed(2)}</td>
          </tr>
        </tbody>
      );
    });

    if (this.state.history_array.length === 0) {
      return (
        <div class="container">
          <h2>Order History</h2> <h4 className="d-block pb-3" />
          <h5 className="d-block pb-3"> There are no Orders in your History</h5>
          <Link to="/dashboard" className="btn btn-light">
            <i className="fas fa-arrow-circle-left" />
            Back
          </Link>
        </div>
      );
    } else {
      return (
        <div class="container">
          <h2>Order History</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subtotal</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            {listItem}
          </table>
          <Link to="/dashboard" className="btn btn-light">
            <i className="fas fa-arrow-circle-left" />
            Back
          </Link>
        </div>
      );
    }
  }
}
HistoryOverview.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(HistoryOverview);
