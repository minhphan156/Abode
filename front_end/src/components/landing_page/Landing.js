import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchWidget from "./search_widget/SearchWidget";

// Import custom css
import "./Landing.css";

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
      paper: {
        minwidth: 50,
        minheight: 100
      }
    };

    return (
      <div>
        <div className="background-slideshow withPageMargin">
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} lg={9}>
              <SearchWidget />
            </Grid>
          </Grid>
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
        </div>
        <Grid container className={styles.root} justify="center" spacing={16}>
          <Grid item>
            <Paper className={styles.paper} />
          </Grid>
          <Grid item>
            <Paper className={styles.paper} />
          </Grid>
          <Grid item>
            <Paper className={styles.paper} />
          </Grid>
        </Grid>
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
