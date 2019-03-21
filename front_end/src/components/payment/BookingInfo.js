import React, { Component } from "react";
import Image from "./img.jpg";
// import "typeface-roboto";
import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import moment from "moment";

const styles = theme => ({
  appBar: {
    position: "absolute"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
});

export class BookingInfo extends Component {
  render() {
    const time = moment().format("dddd, MMMM Do YYYY");
    // const individualHotelData = this.props.individualHotelData.individualHotelData;;
    const { individualHotelData } = this.props.individualHotelData;
    console.log(
      "booking info query ",
      JSON.stringify(this.props.query.searchQuery)
    );
    console.log("booking info query ", this.props.query.searchQuery);
    const query = this.props.query;

    const roomSelection = this.props.roomSelection;

    return (
      <React.Fragment>
        <CssBaseline />
        <main style={styles.layout}>
          <br />
          <br />
          <br />
          <br />
          <Paper stayle={styles.paper}>
            <Typography component="h1" variant="h4" align="center">
              <br />
              {individualHotelData.name}
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <div>
                  <br />
                </div>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={4}>
                <img src={individualHotelData.img[0]} alt="image" />
              </Grid>
              <Grid item>
                <p>
                  {individualHotelData.street}, {individualHotelData.city}, US
                </p>
                <p>
                  {query.searchQuery.numberRooms} Room:
                  {roomSelection}
                </p>
              </Grid>
              <Grid item>
                <p>
                  Check-in:{" "}
                  {query.searchQuery.checkIn.format("dddd, MMMM Do YYYY")}
                </p>
                <p>
                  Check-out:{" "}
                  {query.searchQuery.checkOut.format("dddd, MMMM Do YYYY")}
                </p>
              </Grid>
              <Grid item>
                <p>1-night stay</p>
              </Grid>
              <Grid item />
              <p>{time}: $199.00</p>
              <p>Taxes and fees: $26.63</p>
            </Grid>

            <Grid item>
              <h3>Total to pay now $225.63</h3>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  individualHotelData: state.individualHotelData,
  query: state.query,
  roomSelection: state.roomSelection
});

export default connect(
  mapStateToProps,
  {}
)(BookingInfo);
