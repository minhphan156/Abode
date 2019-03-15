import React from "react";
import { Link } from "react-router-dom";

// Material UI Imports below
import { withStyles, AppBar, Toolbar, Button, Grid } from "@material-ui/core";

let styles = {
  margin: {
    marginRight: "auto",
    marginLeft: "auto"
  },
  footer: {
    top: "auto",
    minheight: 140,
    marginTop: 50
  },
  footerMargin: {
    marginLeft: 150,
    marginRight: 150
  }
};

function Footer(props) {
  let { classes } = props;

  return (
    <div>
      <AppBar className={classes.footer} position="static">
        <Toolbar className={classes.footerMargin}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={1}>
              <Button variant="text" color="inherit">
                <Link to="/aboutus" style={{color: "white"}}>
                  About Us
                </Link>
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="text" color="inherit">
                <Link to="/disclaimer" style={{color: "white"}}>
                  Disclaimer
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Footer);
