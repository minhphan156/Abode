import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./disclaimer.css";
import SJSU from "../../images/SJSU.png";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default (class disclaimer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid id="DisclaimerContainerTitle" item xs={12}>
            Disclaimer
          </Grid>
          <img className="SJSU-icon" src={SJSU} alt="" />

          <Grid item id="DisclaimerContainerText" item xs={12}>
            <Paper>
              <Typography component="h5" variant="display1">
                Paper can be used to build surface or other elements for your
                application. jvnberij vrvuierhvu erhvuhrv uhreuhv uerhvu
                ihruhvuhvruhv vjbn ejvfk cvbwivwiebvubwuibvuebubvwuibvuv vb
                iuewbvewvbwevbevbew' vbehwbvwebvlewhbvewbvewhbvewh
                vjewbvewvh;bewbvwe vbiubvibvuewbvuN
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
});

const mapStateToProps = state => ({});
