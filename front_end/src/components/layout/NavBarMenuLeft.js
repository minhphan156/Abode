import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default (class NavBarMenuLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {/* Hi, Minh! */}
          <MenuIcon className="menuBurger" />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <Link to="/register">
            <MenuItem onClick={this.handleClose}>Sign Up</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem onClick={this.handleClose}>Login</MenuItem>
          </Link>
          <Link
            to="/booking-not-logged-in"
            offset="-550"
            style={{ color: "white" }}
          >
            <MenuItem onClick={this.handleClose}>Check Booking</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
});
