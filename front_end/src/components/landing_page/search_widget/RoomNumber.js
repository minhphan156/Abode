import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Form, Input, FormGroup, Container, Label } from "reactstrap";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 20,
    top: 0,
    left: 12
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

  componentDidMount() {
    this.setState({
      // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.rooms}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default withStyles(styles)(RoomNumber);

// export default connect(mapStateToProps)(RoomNumber);
