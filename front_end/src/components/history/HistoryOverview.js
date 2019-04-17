import React, { Component } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, getHistory } from "../../actions/profileActions";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CancelIcon from "@material-ui/icons/Cancel";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { CircularProgress } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import HistoryExpansionTable from "./HistoryExpansionTable";

import "./history.css";

const styles = theme => ({
  table: {
    maxWidth: 330,
    minWidth: 300,
    maxHeight: 50
  },
  paddingDense: {
    paddingTop: 0,
    paddingBottom: 0
  },
  tableCell: {
    maxHeight: 50
  },
  tableNoBorder: {
    maxHeight: 10,

    border: 0
  },
  chipChange: {
    marginLeft: 3,
    backgroundColor: "#FFA500"
  },
  chipCancel: {
    backgroundColor: "#FF4500"
  },
  chipCheckin: {
    backgroundColor: "#3ba711"
  },
  dateChangedFrom: {
    textDecoration: "line-through"
  },
  dateChangedTo: {
    color: "#FFA500"
  },
  backgroundStyle: {
    background: "linear-gradient(45deg, #ffffff 30%, #cfe6fe 90%)"
  }
});

class HistoryOverview extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getHistory();
  }
  componentWillMount() {
    this.props.getHistory();
  }

  render() {
    const { classes, profile } = this.props;
    let bookings;
    let displayChangeChip;
    let displayRegularChip;
    let dateOverview;
    let cancelAndChangeButtons;

    if (profile.loading) {
      bookings = (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.msgHeight}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }

    bookings = this.props.profile.history.map(booking => {
      displayChangeChip = null;
      displayRegularChip = null;
      dateOverview = null;
      cancelAndChangeButtons = null;

      let expansionData = {
        bookingId: booking.bookingID,
        Firstname: "MISSING",
        Lastname: "MISSING",
        checkIn: booking.check_in_date,
        checkOut: booking.check_out_date,
        roomType: booking.typeOfRoom,
        nightlyRate: "MISSING",
        numRooms: booking.numOfRoom,
        numberOfNights: "MISSING",
        subtotal: booking.subtotal,
        discounts: "MISSING", // booking.discount,
        rewardsDiscount: "MISSING",
        taxesAndFees: "MISSING",
        total: booking.total,
        rewardPointsEarned: "MISSING", //booking.rewardPointsEarned,
        rewardPointsUsed: "MISSING" //booking.rewardPointsUsed
      };

      // if the booking was not changed, we display the regular CheckIn and Checkout Overview
      if (booking.changed === false) {
        displayChangeChip = null;
        dateOverview = (
          <Table className="HistoryContainerDates">
            <TableRow>
              <TableCell
                classes={{
                  paddingDense: classes.paddingDense
                }}
                padding="dense"
                className={classes.tableNoBorder}
              >
                Check In:
              </TableCell>
              <TableCell
                padding="dense"
                align="right"
                className={classes.tableNoBorder}
              >
                {booking.check_in_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding="dense" className={classes.tableNoBorder}>
                Check Out:
              </TableCell>
              <TableCell
                padding="dense"
                align="right"
                className={classes.tableNoBorder}
              >
                {booking.check_out_date}
              </TableCell>
            </TableRow>
          </Table>
        );
      } else {
        // if the booking was changed, we display a different CheckIn and Checkout Overview, with all 4 dates
        // we also display the "Changed" chip
        displayChangeChip = (
          <Chip
            label="Changed"
            color="primary"
            className={classes.chipChange}
            icon={<SwapHorizIcon />}
          />
        );
        dateOverview = (
          <Table className="HistoryContainerDates">
            <TableRow>
              <TableCell className={classes.tableNoBorder}>Check In:</TableCell>
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedFrom
                }}
                className={classes.tableNoBorder}
              >
                {booking.check_in_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" className={classes.tableNoBorder} />
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedTo
                }}
                className={classes.tableNoBorder}
              >
                {booking.new_check_in_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableNoBorder}>
                Check Out:
              </TableCell>
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedFrom
                }}
                className={classes.tableNoBorder}
              >
                {booking.check_out_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" className={classes.tableNoBorder} />
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedTo
                }}
                className={classes.tableNoBorder}
              >
                {booking.new_check_out_date}
              </TableCell>
            </TableRow>
          </Table>
        );
      }

      // here we determine which chip to display. There are four different statuses that each correspond to a chip
      //0 = trip comin up
      //1 = user has checked in
      //2 = user has checked out
      //3 = trip was canceled
      switch (booking.status) {
        case 0:
          displayRegularChip = (
            <Chip
              label="Coming Up"
              color="secondary"
              className={classes.chip}
              icon={<DoneIcon />}
            />
          );
          cancelAndChangeButtons = (
            <Grid className="HistoryPageTotal">
              <Button>REVIEW</Button>
              <br />
              <Button>CHANGE</Button>
              <br />
              <Button>CANCEL</Button>
            </Grid>
          );
          break;
        case 1:
          displayRegularChip = (
            <Chip
              label="Checked In"
              color="primary"
              className={classes.chipCheckin}
              icon={<DoneIcon />}
            />
          );
          break;
        case 2:
          displayRegularChip = (
            <Chip
              label="Checked Out"
              color="primary"
              className={classes.chipCheckout}
              icon={<ExitIcon />}
            />
          );
          break;
        case 3:
          displayRegularChip = (
            <Chip
              label="Canceled"
              color="primary"
              className={classes.chipCancel}
              icon={<CancelIcon />}
            />
          );
          break;
        default:
      }

      // these are the expansionpanels for all the different bookings
      return (
        <ExpansionPanel
          classes={{
            expanded: classes.backgroundStyle
          }}
        >
          {/* ExpansionPanelSummary is the part that is always visible */}
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={0} direction="row" justify="space-evenly">
              <Grid item>
                <img
                  className="historyHotelImage"
                  src={booking.img}
                  alt="hotel img"
                />
              </Grid>

              <Grid className="HistoryContainerHotelName">
                <Grid item className="HistoryPageHotelName">
                  {booking.hotelName}
                </Grid>
                <Grid item className="HistoryPageDestinationName">
                  {booking.city}
                </Grid>
                <Grid item className="chipsAndTotal">
                  <br />
                  {displayRegularChip}
                  {displayChangeChip}
                </Grid>
                {/* We display a different layout for small screens */}
                <Grid item className="chipsAndTotalSmall">
                  <br />
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="space-between"
                  >
                    <Grid item>{displayRegularChip}</Grid>
                    <Grid item className="HistoryPageTotalSmall">
                      Total: $ {(booking.total + 0).toFixed(2)}
                    </Grid>
                  </Grid>

                  {displayChangeChip}
                </Grid>
              </Grid>

              <Grid>
                <Grid item className="HistoryPageTotal HistoryContainerDates">
                  Total: $ {(booking.total + 0).toFixed(2)}
                </Grid>
              </Grid>
              <Grid>
                <Grid item>{cancelAndChangeButtons} </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>

          {/* ExpansionPanelDetails is the part that can be expanded (not visible by default) */}
          <ExpansionPanelDetails>
            <HistoryExpansionTable expansionData={expansionData} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });

    return (
      <div>
        <Grid
          container
          className="HistoryBoxes"
          spacing={0}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item id="HistoryContainerTitle">
            Your Travel History
          </Grid>
        </Grid>
        <div className="rewardsPointsBalance">Reward Points: 99,999</div>
        {bookings}
        <br /> <br />
      </div>
    );
  }
}
HistoryOverview.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  history: state.history
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getHistory }
)(withStyles(styles)(HistoryOverview));
