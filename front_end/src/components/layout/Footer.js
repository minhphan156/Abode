import React from "react";

// Material UI Imports below
import { withStyles, AppBar, Toolbar, Button, Grid } from "@material-ui/core";

let styles = {
  margin: {
    marginRight: "auto",
    marginLeft: "auto"
  },
  footer: {
    top: "auto",
    minheight: 140
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
      <AppBar className={classes.footer}>
        <Toolbar className={classes.footerMargin}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={1}>
              <Button variant="text" color="inherit">
                About Us
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="text" color="inherit">
                Disclaimer
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Footer);
