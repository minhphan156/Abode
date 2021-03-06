import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { changeReservation } from "../../actions/bookingActions";
import { Button } from "@material-ui/core/";
import { CardElement, injectStripe } from "react-stripe-elements";

import CardContent from "@material-ui/core/CardContent";
import TextFieldGroup from "../common/TextFieldGroup";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CalendarPicker from "../landing_page/search_widget/CalendarPicker";
import "./history.css";
import moment from "moment";
import taxrates from "../payment/taxrates.json";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ChangeReservation extends Component {
  constructor() {
    super();
    this.state = {
      openChangeDialog: false,
      newCheckIn: null,
      newCheckOut: null,
      days: null,
      showChange: false,
      taxRate: 0, //Default tax rate is 12.5% when only reward points used for booking
      //No basis to calculate tax rate from when $0 taxAndFees and $0 subtotal
      total: null,
      preventNegativeCashBalanceFlag: 1,
      decreaseRewardsPoints: 0,
      hybridPointsCashDecrement: 0,
      zeroCash: 1
    };
    this.stripeValidate = this.stripeValidate.bind(this);
    this.onChangeClick = this.onChangeClick.bind(this);
    this.onHandleDate = this.onHandleDate.bind(this);
    this.showChangeClick = this.showChangeClick.bind(this);
  }
  showChangeClick(expansionData) {
    if (this.state.newCheckIn !== null && this.state.newCheckOut !== null) {
      var duration = moment.duration(
        this.state.newCheckOut.diff(this.state.newCheckIn)
      );

      let taxRate = 0;

      // get the city's tax rate and pass it on as part of tempBookingInfo
      taxrates.name.filter(taxrate => {
        if (taxrate.label === expansionData.city) {
          taxRate = taxrate.rate;
        }
      });
      this.setState({ taxRate: taxRate });

      this.setState({ days: duration.asDays() });
      this.setState({
        total:
          expansionData.nightlyRate *
          (duration.asDays() - expansionData.numberOfNights) *
          (1 + taxRate)
      });
      if (
        expansionData.total == 0 &&
        expansionData.nightlyRate *
        (duration.asDays() - expansionData.numberOfNights) *
        (1 + taxRate) <
        0
      ) {
        this.setState({ preventNegativeCashBalanceFlag: 0 });
        this.setState({ decreaseRewardsPoints: 1 });
      }
      if (
        expansionData.total <
        -(
          expansionData.nightlyRate *
          (duration.asDays() - expansionData.numberOfNights) *
          (1 + taxRate)
        )
      ) {
        this.setState({ preventNegativeCashBalanceFlag: 0 });
        this.setState({ hybridPointsCashDecrement: 1 });
        this.setState({ zeroCash: 0 });
      }
      this.setState({ showChange: true });
    }
  }
  stripeValidate(e) {
    this.setState({ paymentField: e.complete });
  }
  handleChangeClickOpen = event => {
    event.stopPropagation();
    this.setState({ openChangeDialog: true });
  };
  handleChangeClose = event => {
    event.stopPropagation();
    this.setState({ openChangeDialog: false });
  };
  onChangeClick(bookingID, expansionData) {
    var duration = moment.duration(
      this.state.newCheckOut.diff(this.state.newCheckIn)
    );
    var days = duration.asDays();

    const changeReservationData = {
      bookingID: bookingID,
      newCheckIn: this.state.newCheckIn,
      newCheckOut: this.state.newCheckOut,
      numberOfNights: days,
      newSubtotal:
        expansionData.nightlyRate * (days - expansionData.numberOfNights) +
        expansionData.subtotal / 1,
      newDiscount: expansionData.discounts, //no increase in discounts for changing reservation
      newTaxesAndFees:
        this.state.zeroCash *
        expansionData.nightlyRate *
        this.state.preventNegativeCashBalanceFlag *
        (this.state.days - expansionData.numberOfNights) *
        this.state.taxRate +
        (expansionData.taxesAndFees / 1) * this.state.zeroCash,
      newRewardsDiscount:
        this.state.zeroCash *
        (expansionData.nightlyRate *
          (days - expansionData.numberOfNights) *
          this.state.decreaseRewardsPoints +
          expansionData.rewardsDiscount / 1) +
        this.state.hybridPointsCashDecrement * expansionData.nightlyRate * days,  //extra costs incurred in changing reservation must be payed in cash
      newTotal:
        this.state.zeroCash *
        parseFloat(
          expansionData.nightlyRate *
          this.state.preventNegativeCashBalanceFlag *
          (this.state.days - expansionData.numberOfNights) *
          (1 + this.state.taxRate) +
          expansionData.total / 1
        ), //need to divide by 1 to be recognized as a number
      //repetition of calculation code because if it is stored as a variable elsewhere, javascript recognizes a number as string
      //or is not able to recognize a negative number as negative
      newPointsEarned: (
        (expansionData.nightlyRate *
          this.state.preventNegativeCashBalanceFlag *
          (this.state.days - expansionData.numberOfNights) *
          (1 + this.state.taxRate) +
          expansionData.total / 1) *
        this.state.zeroCash *
        10
      ).toFixed(0),

      newPointsUsed:
        this.state.zeroCash *
        (expansionData.nightlyRate *
          (days - expansionData.numberOfNights) *
          this.state.decreaseRewardsPoints *
          100 +
          expansionData.rewardPointsUsed / 1) +
        this.state.hybridPointsCashDecrement *
        expansionData.nightlyRate *
        days *
        100  //rewardPoints cannot be used for additional nights
    };
    console.log("TOTAL");
    console.log(changeReservationData.newTotal);
    console.log(this.state.zeroCash);
    this.props.changeReservation(changeReservationData);
    this.setState({ openChangeDialog: false });
    window.location.reload();
  }
  onHandleDate(startingDate, endingDate) {
    this.setState({ showChange: false });
    this.setState({ newCheckIn: startingDate });
    this.setState({ newCheckOut: endingDate });
  }
  render() {
    const {
      classes,
      checkInTime,
      checkOutTime,
      id,
      hotel,
      expansionData
    } = this.props;
    return (
      <div>
        {expansionData.bookingChanged === true ? null : (
          <Button
            onClick={this.handleChangeClickOpen}
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            CHANGE
          </Button>
        )}
        <Dialog
          fullScreen
          open={this.state.openChangeDialog}
          onClose={this.handleChangeClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleChangeClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" color="inherit" className={classes.flex}>
                Change Reservation
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid container spacing={0} direction="row" justify="space-evenly">
              <Grid item>
                <DialogTitle>Current Reservation</DialogTitle>
                <DialogContent>
                  {hotel}
                  <br /> <br />
                  Check In: {checkInTime.toDateString()} <br /> <br />
                  Check Out: {checkOutTime.toDateString()} <br /> <br />
                  Number of Nights: {expansionData.numberOfNights}
                </DialogContent>
                {this.state.newCheckIn != null &&
                  this.state.newCheckOut != null &&
                  this.state.showChange === true ? (
                    <div>
                      <DialogTitle>New Reservation</DialogTitle>
                      <DialogContent>
                        Check In: {new Date(this.state.newCheckIn).toDateString()}{" "}
                        <br /> <br />
                        Check Out:{" "}
                        {new Date(
                          this.state.newCheckOut
                        ).toDateString()} <br /> <br />
                        Number of Nights: {this.state.days}
                      </DialogContent>
                    </div>
                  ) : null}
              </Grid>
              <Grid item>
                <DialogTitle>
                  Select dates to change your reservation.
                </DialogTitle>
                <DialogContent>
                  Select the new start and end dates for changing your
                  reservation.
                </DialogContent>
                <CalendarPicker
                  class="centerChangeReservation"
                  checkIn={this.state.newCheckIn}
                  checkOut={this.state.newCheckOut}
                  onHandleDate={this.onHandleDate}
                  dealPage={true}
                />
                <DialogActions>
                  {this.state.newCheckIn == null ||
                    this.state.newCheckOut == null ? null : (
                      <Button
                        onClick={() => this.showChangeClick(expansionData)}
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                      >
                        Select Dates
                    </Button>
                    )}
                </DialogActions>
                {this.state.showChange === true && this.state.total > 0 ? (
                  <div>
                    <CardContent>
                      <h4 style={{ marginTop: "1%" }}>
                        Payment for Extra{" "}
                        {this.state.days - expansionData.numberOfNights}{" "}
                        Night(s) : ${this.state.total.toFixed(2)}
                      </h4>
                      <hr />
                      <TextFieldGroup
                        placeholder="Name on Card"
                        name="nameOnCard"
                      />

                      <CardElement
                        name="paymentField"
                        onChange={this.stripeValidate}
                        id="sample-input"
                      />
                    </CardContent>
                  </div>
                ) : null}
                {this.state.showChange === true &&
                  expansionData.numberOfNights > this.state.days ? (
                    <DialogTitle>
                      <br /> <br />
                      You will be automatically refunded with cash and/or points.
                  </DialogTitle>
                  ) : null}
                {this.state.showChange === true &&
                  expansionData.numberOfNights == this.state.days ? (
                    <DialogTitle>
                      <br /> <br />
                      There will be no charges or refunds for the requested
                      changes.
                  </DialogTitle>
                  ) : null}
              </Grid>
            </Grid>
            <DialogActions>
              {this.state.newCheckIn == null ||
                this.state.newCheckOut == null ||
                this.state.showChange == false ? null : (
                  <Button
                    onClick={() => this.onChangeClick(id, expansionData)}
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    Confirm Change
                </Button>
                )}

              <Button
                onClick={this.handleChangeClose}
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                Cancel Change
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(
  injectStripe(
    connect(
      mapStateToProps,
      { changeReservation }
    )(withStyles(styles)(ChangeReservation))
  )
);
