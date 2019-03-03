import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { submitQuery } from "../../actions/queryActions";
import { clearCurrentProfile } from "../../actions/profileActions";

// Material-UI Imports Below
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

let styles = {
  normalLink: {
    marginLeft: 15,
    marginRight: 15
  },
  leftMostLogo: {
    marginLeft: 150, // Margin size
    marginRight: 15,
    width: 50,
    height: 50
  },
  beforeSeperation: {
    marginLeft: 15,
    marginRight: "auto"
  },
  afterSeperation: {
    marginRight: 15
  },
  rightMost: {
    marginLeft: 15,
    marginRight: 150
  }
};

function Navbar(props) {
  let { classes } = props;
  return (
    <div>
      <AppBar fontFamily="Roboto" position="fixed">
        <Toolbar>
          <img src="logo.png" className={classes.leftMostLogo} />
          <Typography
            variant="title"
            color="inherit"
            className={classes.normalLink}
          >
            Abode
          </Typography>
          <Button variant="text" color="inherit">
            Deals of the Week
          </Button>
          <Button
            className={classes.beforeSeperation}
            variant="text"
            color="inherit"
          >
            Popular Cities
          </Button>
          <Button
            className={classes.afterSeperation}
            variant="text"
            color="inherit"
          >
            Sign up
          </Button>
          <Button className={classes.rightMost} variant="text" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);

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
