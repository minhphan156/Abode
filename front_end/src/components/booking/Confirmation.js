import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

function Confirmation(props) {
  const bookingData = props.bookingData;

  return (
    <Card>
      <Grid container spacing={16} justify="center">
        <Grid item xs={10}>
          <CardHeader title={bookingData.name} />
        </Grid>

        <Grid item xs={5}>
          <CardMedia
            style={{ width: "100%", height: 200 }}
            image={require("../landing_page/SF.jpg")}
          />
        </Grid>

        <Grid item xs={5}>
          <CardMedia
            style={{ width: "100%", height: 200 }}
            image={require("../landing_page/SD.jpg")}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography>
            Dear Mr/Mrs {bookingData.Lastname},
            <br />
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Confirmation Number
            </Typography>
            {bookingData.bookingId}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Guest Name
            </Typography>
            {bookingData.Firstname} {bookingData.Lastname}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Arrival Date
            </Typography>
            {bookingData.checkIn}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Departure Date
            </Typography>
            {bookingData.checkOut}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Room Type
            </Typography>
            {bookingData.numRooms}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Nightly Rate
            </Typography>
            {bookingData.roomType}
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Check-In Time
            </Typography>
            {bookingData.bookingId}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Check-Out Time
            </Typography>
            {bookingData.Firstname} {bookingData.Lastname}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Room Tax
            </Typography>
            {bookingData.checkIn}
            <br />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              Cancellation Policy
            </Typography>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            quam beatae rerum inventore.
            <br />
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Typography>{bookingData.name}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

Confirmation.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  bookingData: state.bookingData
});

export default connect(mapStateToProps)(Confirmation);
