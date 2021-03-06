import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; // to route to other pages
import { connect } from "react-redux"; // use this to connect react component to redux
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AbodeLogo from "../../images/logo.png";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "", //for inputing password again
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    // during logged in , if we change url to register it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    window.scrollTo(0, 0);
  };

  componentWillReceiveProps = nextProps => {
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

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history); // second para to route to other page
  }
  //NOTE: component dispatch -> action give new data to -> reducer update new state and pass as props to -> component
  render() {
    const { errors } = this.state;
    let paperSize;

    if (Object.keys(errors).length == 0) {
      paperSize = "AuthPaperSignUp";
    } else {
      paperSize = "AuthPaperSignUpError";
    }
    return (
      <Grid
        container
        className="AuthContainerSignUp"
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className={paperSize}>
          <Grid item className="AuthTitle">
            Sign Up
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
            <Grid className="AuthTextFields">
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.firstname}
                />

                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                />

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

                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </Grid>
            <br />
            <Link to="/login" className="linkToOhter">
              already have an account?
            </Link>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

// map props to PropTypes for type checking
Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // 'state.auth' is from reducers/index.js
  // we then can do: this.props.auth
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register)); // withRouter to route to other page
