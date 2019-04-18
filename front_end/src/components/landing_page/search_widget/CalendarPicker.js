import React, { Component } from "react";
import { withStyles, withWidth } from "@material-ui/core";
import PropTypes from "prop-types";

import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "./CalendarStyleOverride.css";

import { DateRangePicker, DayPickerRangeController } from "react-dates";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  supportText: {
    top: -10
  }
});

class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
      name: "hai",
      labelWidth: 10
    };
  }

  render() {
    const { classes, width } = this.props;

    return (
      <div className={classes.root}>
        <DateRangePicker
          startDatePlaceholderText={"Check In"}
          endDatePlaceholderText={"Check Out"}
          withFullScreenPortal={
            width == "xs" && !this.props.dealPage ? true : false
          }
          numberOfMonths={
            width == "xs" || width == "sm" || width == "md" ? 1 : 2
          }
          showDefaultInputIcon={width == "xs" ? false : true}
          keepOpenOnDateSelect={true}
          startDate={this.props.checkIn}
          startDateId="your_unique_start_date_id"
          endDate={this.props.checkOut}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => (
            this.setState({ startDate, endDate }),
            this.props.onHandleDate(startDate, endDate)
          )}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          noBorder={true}
        />
      </div>
    );
  }
}

// Expected props
CalendarPicker.propTypes = {
  width: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(CalendarPicker));
