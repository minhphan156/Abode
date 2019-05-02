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
        <div container>
          <div id="img">
            <img id="SJSU-icon" src={SJSU} alt="" />
          </div>
          <div id="content">
            <h1 item id="title">
              Disclaimer
            </h1>
            <div>
              <br />
              This is a school project at San Jose State University, and the
              course is Software Engineering Process Management (SE/CMPE 165),
              which mainly focus on integrated approach to managing development
              within small teams, and the scope of this project is to design and
              develop a web application. <br />
              <br />
            </div>
            <h5>Disclaimer for Abode.com</h5>
            <ul>
              <li>
                From our website, you can see information of other hotels by
                searching. While we strive to provide only quality information
                (images, amenities, address) belongs to{" "}
                <a href="https://www.hotels.com" id="link">
                  hotels.com
                </a>{" "}
                and all images of cities belong to third party, we have no
                control over the content and nature of these sites. Site owners
                and content may change without notice and may occur before we
                have the opportunity to remove APIs which may have gone ‘bad'.
              </li>
              <br />

              <li>
                Since this is the school project of San Jose State University,
                this website, Abode, is not intended to be used commercially or
                for any advertisement, and we do not store any payment
                information in our database.
              </li>
            </ul>
            <h5>Consent</h5>
            By using our website, you hereby consent to our disclaimer and agree
            to its terms.
            <br />
            <br />
            <h5>Update</h5>
            Should we update, amend or make any changes to this document, those
            changes will be prominently posted here.
          </div>
        </div>
      </div>
    );
  }
});
