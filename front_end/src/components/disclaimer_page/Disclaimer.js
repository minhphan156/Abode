import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./disclaimer.css";
import SJSU from "../../images/SJSU.png";

export default (class disclaimer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Grid container id="DisclaimerContainer">
          <img className="SJSU-icon" src={SJSU} alt="" />
          <Grid id="DisclaimerContainerTitle" item xs={12} lg={12}>
            Disclaimer
          </Grid>
          <Grid item id="DisclaimerContainerText">
            <p>
              jvnberij vrvuierhvu erhvuhrv uhreuhv uerhvu ihruhvuhvruhv vjbn
              ejvfk
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
});

const mapStateToProps = state => ({});
