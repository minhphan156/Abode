import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./about.css";
import Sandro from "../../images/aboutImages/Sandro.png";
import Dale from "../../images/aboutImages/Dale.png";
import Minh from "../../images/aboutImages/Minh.png";
import Yu from "../../images/aboutImages/Yu.png";
import Caffrey from "../../images/aboutImages/Caffrey.png";
import Lance from "../../images/aboutImages/Lance.png";
import Alex from "../../images/aboutImages/Alex.png";
import Yuta from "../../images/aboutImages/Yuta.png";
import Tien from "../../images/aboutImages/Tien.png";
import Vinny from "../../images/aboutImages/Vinny.png";

export default (class aboutUs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Grid container id="TeamContainer">
          <Grid id="AboutContainerTitle" item xs={12} lg={12}>
            Our Team
          </Grid>

          <Grid container spacing={0} direction="row" alignItems="baseline">
            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/ssallenbach/"
                >
                  <img className="aboutPage-images" src={Sandro} alt="" />
                  <br /> <div id="AboutPageNames">Sandro Sallenbach</div>
                </a>
                <div id="AboutPageRoles">Project Manager</div>
              </Grid>
              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/lance-ngo-a1892a5/"
                >
                  <img className="aboutPage-images" src={Lance} alt="" />
                  <br /> <div id="AboutPageNames">Lance Ngo</div>{" "}
                </a>
                <div id="AboutPageRoles">Product Owner</div>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/minhphan156/"
                >
                  <img className="aboutPage-images" src={Minh} alt="" />
                  <br /> <div id="AboutPageNames">Minh Phan</div>{" "}
                </a>
                <div id="AboutPageRoles">Front-End Lead</div>
              </Grid>

              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/hongbin-zheng-27456317a/"
                >
                  <img className="aboutPage-images" src={Caffrey} alt="" />
                  <br /> <div id="AboutPageNames">Caffrey Zheng</div>{" "}
                </a>
                <div id="AboutPageRoles">Back-End Lead</div>
              </Grid>

              <Grid item className="teamMemberContainer teamMemberSwitch1">
                <img className="aboutPage-images" src={Dale} alt="" />
                <br /> <div id="AboutPageNames">Dale Seen</div>
                <div id="AboutPageRoles">Front-End Developer</div>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid item className="teamMemberContainer teamMemberSwitch2">
                <img className="aboutPage-images" src={Dale} alt="" />
                <br /> <div id="AboutPageNames">Dale Seen</div>
                <div id="AboutPageRoles">Front-End Developer</div>
              </Grid>
              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/jinshan-jiang-alex/"
                >
                  <img className="aboutPage-images" src={Alex} alt="" />
                  <br /> <div id="AboutPageNames">Alex Jiang</div>{" "}
                </a>
                <div id="AboutPageRoles">Front-End Developer</div>
              </Grid>
              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/yu-ning-hee-379453180/"
                >
                  <img className="aboutPage-images" src={Yu} alt="" />
                  <br /> <div id="AboutPageNames">Yu Ning Hee</div>
                </a>
                <div id="AboutPageRoles">Front-End Developer</div>
              </Grid>
              <Grid item className="teamMemberContainer">
                <img className="aboutPage-images" src={Yuta} alt="" />
                <br /> <div id="AboutPageNames">Yuta</div>{" "}
                <div id="AboutPageRoles">Front-End Developer</div>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid item className="teamMemberContainer">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/vinnysenthil/"
                >
                  <img className="aboutPage-images" src={Vinny} alt="" />
                  <br /> <div id="AboutPageNames">Vinny Senthil</div>
                </a>
                <div id="AboutPageRoles">Back-End Developer</div>
              </Grid>
              <Grid item className="teamMemberContainer">
                <img className="aboutPage-images" src={Tien} alt="" />
                <br /> <div id="AboutPageNames">Tien Nguyen</div>
                <div id="AboutPageRoles">Back-End Developer</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
});

const mapStateToProps = state => ({});
