import React from "react";
import PropTypes from "prop-types";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Grid,
  Typography,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Hidden
} from "@material-ui/core";
import {
  ArrowDownward,
  ArrowUpward,
  Sort,
  ExpandMore
} from "@material-ui/icons";

// Component CSS to Javascript styles
let styles = theme => ({
  marPadSummary: {
    paddingLeft: 25,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 25,
    margin: 0
  },
  mar0: {
    margin: 0
  },
  sortButton: { width: "100%" },
  subtitles: { fontWeight: "bold", color: "#808080" }
});

let SortBar = props => {
  let { classes, width, handleChange, sortCategory, sortOrder } = props;

  return (
    <ExpansionPanel defaultExpanded={false} square="false">
      <ExpansionPanelSummary
        className={classes.mar0}
        expandIcon={<ExpandMore />}
      >
        <Typography variant="subtitle2" className={classes.subtitles}>
          <Sort /> Sort By
        </Typography>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className={classes.marPadSummary}>
        <Grid
          container
          spacing={16}
          direction="flow"
          justify={width == "xs" ? "center" : "flex-start"}
          alignItems="center"
        >
          <Grid item xs={6} sm="auto">
            <InputLabel>Category</InputLabel>
            <Select
              name="sortCategory"
              style={{ width: "100%" }}
              variant="standard"
              value={sortCategory}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value={null}>---</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"price"}>Price</MenuItem>
              <MenuItem value={"star"}>Star Rating</MenuItem>
              <MenuItem value={"hdc_rating"}>Guest Rating</MenuItem>
            </Select>
          </Grid>
          <Hidden xlDown={sortCategory == null ? true : false}>
            <Grid item xs={4} sm="auto">
              <InputLabel>Order</InputLabel>
              <Select
                name="sortOrder"
                style={{ width: "100%" }}
                variant="standard"
                value={sortOrder}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value={"descending"}>
                  <ArrowDownward fontSize="small" />
                </MenuItem>
                <MenuItem value={"ascending"}>
                  <ArrowUpward fontSize="small" />
                </MenuItem>
              </Select>
            </Grid>
          </Hidden>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

// Expected props
SortBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired,
  sortCategory: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(SortBar));
