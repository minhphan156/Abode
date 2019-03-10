//TODO:
// 1) reload searchkeys into widget
// 2) send searchQuery to backend

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

import { Link } from "react-router-dom";
// import { logoutUser } from "../../actions/authActions";
import { saveQuery } from "../../../actions/searchActions";
// import { submitQuery, saveQuery } from "../../actions/searchActions";

// import { clearCurrentProfile } from "../../actions/profileActions";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    opacity: 1
  },
  button: {
    margin: theme.spacing.unit,
    top: 18,
    height: 40
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
      // query: "",
      modalShow: false,
      destinationName: "",
      checkIn: "",
      checkOut: "",
      numberRooms: "",

      focused: null,
      name: "hai",
      labelWidth: 10
    };
    // this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onHandleDate = this.onHandleDate.bind(this);
    this.testFunctionRoom = this.testFunctionRoom.bind(this);
    this.onHandleDestinationName = this.onHandleDestinationName.bind(this);
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

  // onChange(e) {
  //   this.setState({ query: e.target.value });
  // }

  onSearchClick() {
    //NOTE: we assume user will search for name
    // submit query as object with to submitQuery at queryActions.js

    const newQuery = {
      destinationName: this.state.destinationName,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      numberRooms: this.state.numberRooms
    };
    this.props.saveQuery(newQuery);
    console.log("searchwidget state testRoom ", newQuery);
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
    const { query } = this.props.query;
    // console.log(
    //   "search widget destinationName state is ",
    //   this.state.destinationName
    // );

    // console.log("searchwidget state testRoom ", this.state.testRoom);
    // console.log("searchwidget startingDate is: ", this.state.checkIn);
    // console.log("searchwidget endingDate is: ", this.state.checkOut);

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
              <CalendarPicker onHandleDate={this.onHandleDate} />
            </Paper>
          </Grid>
          <Grid item xs={3} sm={3} md={4} lg={1}>
            <Paper className={classes.paper}>
              <RoomNumber testRoomFunction={this.testFunctionRoom} />
            </Paper>
          </Grid>
          <Link to="/SearchOverview">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onSearchClick}
            >
              Search
            </Button>
          </Link>
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

export default connect(
  mapStateToProps,
  { saveQuery }
)(withStyles(styles)(SearchWidget));
// export default connect(mapStateToProps,{ submitQuery, saveQuery })(withStyles(styles)(SearchWidget));

// connect() --> this connects react component with redux store & action (f.e. saveQuery)
