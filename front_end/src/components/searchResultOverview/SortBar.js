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
  Select,
  MenuItem
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";

// Component styling
let styles = theme => ({
  sortButton: { textTransform: "none", width: "100%" },
  subtitles: { fontWeight: "bold", color: "#808080" }
});

let SortBar = props => {
  let { classes, width, handleChange, sortCategory, sortOrder } = props;

  return (
    <Grid item>
      <Card style={{ padding: 10, width: "auto" }} square="false">
        <Grid
          container
          spacing={8}
          xs={12}
          md="auto"
          direction="flow"
          justify={isWidthDown("sm", width) ? "center" : "flex-start"}
          alignItems="center"
        >
          <Grid item xs={12} md="auto">
            <Typography variant="subtitle2" className={classes.subtitles}>
              Sort By:
            </Typography>
          </Grid>
          <Grid item md="auto">
            <FormControl>
              <Select
                value={sortCategory}
                onChange={handleChange}
                displayEmpty
                name="sortCategory"
              >
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"price"}>Price</MenuItem>
                <MenuItem value={"star_rating"}>Star Rating</MenuItem>
                <MenuItem value={"guest_rating"}>Guest Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md="auto">
            <FormControl>
              <Select
                value={sortOrder}
                onChange={handleChange}
                displayEmpty
                name="sortOrder"
              >
                <MenuItem value={"descending"}>Descending</MenuItem>
                <MenuItem value={"ascending"}>Ascending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

// Expected props
SortBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequied,
  sortCategory: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(SortBar));
