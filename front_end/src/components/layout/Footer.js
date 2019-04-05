import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

function Footer() {
  return (
    <footer id="footer">
      <Grid container alignItems="center" justify="space-evenly">
        <Grid container lg={7} alignItems="center" justify="space-evenly">
          <Grid className="footerLayout" item>
            <Link to="/aboutus" className="footerMenuLink">
              About Us
            </Link>
          </Grid>
          <Grid className="footerLayout" item>
            <Link to="/disclaimer" className="footerMenuLink">
              Disclaimer
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
