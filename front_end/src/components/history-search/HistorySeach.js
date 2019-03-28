import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HistorySearch extends Component {
  constructor() {
    super();
    this.state = {
      history_array: []
    };
  }
  render(){
      return(
      <h1>I am in here now</h1>
      )
  }
}

export default HistorySearch;