import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Disclaimer.css";
import SJSU from "../../images/SJSU.png";
import Typography from "@material-ui/core/Typography";


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
          <Grid item id="DisclaimerContainerTitle" xs={12}>
            Disclaimer
          </Grid>

          <Grid item id="DisclaimerContainerText" item xs={12}>
            <Typography component="h6" variant="h6">
              Abode is a web application which shares catalog of ideas, and it
              is a mini clone of the very successful product hotel.com.
              <br />
              <br />
              This is a school project at San Jose State University, and the
              course is Software Engineering Process Management (SE/CMPE 165),
              which mainly focus on integrated approach to managing development
              within small teams, and the scope of this project is to design and
              develop a web application. <br />
              <br />
              The project includes following statements:
              <ul>
                <li>mission statement</li>
                <li>synthesis of design concepts</li>
                <li>tradeoff studies</li>
                <li>
                  risk assessment and the interactions encountered in the
                  optimal design
                </li>
                <li>development</li>
                <li>manufacture and test of systems</li>
              </ul>
              <br />
              Since this is the school project, this site, Abode, is not
              intended to be used commercially or for advertisement. All
              information about each hotel, such as name, address, price,
              pictures, rates and amenities, are based on APIs from Trip Advisor
              and Hotels.com. <br />
              <br />
              we also do not store any payment information in our database.
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
});

const mapStateToProps = state => ({});
