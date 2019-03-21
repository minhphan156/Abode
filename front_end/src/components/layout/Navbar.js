import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { submitQuery } from "../../actions/queryActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import AnchorLink from "react-anchor-link-smooth-scroll";

// Material-UI Imports Below
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
  Grid,
  IconButton
} from "@material-ui/core";

let styles = {
  logo: {
    width: 50,
    height: 50
  }
};

class Navbar extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    let { classes } = this.props;

    // Markup shown on the right hand side of Navbar when user is GUEST.
    let guestMarkUp = (
      <Grid item justify="flex-end" spacing={40} sm={4} alignItems="center" container>
        <Grid item>
          <Button variant="text" color="inherit">
            <Link to="/register" style={{color: "white"}}>
              Sign up
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="inherit">
            <Link to="/login" style={{color: "white"}}>
              Login
            </Link>
          </Button>
        </Grid>
      </Grid>
    );
  
    // Markup shown on the right hand side of Navbar when user is LOGGED IN.
    let loggedInMarkup = (
      <Grid item justify="flex-end" spacing={40} sm={4} alignItems="center" container>
        <Grid item>
          <Button variant="text" color="inherit" onClick={this.onLogoutClick}>
            Logout
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="inherit">
            {this.props.auth.user.email}
          </Button>
        </Grid>
      </Grid>
    );

    let inLandingMarkup = (
      <Grid item justify="center" spacing={40} sm={4} alignItems="center" container>
        <Grid item>
          <Button variant="text" color="inherit">
            <AnchorLink href="#topDealsAnchor" offset="-450" style={{color: "white"}}>
              Top Deals
            </AnchorLink>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="inherit">
            <AnchorLink href="#featuredCitiesAnchor" offset="-500" style={{color: "white"}}>
              Featured Cities
            </AnchorLink>
          </Button>
        </Grid>
      </Grid>
    );

    let notInLandingMarkup = (
      <Grid item sm={4} />
    );

    return (
      <AppBar fontFamily="Roboto" position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={12} style={{width: "100%", marginLeft: "5%", marginRight: "5%"}}>
            <Grid item spacing={40} sm={4} alignItems="center" container>
              <Grid item>
                <IconButton>
                  <Link to="/">
                    <img src="logo.png" className={classes.logo}/>
                  </Link>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="title" color="inherit">
                  <Link to="/" style={{color: "white"}}>
                    Abode
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            {this.props.landing.isInLanding == true ? inLandingMarkup : notInLandingMarkup}
            {this.props.auth.isAuthenticated ? loggedInMarkup : guestMarkUp}
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  landing: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  landing: state.landing
})

export default connect(
    mapStateToProps,
    { logoutUser, submitQuery, clearCurrentProfile }
  )(withStyles(styles)(Navbar));

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import { submitQuery } from "../../actions/queryActions";
// import { clearCurrentProfile } from "../../actions/profileActions";

// class Navbar extends Component {
//   constructor() {
//     super();
//     this.state = {
//       query: "",
//       modalShow: false
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSearchClick = this.onSearchClick.bind(this);
//   }

//   onChange(e) {
//     this.setState({ query: e.target.value });
//   }

//   onSearchClick() {
//     //NOTE: we assume user will search for name
//     // submit query as object with to submitQuery at queryActions.js

//     const newQuery = {
//       name: this.state.query
//     };
//     this.props.submitQuery(newQuery);

//     this.setState({ query: "" });
//   }

//   onLogoutClick(e) {
//     e.preventDefault();
//     this.props.clearCurrentProfile();
//     this.props.logoutUser();
//   }

//   render() {
//     let modalClose = () => this.setState({ modalShow: false });

//     const { isAuthenticated, user } = this.props.auth;

//     const authLinks = (
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link className="nav-link" to="/dashboard">
//             {user.name}
//           </Link>
//         </li>
//         <li className="nav-item">
//           <a
//             href="#"
//             onClick={this.onLogoutClick.bind(this)}
//             className="nav-link"
//           >
//             Logout
//           </a>
//         </li>
//       </ul>
//     );

//     const guestLinks = (
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link className="nav-link" to="/register">
//             Sign Up
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/login">
//             Login
//           </Link>
//         </li>
//       </ul>
//     );

//     return (
//       <div>
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//           <div className="container">
//             <Link className="navbar-brand" to="/">
//               Home
//             </Link>

//             <form onSubmit={this.onSearchClick}>
//               <div className="input-group mr-auto">
//                 <input
//                   style={{ height: 36 }}
//                   type="input"
//                   className="form-control"
//                   name="search"
//                   value={this.state.query}
//                   onChange={this.onChange}
//                 />
//                 <div className="input-group-append">
//                   <Link to="/Search">
//                     <button
//                       className="btn btn-outline-secondary"
//                       type="button"
//                       onClick={this.onSearchClick}
//                       type="submit"
//                     >
//                       Search
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </form>

//             {isAuthenticated ? authLinks : guestLinks}
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

// Navbar.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   query: state.query
// });
// // if this.props.query is empty we will not show the Search page

// export default connect(
//   mapStateToProps,
//   { logoutUser, submitQuery, clearCurrentProfile }
// )(Navbar);
