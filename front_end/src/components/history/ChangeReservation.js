import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { changeReservation } from "../../actions/bookingActions";
import { Button } from "@material-ui/core/";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CalendarPicker from "../landing_page/search_widget/CalendarPicker";
import "./history.css";

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
      newPrice: null
    };
    this.onChangeClick = this.onChangeClick.bind(this);
    this.onHandleDate = this.onHandleDate.bind(this);
  }
  handleChangeClickOpen = event => {
    event.stopPropagation();
    this.setState({ openChangeDialog: true });
  };
  handleChangeClose = event => {
    event.stopPropagation();
    this.setState({ openChangeDialog: false });
  };
  onChangeClick(bookingID) {
    const changeReservationData = {
      bookingID: bookingID,
      newCheckIn: this.state.newCheckIn,
      newCheckOut: this.state.newCheckOut
    };
    this.props.changeReservation(changeReservationData);
    this.setState({ openChangeDialog: false });
    window.location.reload();
  }
  onHandleDate(startingDate, endingDate) {
    this.setState({ newCheckIn: startingDate });
    this.setState({ newCheckOut: endingDate });
  }
  render() {
    const { classes, width, checkInTime, checkOutTime, id, hotel } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleChangeClickOpen}
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          CHANGE
        </Button>
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

          <div class="centerChangeReservation">
            <DialogTitle>Select dates to change your reservation.</DialogTitle>
            <DialogContent>
              {hotel}
              <br /> <br />
              Current Check In: {checkInTime.toDateString()} <br /> <br />
              Current Check Out: {checkOutTime.toDateString()} <br /> <br />
            </DialogContent>
            <p>
              Select the new start and end dates for changing your reservation.
            </p>
            <CalendarPicker
              class="centerChangeReservation"
              checkIn={this.state.newCheckIn}
              checkOut={this.state.newCheckOut}
              onHandleDate={this.onHandleDate}
            />
            <DialogActions>
              {this.state.newCheckIn == null ||
              this.state.newCheckOut == null ? null : (
                <Button
                  onClick={() => this.onChangeClick(id)}
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
          </div>
          <div class="centerChangeReservation" />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { changeReservation }
)(withStyles(styles)(ChangeReservation));
