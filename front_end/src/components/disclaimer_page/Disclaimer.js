import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./disclaimer.css";
import SJSU from "../../images/SJSU.png";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
        <Grid container>
          <img className="SJSU-icon" src={SJSU} alt="" />
          <Grid id="DisclaimerContainerTitle" item xs={12}>
            Disclaimer
          </Grid>

          <Grid item id="DisclaimerContainerText" item xs={12}>
            <Paper>
              <Typography component="h5" variant="display1" style={{padding: 1}}>
                Abode is a web application which shares catalog of ideas, and it
                is a mini clone of the very successful product hotel.com. The
                scope of this project is to design and develop a web
                application. This is a school project at San Jose State
                University, and the course is Software Engineering Process
                Management (SE/CMPE 165), which mainly focus on integrated
                approach to managing development within small teams; including
                mission statement, synthesis of design concepts, tradeoff
                studies, risk assessment and the interactions encountered in the
                optimal design, development, manufacture and test of
                systems. This project is not going to be used commercially or
                for advertisement. All information about each hotel, such as
                price, pictures or rates, are based on Trip Advisor and
                Hotels.com. We also do not store any payment information in the
                database.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
});

const mapStateToProps = state => ({});
