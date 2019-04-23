import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { cancelReservation } from "../../actions/bookingActions";
import { Button } from "@material-ui/core/";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";

const styles = {};
class CancellationPrompt extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.onCancelClick = this.onCancelClick.bind(this);
  }
  handleClickOpen = () => {
    console.log("OPEN");
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onCancelClick(bookingInfo) {
    const cancelReservationData = { bookingID: bookingInfo };
    this.props.cancelReservation(cancelReservationData);
    this.setState({ open: false });
    window.location.reload();
  }
  render() {
    const { classes, width, booking } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          CANCEL
        </Button>

        <Dialog
          fullWidth={
            width === "md" || width === "lg" || width === "sm" ? true : false
          }
          fullScreen={width === "xs" ? true : false}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Are you sure you want to cancel?</DialogTitle>
          {new Date(booking).getTime() - new Date().getTime() > 172800000 ? (
            <DialogContent>
              <DialogContent>
                Full refund provided for this cancellation.
              </DialogContent>
              <p className="supportTextDialog">
                *Full refund only when cancellation is greater than 48 hours
                before check in.
              </p>
            </DialogContent>
          ) : (
            <DialogContent>
              <DialogContent>
                Your cancellation will be{" "}
                {(
                  (new Date(booking).getTime() - new Date().getTime()) /
                  1000 /
                  60 /
                  60
                ).toFixed(1)}{" "}
                hours to check in and will NOT be refunded.
              </DialogContent>
              <p className="supportTextDialog">
                * Cancellation within 48 hours of check in time will not be
                refunded.
              </p>
            </DialogContent>
          )}

          <DialogActions>
            <Button
              //   onClick={() => this.onCancelClick(booking.bookingID)}
              color="primary"
            >
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  { cancelReservation }
)(withStyles(styles)(CancellationPrompt));
