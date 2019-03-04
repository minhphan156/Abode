import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchWidget from "./search_widget/SearchWidget";

// Import custom css
import "./Landing.css";

import SF from "./SF.jpg";
import LA from "./LA.jpg";
import NY from "./NY.jpg";
import CH from "./CH.jpg";

// Material-UI Imports
import { Grid, Typography, Paper } from "@material-ui/core";
import { relative } from "path";

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
        alignItems: "flex-end",
        backgroundImage: `url(${SF})`,
        backgroundSize: "cover",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "60vh",
        marginRight: 150,
        marginLeft: 150
      },
      searchWidgetBox: {
        display: "flex",
        background: "linear-gradient(180deg, rgba(0,0,0,0.10), black)",
        padding: 20,
        width: "100%",
        height: "auto"
      },
      paperText: {
        color: "#ffffff"
      }
    };

    let paperStyles = [
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${LA})`,
        backgroundSize: "cover",
        width: 450,
        height: 300
      },
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${NY})`,
        backgroundSize: "cover",
        width: 450,
        height: 300
      },
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${CH})`,
        backgroundSize: "cover",
        width: 450,
        height: 300
      }
    ];

    return (
      <div>
        <div style={styles.imgSlideShow}>
          <div style={styles.searchWidgetBox}>
            <Grid container className="fadeIn" spacing={24} justify="center">
              <Grid item xs={12} lg={9}>
                <SearchWidget />
              </Grid>
            </Grid>
          </div>
        </div>
        <br />
        <div className="fadeIn">
          <div className="withPageMargin">
            <div className="flexbox-center noMarginOrPadding">
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
                style={paperStyles[0]}
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
                style={paperStyles[1]}
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
                style={paperStyles[2]}
                square="false"
              >
                <Typography style={styles.paperText} variant="h4">
                  Upcoming Holiday Discount!
                </Typography>
              </Paper>
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
