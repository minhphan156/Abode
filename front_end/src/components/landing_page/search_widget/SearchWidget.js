import React, { Component } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Destination from "./Destination";
import RoomNumber from "./RoomNumber";
import CalendarPicker from "./CalendarPicker";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";
import { submitQuery, saveQuery } from "../../../actions/searchActions";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    opacity: 1
  },
  paper: {
    textAlign: "center",
    height: 70
  }
});

class SearchWidget extends Component {
  constructor() {
    super();
    this.state = {
      destinationName: "",
      checkIn: "",
      checkOut: "",
      numberRooms: "1"
    };
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onHandleDate = this.onHandleDate.bind(this);
    this.testFunctionRoom = this.testFunctionRoom.bind(this);
    this.onHandleDestinationName = this.onHandleDestinationName.bind(this);
  }

  componentDidMount = () => {
    if (this.props.query.searchQuery != null) {
      this.setState({
        destinationName: this.props.query.searchQuery.destinationName,
        checkIn: this.props.query.searchQuery.checkIn,
        checkOut: this.props.query.searchQuery.checkOut,
        numberRooms: this.props.query.searchQuery.numberRooms
      });
    }
  };

  onSearchClick() {
    //NOTE: we assume user will search for name
    // submit query as object with to submitQuery at queryActions.js

    const newQuery = {
      destinationName: this.state.destinationName,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      numberRooms: this.state.numberRooms,
      lastIndex: 0,
      numResults: 10,
      pageNumber: 1,
      free_wifi: 0,
      free_parking: 0,
      free_breakfast: 0,
      pool: 0,
      pet_friendly: 0,
      price_low: null,
      price_high: null,
      review_score: 0,
      star_rating: 0
    };

    // Reset the <searchResultOverview/> component if the user is in /searchResultOverview page
    if (this.props.handleResetSearchOverview != null) {
      this.props.handleResetSearchOverview();
    }

    this.props.saveQuery(newQuery);
    this.props.submitQuery(newQuery);
  }

  onHandleDate(startingDate, endingDate) {
    this.setState({ checkIn: startingDate });
    this.setState({ checkOut: endingDate });
  }

  testFunctionRoom(changeFromRoom) {
    this.setState({ numberRooms: changeFromRoom });
  }

  onHandleDestinationName(destinationprops) {
    this.setState({ destinationName: destinationprops });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={8}>
          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Paper className={classes.paper}>
              <Destination
                destinationName={this.state.destinationName}
                onHandleDestinationName={this.onHandleDestinationName}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Paper className={classes.paper}>
              <CalendarPicker
                checkIn={this.state.checkIn}
                checkOut={this.state.checkOut}
                onHandleDate={this.onHandleDate}
              />
            </Paper>
          </Grid>
          <Grid item xs={4} sm={3} md={2} lg={1}>
            <Paper className={classes.paper}>
              <RoomNumber
                numberRooms={this.state.numberRooms}
                testRoomFunction={this.testFunctionRoom}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Link to="/searchResultOverview">
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSearchClick}
              >
                Search
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.query
});

export default connect(
  mapStateToProps,
  { submitQuery, saveQuery }
)(withStyles(styles)(SearchWidget));
