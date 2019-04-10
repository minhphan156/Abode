import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Spinner from "../common/Spinner";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CancelIcon from "@material-ui/icons/Cancel";
import ExitIcon from "@material-ui/icons/ExitToApp";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import notFound from "./not_found.png"

import "../history/history.css";

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



class HistorySearch extends Component {
  constructor() {
    super();
    this.state = {
      boID:"",
      boEmail:"",
      mockID:"123",
      mockEmail:"123@gmail.com",
      firstFlag:true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchClick(){
    this.setState({firstFlag:false});
    // const newQuery = {
    //   bookingID: this.state.bookingID,
    //   email: this.state.email
    // };
    // this.props.submitQuery(newQuery);
    // this.props.saveQuery(newQuery);
  };

  handleChange = ({target:{name,value}}) => {
    this.setState({
      [name]:value
    });
  };


  render() {
    const { classes, searchHistoryData } = this.props;
    let bookings;
    let displayChangeChip;
    let displayRegularChip;
    let dateOverview;
    let cancelAndChangeButtons;

    bookings = searchHistoryData.booking.history.map(booking => {
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
        <ExpansionPanel
          classes={{
            expanded: classes.backgroundStyle
          }}
        >
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
                  Total: $ {(booking.subtotal - booking.discount).toFixed(2)}
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
                <Grid item className="HistoryPageText2 HistoryContainerExpand">
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
      );
    });

    return (
      <div
        id="whole page"
        style={{ marginTop: "2%", minHeight:window.innerHeight-223}}
      >
        <h1 className="text-center"
          style={{ color: '#3d4e96', marginTop: '45px' }}
        >Search Travel History</h1>

        <div style={{marginTop:'45px'}}>
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
              <label class="sr-only" for="inlineFormInputName2">BookingID</label>
              <small id="enterBookingID" 
                   class="form-text text-muted"
              >Please enter your Booking ID.
              </small>
              <input type="text"
                    name="boID"
                    value={this.state.boID}  
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Enter Booking ID" 
                    onChange={this.handleChange}/>
            </div>
            <div className='col'>
              <label class="sr-only" for="inlineFormInputName2">Email</label>
              <small id="enterEmail" 
                      class="form-text text-muted"
               >Please enter your Last Name or your email.
               </small>
              <input type="text"
                     name="boEmail"
                     value={this.state.boEmail}
                     className="form-control mb-2 mr-sm-2"
                     placeholder="Enter Your Email or Last Name" 
                     onChange= {this.handleChange}/>
            </div>
            <div className='col'>
              <Button type="submit" 
                      class="buttonSearch" 
                      style={{marginTop:'4%'}}
                      primary onClick={this.onSearchClick}>
                SEARCH
              </Button>
            </div>
          </div>
        </div>
        <div>
          {console.log(searchHistoryData.booking.bookingID)}
          {console.log(this.state)}
          {searchHistoryData.booking.bookingID === this.state.boID &&
           searchHistoryData.booking.email === this.state.boEmail ? (
            <div style={{marginTop:'2%'}}>
              { bookings }
              <br /> <br />
            </div>
            ):( this.state.firstFlag ?(
              null
            ):(
              <div className="row text-center">
              <div className="text-right col-7" 
                   style={{marginTop:'9%', color: '#3d4e96'}}
              >
                <h1> Sorry, we didn't find your reservation... </h1>
                <h4> Verify your information and try agin. </h4>
                <h4 className="inline" 
                    style={{display:'inline'}}
                > If you are an Abode Member, please  </h4>
                <a href="/login" 
                    className="inline" 
                    style={{fontSize:40, color:'#a0cdfd', display:'inline'}}
                > Login </a>
              </div>
              <div className="col-5 text-left">
                <img className="rounded float-left" 
                     src={ notFound } 
                     alt="Not Found Img" 
                     style={{marginTop:'7%', height:'60%', width:'40%'}}
                ></img>
              </div>
              </div>
            )
            )}
        </div>
      </div>
        );
    }
  }
  
const mapStateToProps = state => ({
  searchHistoryData: state.searchHistoryData
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(HistorySearch));