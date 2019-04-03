import React from "react";
import PropTypes from "prop-types";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Grid,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

// Component styling
let styles = theme => ({
  sortButton: { width: "100%" },
  subtitles: { fontWeight: "bold", color: "#808080" }
});

let SortBar = props => {
  let { classes, width, handleChange, sortCategory, sortOrder } = props;

  return (
    <Grid item xs={12} md="auto">
      <Card style={{ padding: 10, width: "auto" }} square="false">
        <Grid
          container
          spacing={16}
          direction="flow"
          justify={isWidthDown("sm", width) ? "center" : "flex-start"}
          alignItems="center"
        >
          <Grid item xs={12} md="auto">
            <Typography variant="subtitle2" className={classes.subtitles}>
              Sort By:
            </Typography>
          </Grid>
          <Grid item xs={6} md="auto">
            <InputLabel>Category</InputLabel>
            <Select
              style={{ width: "100%" }}
              name="sortCategory"
              value={sortCategory}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"price"}>Price</MenuItem>
              <MenuItem value={"star_rating"}>Star Rating</MenuItem>
              <MenuItem value={"guest_rating"}>Guest Rating</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4} md="auto">
            <InputLabel>Order</InputLabel>
            <Select
              style={{ width: "100%" }}
              value={sortOrder}
              onChange={handleChange}
              displayEmpty
              name="sortOrder"
            >
              <MenuItem value={"descending"}>
                <ArrowDownward />
              </MenuItem>
              <MenuItem value={"ascending"}>
                <ArrowUpward />
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

// Expected props
SortBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.func.isRequied,
  sortCategory: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(SortBar));
