import React, { Component } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CancelIcon from "@material-ui/icons/Cancel";
import ExitIcon from "@material-ui/icons/ExitToApp";

import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./history.css";

const styles = theme => ({
  table: {
    maxWidth: 330,
    minWidth: 300,
    maxHeight: 50
    // margin: -10
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
  }
});

class HistoryOverview extends Component {
  constructor() {
    super();
    this.state = {
      history_array: [
        {
          img:
            "https://thumbnails.trvl-media.com/G6DYD561zx1K_xvmgckqNQtLGV0=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/480000/476800/476728/bc0ee6ed_z.jpg",
          hotelName: "Paris Las Vegas Hotel and Casino",
          destination: "Las Vegas, NV",
          check_in_date: "3/3/2019",
          check_out_date: "3/5/2019",
          typeOfRoom: "King",
          numOfRoom: 1,
          status: 2,
          changed: false,
          new_check_in_date: null,
          new_check_out_date: null,
          subtotal: 500.0,
          discount: 10
        },
        {
          img:
            "https://thumbnails.trvl-media.com/J1AGkTraZW_d-t9lvAXQlaK_1i8=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/10000/5400/5338/4bfa1037_z.jpg",

          hotelName: "The M San Diego",
          destination: "San Diego, CA",
          check_in_date: "4/6/2019",
          check_out_date: "12/22/2019",
          typeOfRoom: "Double",
          numOfRoom: 2,
          status: 1,
          changed: true,
          new_check_in_date: "4/7/2019",
          new_check_out_date: "4/12/2019",
          subtotal: 200,
          discount: 5
        },
        {
          img:
            "https://thumbnails.trvl-media.com/1rr9dDu6O4nXG3_MmKPxFgNugVQ=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/9000000/8650000/8647200/8647196/d4ba619c_z.jpg",

          hotelName: "Hilton Garden Inn",
          destination: "Miami, FL",

          check_in_date: "1/3/2019",
          check_out_date: "1/7/2019",
          typeOfRoom: "Suite",
          numOfRoom: 1,
          status: 3,
          changed: false,
          new_check_in_date: null,
          new_check_out_date: null,
          subtotal: 150,
          discount: 0
        },
        {
          img:
            "https://thumbnails.trvl-media.com/F-5J99S3Q10DXTi-KcLqt2ASOvI=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/30000/20600/20547/9ebcf481_z.jpg",

          hotelName: "Four Seasons Downtown SF",
          destination: "San Francisco, CA",

          check_in_date: "6/3/2019",
          check_out_date: "6/10/2019",
          typeOfRoom: "King",
          numOfRoom: 1,
          status: 4,
          changed: false,
          new_check_in_date: null,
          new_check_out_date: null,
          subtotal: 100,
          discount: 0
        }
      ]
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.profile.profile) {
    //   const profile = nextProps.profile.profile;
    //   // Set history_array
    //   this.setState({
    //     history_array: profile.history
    //   });
    // }
  }

  render() {
    const { classes } = this.props;
    let bookings;
    let displayChangeChip;
    let displayRegularChip;
    let dateOverview;
    let cancelAndChangeButtons;

    bookings = this.state.history_array.map(booking => {
      displayChangeChip = null;
      displayRegularChip = null;
      dateOverview = null;
      cancelAndChangeButtons = null;

      // if the booking was not changed, we display the regular CheckIn and Checkout Overview
      if (booking.changed === false) {
        displayChangeChip = null;
        dateOverview = (
          <Table className={classes.table}>
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
          <Table className={classes.table}>
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
                {booking.new_check_in_date}
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
        <ExpansionPanel>
          <ExpansionPanelSummary
            className="HistoryMainContainer"
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-evenly"
              // alignItems="baseline"
            >
              <Grid item lg={2}>
                <img
                  className="historyHotelImage"
                  src={booking.img}
                  alt="hotel img"
                />
              </Grid>

              <Grid lg={3}>
                <Grid item className="HistoryPageHotelName">
                  {booking.hotelName}
                </Grid>
                <Grid item className="HistoryPageDestinationName">
                  {booking.destination}
                </Grid>
                <Grid item>
                  <br />
                  {displayRegularChip}
                  {displayChangeChip}
                </Grid>
              </Grid>

              <Grid direction="row">
                <Grid item className="HistoryPageDates">
                  {dateOverview}
                </Grid>
              </Grid>
              <Grid lg={1}>
                <Grid item className="HistoryPageTotal">
                  Total: $ {booking.subtotal - booking.discount}
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="HistoryExpandedContainer">
            <Grid
              container
              spacing={0}
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid>
                <Grid item className="HistoryPageText2">
                  <Table className={classes.table}>
                    <TableRow>
                      <TableCell className={classes.tableNoBorder}>
                        Roomtype:
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
                        $ {booking.subtotal}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Discount:</TableCell>
                      <TableCell align="right">$ {booking.discount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableNoBorder}>
                        Total:
                      </TableCell>
                      <TableCell
                        align="right"
                        className={classes.tableNoBorder}
                      >
                        $ {booking.subtotal - booking.discount}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
              </Grid>
            </Grid>

            {cancelAndChangeButtons}
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

        {bookings}
      </div>
    );
  }
}
HistoryOverview.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withStyles(styles)(HistoryOverview));
