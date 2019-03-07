import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";

import BookingBreakdownTable from "./BookingBreakdownTable";
import BookingDetailsCard from "./BookingDetailsCard";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

class Confirmation extends Component {
  render() {
    return (
      <div className="confirmation">
        <div className="landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <p class="float-left">
                  <Bounce>
                    <h1>You're All Set!</h1>
                  </Bounce>
                  <BookingDetailsCard />
                </p>
                <p class="float-right">
                  <BookingBreakdownTable />
                </p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirmation.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Confirmation);
