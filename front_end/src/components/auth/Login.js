import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Paper from "@material-ui/core/Paper";
import AbodeLogo from "../../images/logo.png";
import "./auth.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount = () => {
    // during logged in , if we change url to login it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      // this.state.errors = this.props.errors
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <Grid
        container
        className="AuthContainerLogin"
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className="AuthPaperLogin">
          <Grid item className="AuthTitle">
            Log In
          </Grid>
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img className="loginLogo" src={AbodeLogo} alt="" />

            <br />
            <br />
            <Grid className="AuthTextFields">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

Login.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
