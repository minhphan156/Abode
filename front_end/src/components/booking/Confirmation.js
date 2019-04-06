import React from "react";
import { connect } from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import withWidth from "@material-ui/core/withWidth";
import { isWidthDown } from "@material-ui/core/withWidth";

let id = 0;
function createData(firstCol, secondCol) {
  id += firstCol + 1;
  return { id, firstCol, secondCol };
}

function Confirmation(props) {
  const bookingData = props.bookingData.bookingConfirmationData;
  const width = props.width;

  const ReservationRows = [
    createData("Confirmation Number", bookingData.bookingId),
    createData(
      "Guest Name",
      bookingData.Firstname + " " + bookingData.Lastname
    ),
    createData("Arrival Date", bookingData.checkIn),
    createData("Departure Date", bookingData.checkOut),
    createData("Room Type", bookingData.roomType),
    createData("Nightly Rate", bookingData.nightlyRate)
  ];

  const PoliciesRows = [
    createData("Check-In Time", "3:00 PM"),
    createData("Check-Out Time", "12:00 noon"),
    createData("Room Tax", "14% State Tax"),
    createData("Reward Poinst Earned", bookingData.rewardPointsEarned),
    createData(
      "Cancellation Policy",
      "Cancellations must be received by 4:00 PM the day prior to arrival to avoid a charge of one night's room"
    )
  ];

  return (
    <Grid
      container
      spacing={16}
      direction={isWidthDown("sm", width) ? "column" : ""}
      justify={isWidthDown("sm", width) ? "flex-start" : "center"}
      style={{ margin: isWidthDown("sm", width) ? 10 : -8 }}
    >
      <Grid item xs={10}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{ marginTop: 10 }}
        >
          {bookingData.hotelName}
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          {bookingData.hotelAddress}
        </Typography>
      </Grid>

      <Grid item xs={isWidthDown("sm", width) ? 11 : 5}>
        <CardMedia
          style={{ width: "100%", height: 200 }}
          image={require("../landing_page/SF.jpg")}
        />
      </Grid>

      <Grid item xs={isWidthDown("sm", width) ? 11 : 5}>
        <CardMedia
          style={{ width: "100%", height: 200 }}
          image={require("../landing_page/SD.jpg")}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {" "}
          <br />
          Dear Mr/Ms. {bookingData.Lastname},
          <br />
          Thank you for choosing {bookingData.hotelName}. It is our pleasure to
          confirm the following reservation.
        </Typography>
      </Grid>
      <Grid item xs={isWidthDown("sm", width) ? 11 : 4}>
        <div
          style={{
            color: "white",
            background: "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
          }}
        >
          {" "}
          RESERVATION DETAILS
        </div>
        <Table>
          <TableBody>
            {ReservationRows.map(row => (
              <TableRow
                key={row.id}
                style={{
                  padding: 0
                }}
              >
                <TableCell align="left" style={{ padding: 0, width: 150 }}>
                  {row.firstCol}
                </TableCell>
                <TableCell align="left" style={{ padding: 0 }}>
                  {row.secondCol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={isWidthDown("sm", width) ? 11 : 4}>
        <div
          style={{
            color: "white",
            background: "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
          }}
        >
          {" "}
          Policies
        </div>{" "}
        <Table>
          <TableBody>
            {PoliciesRows.map(row => (
              <TableRow key={row.id} style={{ padding: 0 }}>
                <TableCell align="left" style={{ padding: 0, width: 150 }}>
                  {row.firstCol}
                </TableCell>
                <TableCell align="left" style={{ padding: 0 }}>
                  {row.secondCol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={10}>
        <Typography align="center" gutterBottom variant="h5">
          We Look Forward To Seeing You Soon
        </Typography>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  bookingData: state.bookingData
});

export default connect(mapStateToProps)(withWidth()(Confirmation));
