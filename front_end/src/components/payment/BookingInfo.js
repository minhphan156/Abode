// TODO: MAKE EVERYTHING LOOK NICE AND INTEGRATE ALL THE STUFF FROM BACKEND

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import { getProfileInfo } from "../../actions/profileActions";

import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./PaymentPage.css";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InfoOutline from "@material-ui/icons/Info";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  cellRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  tableNoBorder: {
    maxHeight: 10,
    border: 0
  },
  tableBlackBorder: {
    maxHeight: 10,
    borderColor: "#000000"
  },
  disabledCheckbox: {
    display: "none"
  }
});

class BookingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checkedA: false,
      actualRewardsDiscount: 0,
      rewardsPoints: this.props.auth.user.rewardPoints,
      possibleRewardsDiscount: 0
    };
  }

  componentDidMount() {
    this.props.getProfileInfo();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // handleChange deals with the user clicking on the checkbox next to Rewards Discount
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      if (this.state.checkedA === true) {
        this.setState(
          {
            actualRewardsDiscount: this.state.possibleRewardsDiscount
          },
          () => {
            var taxesAndFees =
              (this.props.bookingData.tempBookingData.subtotal -
                this.props.bookingData.tempBookingData.discounts -
                this.state.actualRewardsDiscount) *
              this.props.bookingData.tempBookingData.taxRate;
            var total =
              this.props.bookingData.tempBookingData.subtotal -
              this.props.bookingData.tempBookingData.discounts -
              this.state.actualRewardsDiscount +
              taxesAndFees;

            var rewardsPointsEarned = 10 * total;

            // we send actualRewardsDiscount and rewardsPointsEarned to the parent component 'PaymentPage.js'
            this.props.getDataFromBookingInfoPage(
              this.state.actualRewardsDiscount,
              Math.round(rewardsPointsEarned)
            );
          }
        );
      } else {
        this.setState(
          {
            actualRewardsDiscount: 0
          },
          () => {
            var taxesAndFees =
              (this.props.bookingData.tempBookingData.subtotal -
                this.props.bookingData.tempBookingData.discounts -
                this.state.actualRewardsDiscount) *
              this.props.bookingData.tempBookingData.taxRate;
            var total =
              this.props.bookingData.tempBookingData.subtotal -
              this.props.bookingData.tempBookingData.discounts -
              this.state.actualRewardsDiscount +
              taxesAndFees;

            var rewardsPointsEarned = 10 * total;

            // we send actualRewardsDiscount and rewardsPointsEarned to the parent component 'PaymentPage.js'
            this.props.getDataFromBookingInfoPage(
              this.state.actualRewardsDiscount,
              rewardsPointsEarned
            );
          }
        );
      }
    });
  };

  calculatePossibleRewardsDiscountInDollar(rewardsPoints, subtotal, discounts) {
    if (rewardsPoints > 9999) {
      if (rewardsPoints / 100 < subtotal - discounts) {
        return rewardsPoints / 100;
      } else {
        return subtotal - discounts;
      }
    } else {
      return 0;
    }
  }

  render() {
    console.log(this.props)
    const { classes, profile, width } = this.props;
    const { tempBookingData } = this.props.bookingData;

    let rewardsContainer = null;
    let discountContainer = null;

    /// The following is all about rewards calculations and rewards container
    this.state.possibleRewardsDiscount = this.calculatePossibleRewardsDiscountInDollar(
      this.state.rewardsPoints,
      tempBookingData.subtotal,
      tempBookingData.discounts
    );

    let rewardsPointsDiscountDisplay = null;
    let checkboxState = true;

    if (this.state.possibleRewardsDiscount > 0) {
      checkboxState = false;
    }
    if (this.state.checkedA === true) {
      rewardsPointsDiscountDisplay =
        "- $ " + this.state.possibleRewardsDiscount.toFixed(2);
    } else {
      rewardsPointsDiscountDisplay = "-";
    }

    if (this.props.auth.isAuthenticated) {
      rewardsContainer = (
        <TableRow>
          <TableCell
            classes={{
              root: classes.cellRoot
            }}
            className={classes.tableNoBorder}
          >
            Rewards Points
            <Checkbox
              disabled={checkboxState}
              classes={{
                disabled: classes.disabledCheckbox
              }}
              className="rewardsCheckbox"
              disableRipple={true}
              checked={this.state.checkedA}
              onChange={this.handleChange("checkedA")}
              value="checkedA"
              color="primary"
            />
            <IconButton
              className="infoButton"
              color="secondary"
              aria-label="Info"
              onClick={this.handleClickOpen}
            >
              <InfoOutline />
            </IconButton>
          </TableCell>
          <TableCell
            align="right"
            classes={{
              root: classes.cellRoot
            }}
            className={classes.tableNoBorder}
          >
            {rewardsPointsDiscountDisplay}
          </TableCell>
        </TableRow>
      );
    }

    /// The following is all about discounts calculations and discount container
    let promotionDiscount = tempBookingData.discounts;

    if (promotionDiscount) {
      discountContainer = (
        <TableRow>
          <TableCell
            classes={{
              root: classes.cellRoot
            }}
            className={classes.tableNoBorder}
          >
            Discounts:
          </TableCell>
          <TableCell
            align="right"
            classes={{
              root: classes.cellRoot
            }}
            className={classes.tableNoBorder}
          >
            - $ {promotionDiscount.toFixed(2)}
          </TableCell>
        </TableRow>
      );
    }

    return (
      <React.Fragment>
        <Paper
          className="bookingInfoContainer"
          style={{
            backgroundColor: "#e3ecf7"
          }}
        >
          <div>
            <img src={tempBookingData.hotelImage} alt="image" />
          </div>
          <h4
            className="display-4 test-left"
            style={{
              marginLeft: "3%",
              marginTop: "5%",
              fontSize: 14,
              fontWeight: "bold"
            }}
          >
            {tempBookingData.name}
          </h4>
          <h5
            className="display-4 test-left"
            style={{
              marginLeft: "3%",
              marginBottom: "5%",
              fontSize: 14,
              color: "#808080"
            }}
          >
            {tempBookingData.address}
          </h5>

          <Card style={{ marginTop: "2%" }}>
            <CardContent>
              <h4 className="BookingInfoTitle">
                Total Nights: {tempBookingData.numberOfNights}
              </h4>
              <hr />
              <div className=".payment-row">
                <p style={{ fontWeight: "bold" }}>Check-in: </p>
                <p> {tempBookingData.checkIn.format("dddd, MMMM Do YYYY")}</p>
              </div>
              <div className=".payment-row">
                <p style={{ fontWeight: "bold" }}>Check-out: </p>
                <p>{tempBookingData.checkOut.format("dddd, MMMM Do YYYY")}</p>
              </div>
            </CardContent>
          </Card>
          <br />
          <Card style={{ marginTop: "2%" }}>
            <CardContent>
              <h4 className="BookingInfoTitle">Rooms & Charges:</h4>
              <hr />
              <Table className="smallText">
                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    Rooms ({tempBookingData.numRooms} x{" "}
                    {tempBookingData.roomType}, {tempBookingData.numberOfNights}{" "}
                    nights):
                  </TableCell>
                  <TableCell
                    align="right"
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    $ {tempBookingData.subtotal.toFixed(2)}
                  </TableCell>
                </TableRow>
                {discountContainer}
                {rewardsContainer}
                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableBlackBorder}
                  >
                    Taxes and fees ({(tempBookingData.taxRate * 100).toFixed(1)}
                    %):
                  </TableCell>
                  <TableCell
                    align="right"
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableBlackBorder}
                  >
                    $
                    {(
                      (tempBookingData.subtotal -
                        tempBookingData.discounts -
                        this.state.actualRewardsDiscount) *
                      tempBookingData.taxRate
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                    style={{ fontWeight: "600" }}
                  >
                    Total:
                  </TableCell>
                  <TableCell
                    align="right"
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                    style={{ fontWeight: "600" }}
                  >
                    $
                    {(
                      (tempBookingData.subtotal -
                        tempBookingData.discounts -
                        this.state.actualRewardsDiscount) *
                        tempBookingData.taxRate +
                      tempBookingData.subtotal -
                      promotionDiscount -
                      this.state.actualRewardsDiscount
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </Paper>
        <Dialog
          fullWidth={
            width === "md" || width === "lg" || width === "sm" ? true : false
          }
          fullScreen={width === "xs" ? true : false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="BookingInfoTitle">
            Your Rewards Points:
          </DialogTitle>
          <p className="supportTextDialog">
            *A minimum of 10,000 points are required
          </p>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Table className="smallTextDialog">
                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    Rewards Points Balance:
                  </TableCell>
                  <TableCell
                    align="right"
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    {this.state.rewardsPoints} pts.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    Possible Rewards Discount:
                  </TableCell>
                  <TableCell
                    align="right"
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    $ {this.state.possibleRewardsDiscount.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "600" }}
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    Total After Rewards Discount:
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontWeight: "600" }}
                    classes={{
                      root: classes.cellRoot
                    }}
                    className={classes.tableNoBorder}
                  >
                    ${" "}
                    {(
                      (tempBookingData.subtotal -
                        tempBookingData.discounts -
                        this.state.possibleRewardsDiscount) *
                        tempBookingData.taxRate +
                      tempBookingData.subtotal -
                      promotionDiscount -
                      this.state.possibleRewardsDiscount
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              </Table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Got it
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

BookingInfo.PropTypes = {
  getProfileInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bookingData: state.bookingData,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileInfo }
)(withStyles(styles)(withWidth()(BookingInfo)));
