import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default (class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, anchorEl: null };
    this.logoutUser = this.logoutUser.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logoutUser(e) {
    this.handleClose();
    this.props.onLogoutClick(e);
  }

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
          <MenuItem>{this.props.userEmail}</MenuItem>

          <Link to="/history" className="navbarMenuButtons">
            <MenuItem onClick={this.handleClose}>Booking History</MenuItem>
          </Link>
          <Link to="/rewards" className="navbarMenuButtons">
            <MenuItem onClick={this.handleClose}>Reward Points</MenuItem>
          </Link>
          <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
});
