import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import withWidth from "@material-ui/core/withWidth";
import { isWidthDown } from "@material-ui/core/withWidth";

let id = 0;
function createData(firstCol, secondCol) {
  id += firstCol + 1;
  return { id, firstCol, secondCol };
}

class HistoryExpansionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const width = this.props.width;
    const bookingData = this.props.expansionData;
    let ReservationRows;
    let PoliciesRows;
    let BillRows;

    if (bookingData) {
      ReservationRows = [
        createData("Confirmation Number", bookingData.bookingId),
        createData("Guest Name", bookingData.name),
        createData("Arrival Date", bookingData.checkIn.toDateString()),
        createData("Departure Date", bookingData.checkOut.toDateString()),
        createData("Room Type", bookingData.roomType)
      ];

      PoliciesRows = [
        createData("Check-In Time", "3:00 PM"),
        createData("Check-Out Time", "12:00 noon"),
        createData(
          "Cancellation Policy",
          "Cancellations must be received 48 hours before check-in date for full refund"
        )
      ];

      BillRows = [
        createData("Nightly Rate", "$" + bookingData.nightlyRate),
        createData("Number of Rooms", bookingData.numRooms),
        createData("Number of Nights", bookingData.numberOfNights),
        createData("Subtotal", "$" + bookingData.subtotal),
        createData(
          "Discounts",
          bookingData.discounts
            ? "$" + bookingData.discounts
            : bookingData.discounts
        ),
        createData(
          "Rewards Discount",
          bookingData.rewardsDiscount ? "$" + bookingData.rewardsDiscount : null
        ),
        createData("Taxes and Fees", "$" + bookingData.taxesAndFees),
        createData("Total", "$" + bookingData.total),
        createData("Reward Points Used", bookingData.rewardPointsUsed),
        createData(
          "Reward Points Earned (*added after check-in)",
          bookingData.rewardPointsEarned
        )
      ];

      return (
        <Grid
          xs={isWidthDown("xs", width) ? 11 : 12}
          container
          spacing={isWidthDown("xs", width) ? 0 : 8}
          justify="center"
          style={{ margin: isWidthDown("xs", width) ? 10 : -8 }}
        >
          <Grid item xs={isWidthDown("xs", width) ? 11 : 4}>
            <div
              style={{
                color: "white",
                paddingLeft: 10,
                background:
                  "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
              }}
            >
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
                    <TableCell
                      align="left"
                      style={{ paddingLeft: 5, paddingRight: 5, width: 150 }}
                    >
                      {row.firstCol}
                    </TableCell>
                    <TableCell align="left" style={{ padding: 0 }}>
                      {row.secondCol}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{
                color: "white",
                paddingLeft: 10,

                background:
                  "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
              }}
            >
              POLICIES
            </div>
            <Table>
              <TableBody>
                {PoliciesRows.map(row => (
                  <TableRow key={row.id} style={{ padding: 0 }}>
                    <TableCell
                      align="left"
                      style={{ paddingLeft: 5, paddingRight: 5, width: 150 }}
                    >
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
          <Grid item xs={isWidthDown("xs", width) ? 11 : 4}>
            <div
              style={{
                color: "white",
                paddingLeft: 10,

                background:
                  "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
              }}
            >
              FINAL BILL
            </div>
            <Table>
              <TableBody>
                {BillRows.map(row => {
                  if (row.secondCol === null) {
                    // if no discounts, dont render the row
                    return;
                  } else {
                    return (
                      <TableRow key={row.id} style={{ padding: 0 }}>
                        <TableCell
                          align="left"
                          style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                            width: 150
                          }}
                        >
                          {row.firstCol}
                        </TableCell>
                        <TableCell align="right">{row.secondCol}</TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  bookingData: state.bookingData,
  query: state.query
});

export default connect(mapStateToProps)(withWidth()(HistoryExpansionTable));
