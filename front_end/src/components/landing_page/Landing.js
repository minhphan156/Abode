import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchWidget from "./search_widget/SearchWidget";

// Animation CSS imports
import "./Landing.css";

// Image imports
import SF from "./SF.jpg";
import LA from "./LA.jpg";
import NY from "./NY.jpg";
import CH from "./CH.jpg";
import AU from "./AU.jpg";
import DE from "./DE.jpg";
import PO from "./PO.jpg";
import SA from "./SA.jpg";
import SD from "./SD.jpg";
import Vegas from "./Vegas.jpg";
import WA from "./WA.jpg";
import PA from "./PA.jpg";

// Material-UI Imports
import { Grid, Typography, Paper } from "@material-ui/core";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    let styles = {
      root: {
        width: "auto",
        flexGrow: 1,
        marginLeft: 150,
        marginRight: 150
      },
      imgSlideShow: {
        display: "flex",
        backgroundImage: `url(${SF})`,
        backgroundSize: "cover",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "70vh"
      },
      searchWidgetBox: {
        alignSelf: "center",
        background: "rgba(0,0,0,0.5)",
        padding: 20,
        width: "100%"
      },
      seperator: {
        height: 150,
        width: 300
      },
      cityCollage: {
        width: "auto",
        marginLeft: 150,
        marginRight: 150
      },
      collageImg: {
        height: "100%"
      }
    };

    function dealStyle(img) {
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        width: 450,
        height: 300
      };
    }

    function dealsOfWeekImg(img) {
      return {
        display: "inline-block",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%"
      };
    }

    // function collageRStyle(img) {
    //   return {
    //     display: "block",
    //     backgroundImage: `url(${img})`,
    //     backgroundSize: "cover",
    //     width: "33%",
    //     height: "33%"
    //   };
    // }

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="shadow" style={styles.imgSlideShow}>
          <div className="fadeIn" style={styles.searchWidgetBox}>
            <SearchWidget />
          </div>
        </div>
        <br />
        <div className="fadeIn">
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h3" fontFamily="Roboto">
                Deals of the Week
              </Typography>
            </div>
            <hr className="noYMarginPadding" />
          </div>
          <Grid container style={styles.root} justify="center" spacing={16}>
            <Paper className="mouseHover" style={dealStyle(LA)} square="false">
              <Typography style={{ color: "#FFFFFF" }} variant="h4">
                10% Off Weekends!
              </Typography>
            </Paper>
            <Grid item>
              <Paper
                className="mouseHover"
                style={dealStyle(NY)}
                square="false"
              >
                <Typography style={styles.paperText} variant="h4">
                  New York Trip Discount!
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                className="mouseHover"
                style={dealStyle(CH)}
                square="false"
              >
                <Typography style={styles.paperText} variant="h4">
                  Upcoming Holiday Discount!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="h3"
                fontFamily="Roboto"
                style={{ marginTop: 50 }}
              >
                Top Cities
              </Typography>
            </div>
            <hr className="noYMarginPadding" />
          </div>
          <Grid
            container
            spacing={8}
            style={styles.cityCollage}
            direction="row"
            justify="center"
          >
            <Grid className="mouseHover" item xs={3}>
              <img src={AU} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={DE} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={PO} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={SA} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={SD} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={Vegas} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={WA} style={styles.collageImg} />
            </Grid>
            <Grid className="mouseHover" item xs={3}>
              <img src={PA} style={styles.collageImg} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
