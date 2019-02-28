import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Destination from "./Destination";
import RoomNumber from "./RoomNumber";
import CalendarPicker from "./CalendarPicker";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    opacity: 0.7
  },
  button: {
    margin: theme.spacing.unit,
    top: 10,
    height: 40
  },
  paper: {
    textAlign: "center",
    height: 70
  }
});

class SearchWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: null,
      name: "hai",
      labelWidth: 10
    };
  }
  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    // if (this.props.auth.isAuthenticated) {
    // this.props.history.push("/");
    // }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Destination />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <CalendarPicker />
            </Paper>
          </Grid>

          <Grid item xs={1}>
            <Paper className={classes.paper}>
              <RoomNumber />
            </Paper>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Search
          </Button>
        </Grid>
      </div>
    );
  }
}

SearchWidget.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default withStyles(styles)(SearchWidget);

// export default connect(mapStateToProps)(SearchWidget);
