import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
let id = 0;
function createData(firstCol, secondCol) {
  id += firstCol + 1;
  return { id, firstCol, secondCol };
}
function Confirmation(props) {
  const bookingData = props.bookingData;
  const ReservationRows = [
    createData("Confirmation Number", bookingData.bookingId),
    createData(
      "Guest Name",
      bookingData.Firstname + " " + bookingData.Lastname
    ),
    createData("Arrival Date", bookingData.checkIn),
    createData("Departure Date", bookingData.checkOut),
    createData("Room Type", bookingData.roomType)
  ];

  const PoliciesRows = [
    createData("Check-In Time", "3:00 PM"),
    createData("Check-Out Time", "12:00 noon"),
    createData("Reward Poinst Earned", bookingData.rewardPointsEarned),
    createData(
      "Cancellation Policy",
      "Quos blanditiis tenetur unde suscipit, quam beatae inventoreconsectetur, neque doloribus, cupiditate numquam dignissimos laborum"
    )
  ];
  return (
    <Card>
      <Grid container spacing={16} justify="center">
        <Grid item xs={10}>
          <Typography variant="h4" gutterBottom>
            {bookingData.hotelName}
          </Typography>
          <br />
          <Typography variant="h6" gutterBottom>
            {bookingData.destinationName}
          </Typography>
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
            {" "}
            <br /> <br />
            Dear Mr/Mrs {bookingData.Lastname},
            <br /> <br />
            Thank you for choosing {bookingData.hotelName}. It is our pleasure
            to confirm the following reservation.
          </Typography>
        </Grid>

        <Grid item xs={4}>
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

        <Grid item xs={4}>
          <div
            style={{
              color: "white",
              background: "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
            }}
          >
            {" "}
            RESERVATION DETAILS
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
          <Typography>
            {bookingData.hotelName} {bookingData.hotelAddress}
          </Typography>
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
