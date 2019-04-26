import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { submitReview } from "../../actions/reviewActions";
import { Button, Input } from "@material-ui/core/";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core/";
import { Check, RateReview } from "@material-ui/icons/";
import { isWidthDown } from "@material-ui/core/withWidth";
import ReactStars from "react-stars";
import withWidth from "@material-ui/core/withWidth";

const styles = {};
class ReviewRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      starReview: 0,
      comment: ""
    };
    this.handleCloseReviewForm = this.handleCloseReviewForm.bind(this);
    this.handleOpenReviewForm = this.handleOpenReviewForm.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.handleReviewInput = this.handleReviewInput.bind(this);
    this.handleCancelReview = this.handleCancelReview.bind(this);
  }
  componentWillMount() {
    this.setState({
      starReview: this.props.booking.starReview,
      comment: this.props.booking.comment
    });
  }
  handleCancelReview(event) {
    event.stopPropagation();

    this.setState({ open: false });
  }

  handleOpenReviewForm(event) {
    event.stopPropagation();

    this.setState({ open: true });
  }

  handleCloseReviewForm(event, bookingID) {
    event.stopPropagation();

    this.setState({ open: false });
    const reviewData = {
      bookingID: bookingID,
      starRating: this.state.starReview,
      comment: this.state.comment
    };
    this.props.submitReview(reviewData);
  }

  handleReviewInput(event) {
    this.setState({
      comment: event.target.value
    });
  }

  ratingChanged(newRating) {
    this.setState({
      starReview: newRating
    });
  }

  render() {
    const width = this.props.width;
    const { classes, booking } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancelReview}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth="true"
        >
          <DialogTitle
            id="form-dialog-title"
            style={{
              background: "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
            }}
          >
            <div style={{ color: "white" }}>Rate and Review</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: 10, marginTop: 22 }}>
              {isWidthDown("xs", width)
                ? "This is a public review" // render this if it is opened on a phone
                : "Your review will be posted publicly on the web"}
            </DialogContentText>

            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={this.state.starReview}
              onChange={this.ratingChanged}
            />
            <div>
              <Input
                multiline
                placeholder={
                  isWidthDown("xs", width)
                    ? "" // render this if it is opened on a phone
                    : "Share details of your own experience at this hotel"
                }
                style={{
                  width: isWidthDown("xs", width) ? 232 : 450,
                  marginTop: 13
                }}
                value={this.state.comment}
                onChange={this.handleReviewInput}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleCancelReview}>
              Cancel
            </Button>
            <Button
              onClick={event =>
                this.handleCloseReviewForm(event, booking.bookingID)
              }
              color="primary"
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>

        {booking.comment === "" && booking.starReview === 0 ? ( // if reviews were left, change to ReviewedButton
          <Button
            variant="contained"
            size="small"
            className={this.props.ReviewButtonStyle}
            onClick={this.handleOpenReviewForm}
          >
            <RateReview style={{ fontSize: 16 }} />
            Review
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            className={this.props.ReviewedButtonStyle}
            onClick={this.handleOpenReviewForm}
          >
            <Check style={{ fontSize: 16 }} />
            Reviewed
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { submitReview }
)(withStyles(styles)(withWidth()(ReviewRating)));
