import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import SearchWidget from "./search_widget/SearchWidget";

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
    const { classes } = this.props;

    return (
      <div className="landing">
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} lg={9}>
            <SearchWidget />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
