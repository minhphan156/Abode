import React, { Component } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCurrentProfile, getHistory } from "../../actions/profileActions";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CancelIcon from "@material-ui/icons/Cancel";
import ExitIcon from "@material-ui/icons/ExitToApp";
import RateReview from "@material-ui/icons/RateReview";

import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import ReactStars from "react-stars";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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
  },
  ReviewButton: {
    borderRadius: 17,
    textTransform: "none",
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 1,
    paddingBottom: 1
  },
  reviewForm: {
    // maxWidth: 500,
    // maxHeight: 500
  }
});

class HistoryOverview extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
    this.handleCloseReviewForm = this.handleCloseReviewForm.bind(this);
    this.handleOpenReviewForm = this.handleOpenReviewForm.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getHistory();
  }
  componentWillMount() {
    this.props.getHistory();
  }

  handleOpenReviewForm() {
    this.setState({ open: true });
  }
  handleCloseReviewForm() {
    this.setState({ open: false });
  }
  render() {
    const { classes, profile } = this.props;
    let bookings;
    let displayChangeChip;
    let displayRegularChip;
    let dateOverview;
    let cancelAndChangeButtons;

    bookings = this.props.profile.history.map(booking => {
      displayChangeChip = null;
      displayRegularChip = null;
      dateOverview = null;
      cancelAndChangeButtons = null;

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
      switch (booking.status) {
        case 1:
          displayRegularChip = (
            <Chip
              label="Coming Up"
              color="secondary"
              className={classes.chip}
              icon={<DoneIcon />}
            />
          );
          cancelAndChangeButtons = (
            <Grid>
              <Button>CHANGE</Button>
              <br />
              <Button>CANCEL</Button>
            </Grid>
          );
          break;
        case 2:
          displayRegularChip = (
            <Chip
              label="Checked In"
              color="primary"
              className={classes.chipCheckin}
              icon={<DoneIcon />}
            />
          );
          break;
        case 3:
          displayRegularChip = (
            <Chip
              label="Checked Out"
              color="primary"
              className={classes.chipCheckout}
              icon={<ExitIcon />}
            />
          );
          break;
        case 4:
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
        // code block
      }

      // these are the expansionpanels for all the different bookings
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleCloseReviewForm}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="true"
            className={classes.reviewForm}
          >
            <DialogTitle id="form-dialog-title">Rate and Review</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ marginBottom: 22 }}>
                Your review will be posted publicly on the web
              </DialogContentText>

              <ReactStars count={5} size={24} color2={"#ffd700"} />
              <Input
                multiline
                placeholder="Share details of your own experience at this hotel"
                style={{ width: 450, marginTop: 13 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseReviewForm} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleCloseReviewForm} color="primary">
                Post
              </Button>
            </DialogActions>
          </Dialog>
          <ExpansionPanel
            classes={{
              expanded: classes.backgroundStyle
            }}
          >
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
                    {booking.destination}
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
                        Total: ${" "}
                        {(booking.subtotal - booking.discount).toFixed(2)}
                      </Grid>
                    </Grid>

                    {displayChangeChip}
                  </Grid>
                </Grid>

                <Grid className="HistoryContainerDates">
                  <Grid item className="HistoryPageDates HistoryContainerDates">
                    {dateOverview}
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item className="HistoryPageTotal">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      Total: ${" "}
                      {(booking.subtotal - booking.discount).toFixed(2)}
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.ReviewButton}
                        onClick={this.handleOpenReviewForm}
                      >
                        <RateReview style={{ fontSize: 16 }} />
                        Review
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid
                container
                spacing={0}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid className="HistoryContainerExpand">
                  <Grid
                    item
                    className="HistoryPageText2 HistoryContainerExpand"
                  >
                    <Table className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Room type:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          {booking.typeOfRoom}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Number of Rooms:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          {booking.numOfRoom}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                </Grid>

                <Grid>
                  <Grid item className="HistoryPageText2">
                    <Table className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Subtotal:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          $ {booking.subtotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Discount:</TableCell>
                        <TableCell align="right">
                          $ {booking.discount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Total:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          $ {(booking.subtotal - booking.discount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
              {cancelAndChangeButtons}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
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
