import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  root: {},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 20,
    top: 0
  },
  selectEmpty: {
    marginTop: theme.spacing.unit
  }
});

class RoomNumber extends React.Component {
  state = {
    rooms: "1",
    name: "hai",
    labelWidth: 0
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    this.props.testRoomFunction(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.props.numberRooms}
            onChange={this.handleChange}
            displayEmpty
            name="rooms"
            className={classes.selectEmpty}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
          <FormHelperText># Rooms</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

RoomNumber.propTypes = {
  // auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // auth: state.auth
});
export default connect(mapStateToProps)(withStyles(styles)(RoomNumber));

// export default connect(mapStateToProps)(RoomNumber);
