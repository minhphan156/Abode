import React from "react";

// Material UI Imports below
import { withStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

let styles = {
  margin: {
    marginRight: "auto",
    marginLeft: "auto"
  },
  footer: {
    top: "auto",
    bottom: 0,
    height: 140
  }
};

function Footer(props) {
  let { classes } = props;

  return (
    <div>
      <AppBar className={classes.footer}>
        <Toolbar>
          <Typography className={classes.margin} variant="text">
            @Copyright Abode
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Footer);
