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
        flexGrow: 1
      },
      imgSlideShow: {
        display: "flex",
        backgroundImage: `url(${SF})`,
        backgroundSize: "cover",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "60vh"
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
      paperText: {
        color: "#ffffff"
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

    function collageLStyle(img) {
      return {
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        width: "66%",
        height: "33%"
      };
    }

    function collageRStyle(img) {
      return {
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        width: "33%",
        height: "33%"
      };
    }

    return (
      <div>
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
            <Grid item>
              <Paper
                className="mouseHover"
                style={dealStyle(LA)}
                square="false"
              >
                <Typography style={styles.paperText} variant="h4">
                  10% Off Weekends!
                </Typography>
              </Paper>
            </Grid>
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
              <Typography variant="h3" fontFamily="Roboto">
                Top Cities
              </Typography>
            </div>
            <hr className="noYMarginPadding" />
          </div>
          <Grid container spacing={16}>
            <Grid item>
              <div style={collageLStyle(AU)} />
            </Grid>
            <Grid item>
              <Grid container spacing={16} direction="column" />
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
