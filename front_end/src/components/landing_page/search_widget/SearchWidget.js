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
// import { saveQuery } from "../../../actions/searchActions";
import { submitQuery, saveQuery } from "../../../actions/searchActions";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    opacity: 1
  },
  paper: {
    textAlign: "center",
    height: 70,
    margin: 10
  }
});

class SearchWidget extends Component {
  constructor(props) {
    super(props);
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
    // during logged in , if we change url to landing/home it will redirect to homepage

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
      numResults: 5
    };
    this.props.submitQuery(newQuery);
    this.props.saveQuery(newQuery);
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
        <Grid container justify={"center"} spacing={8}>
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
          <Grid item xs={3} sm={3} md={4} lg={1}>
            <Paper className={classes.paper}>
              <RoomNumber
                numberRooms={this.state.numberRooms}
                testRoomFunction={this.testFunctionRoom}
              />
            </Paper>
          </Grid>
          <Grid item className="buttonSearchContainer">
            <Link to="/searchResultOverview">
              <Button class="buttonSearch" primary onClick={this.onSearchClick}>
                SEARCH
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SearchWidget.propTypes = {
  // auth: PropTypes.object.isRequired,
  // logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  query: state.query
});
// if this.props.query is empty we will not show the Search page

// export default connect(
//   mapStateToProps,
//   { saveQuery }
// )(withStyles(styles)(SearchWidget));
export default connect(
  mapStateToProps,
  { submitQuery, saveQuery }
)(withStyles(styles)(SearchWidget));

// connect() --> this connects react component with redux store & action (f.e. saveQuery)
