// TODO:
// - IF CHANGE, SHOW OLD/NEW DATES

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileInfo, getHistory } from "../../actions/profileActions";

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
import ReviewRating from "./ReviewRating";
import HistoryExpansionTable from "./HistoryExpansionTable";
import "./history.css";
import CancellationPrompt from "./CancellationPrompt";
import ChangeReservation from "./ChangeReservation";
import { Elements, StripeProvider } from "react-stripe-elements";
const styles = {
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
  dateChangedTo: {
    color: "#FFA500"
  },
  backgroundStyle: {
    background: "linear-gradient(45deg, #ffffff 30%, #cfe6fe 90%)"
  },
  ReviewButton: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 1,
    paddingBottom: 1
  },
  ReviewedButton: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    color: "white",
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: "#3ba711"
  },
  ReviewedButtonForPhone: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    color: "white",
    marginLeft: 28,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: "#3ba711"
  }
};

class HistoryOverview extends Component {
  componentWillMount() {
    this.props.getHistory();
    this.props.getProfileInfo();
  }

  render() {
    const { history, profile_info } = this.props.profile;

    const { classes, profile, width } = this.props;
    let bookings;
    let displayChangeChip;
    let displayRegularChip;
    let arrayOfButtons;
    let rewardsPointsContainer = null;
    let expansionData;

    if (profile.loading || history === null) {
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
    } else {
      if (history.length === 0) {
        bookings = (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.msgHeight}
          >
            <Grid item>yes</Grid>
          </Grid>
        );
      } else {
        if (profile_info != null) {
          rewardsPointsContainer = (
            <div>
              <div className="rewardsPointsBalance">Reward Points Balance:</div>
              <div className="rewardsPointsBalance">
                {profile_info.rewardPoints
                  ? profile_info.rewardPoints.toFixed(0)
                  : 0}
              </div>
              <br />
            </div>
          );
        }
        if (history != null) {
          bookings = history.map(booking => {
            displayChangeChip = null;
            displayRegularChip = null;
            arrayOfButtons = null;
            expansionData = null;
            var checkInDateAndTime = new Date(booking.check_in_date);
            var checkOutDateAndTime = new Date(booking.check_out_date);
            var checkInDateAndTimeNEW = new Date(booking.new_check_in_date);
            var checkOutDateAndTimeNEW = new Date(booking.new_check_out_date);
            var month = new Array(12);
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            // if the booking was changed, we  display the "Changed" chip
            if (booking.changed === true) {
              displayChangeChip = (
                <Chip
                  label="Changed"
                  color="primary"
                  className={classes.chipChange}
                  icon={<SwapHorizIcon />}
                />
              );
              checkInDateAndTime = checkInDateAndTimeNEW;
              checkOutDateAndTime = checkOutDateAndTimeNEW;
            }

            var discountToPass = booking.discount;
            var rewardsDiscountToPass = booking.rewardDiscount;
            if (booking.price != undefined) {
              expansionData = {
                bookingId: booking.bookingID,
                name: booking.name,
                checkIn: checkInDateAndTime,
                checkOut: checkOutDateAndTime,
                roomType: booking.typeOfRoom,
                nightlyRate: (booking.price + 0).toFixed(2),
                numRooms: booking.numOfRoom,
                numberOfNights: booking.numOfNights,
                subtotal: (booking.subtotal + 0).toFixed(2),
                discounts: discountToPass
                  ? discountToPass.toFixed(2)
                  : discountToPass,
                rewardsDiscount: rewardsDiscountToPass
                  ? rewardsDiscountToPass.toFixed(2)
                  : rewardsDiscountToPass,
                taxesAndFees: (booking.taxesAndFees + 0).toFixed(2),
                total: (booking.total + 0).toFixed(2),
                rewardPointsEarned: booking.rewardPointsEarned,
                rewardPointsUsed: booking.rewardPointsUsed
              };
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
                arrayOfButtons = (
                  <Grid className="buttonContainer">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                    >
                      REVIEW
                    </Button>
                    <br />
                    <br />
                    <StripeProvider apiKey="pk_test_CfoXbulxsXkVcOxKjywJuhkq00V32mVcsx">
                      <Elements>
                        <ChangeReservation
                          checkInTime={checkInDateAndTime}
                          checkOutTime={checkOutDateAndTime}
                          id={booking.bookingID}
                          hotel={booking.hotelName}
                          expansionData={expansionData}
                        />
                      </Elements>
                    </StripeProvider>
                    <br />
                    <CancellationPrompt
                      checkInTime={checkInDateAndTime}
                      checkOutTime={checkOutDateAndTime}
                      id={booking.bookingID}
                      hotel={booking.hotelName}
                    />
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
                arrayOfButtons = (
                  <Grid className="buttonContainer">
                    <ReviewRating
                      ReviewButtonStyle={classes.ReviewButton}
                      ReviewedButtonStyle={classes.ReviewedButton}
                      booking={booking}
                    />{" "}
                  </Grid>
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
                arrayOfButtons = (
                  <Grid className="buttonContainer">
                    <ReviewRating
                      ReviewButtonStyle={classes.ReviewButton}
                      ReviewedButtonStyle={classes.ReviewedButton}
                      booking={booking}
                    />{" "}
                  </Grid>
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
                arrayOfButtons = <Grid className="buttonContainer" />;
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
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="space-evenly"
                  >
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
                      <Grid
                        item
                        className="HistoryPageTotal HistoryContainerDates"
                      >
                        Total: $ {(booking.total + 0).toFixed(2)}
                      </Grid>
                      <br />
                      <Grid
                        item
                        className="HistoryPageTotal HistoryContainerDates"
                      >
                        {month[checkInDateAndTime.getUTCMonth()]}{" "}
                        {checkInDateAndTime.getUTCFullYear()}
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item>{arrayOfButtons} </Grid>
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
        }
      }
    }
    return (
      <div className="HistoryContainer">
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
        <div className="rewardsPointsBalance">{rewardsPointsContainer}</div>
        {bookings}
        <br /> <br />
      </div>
    );
  }
}

HistoryOverview.propTypes = {
  getProfileInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  history: state.history,
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  { getHistory, getProfileInfo }
)(withStyles(styles)(HistoryOverview));
