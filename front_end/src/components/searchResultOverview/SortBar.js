import React, { Component } from "react";
import PropTypes from "prop-types";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Grid,
  Typography,
  Card,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

// Component styling
let styles = theme => ({
  sortButton: { textTransform: "none", width: "100%" },
  subtitles: { fontWeight: "bold", color: "#808080" }
});

class SortBar extends Component {
  constructor() {
    super();
    this.state = {
      categoryMenuIsOpen: null,
      orderMenuIsOpen: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(menu, event) {
    event.preventDefault();
    switch (menu) {
      case "category":
        this.setState({
          categoryMenuIsOpen: event.currentTarget
        });
        break;
      case "order":
      default:
        this.setState({
          orderMenuIsOpen: event.currentTarget
        });
    }
  }

  handleClose(menu, event) {
    event.preventDefault();
    switch (menu) {
      case "category":
        this.setState({
          categoryMenuIsOpen: null
        });
        break;
      case "order":
      default:
        this.setState({
          orderMenuIsOpen: null
        });
    }
  }

  render() {
    let {
      classes,
      sortCategory,
      sortOrder,
      handleClickChangeSortCriteria,
      handleClickChangeOrder,
      width
    } = this.props;

    let { categoryMenuIsOpen, orderMenuIsOpen } = this.state;

    let parsedSortCategory = () => {
      switch (sortCategory) {
        case "name":
          return "Name";
        case "price":
          return "Price";
        case "starRating":
          return "Star Rating";
        case "guestRating":
          return "Guest Rating";
        default:
          return "Name";
      }
    };

    let parsedSortOrder = () => {
      switch (sortOrder) {
        case "ascending":
          return "Ascending";
        case "descending":
        default:
          return "Descending";
      }
    };

    return (
      <Card style={{ padding: 10 }} square="false">
        <Grid
          container
          direction="flow"
          justify={isWidthDown("sm", width) ? "center" : "flex-start"}
          alignItems="center"
          spacing={8}
        >
          <Grid item xs={12} md="auto">
            <Grid
              container
              justify={isWidthDown("sm", width) ? "center" : "flex-start"}
            >
              <Grid item>
                <Typography variant="subtitle2" className={classes.subtitles}>
                  Sort By:
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} md="auto">
            <Button
              variant="outlined"
              onClick={event => {
                this.handleClick("category", event);
              }}
              className={classes.sortButton}
            >
              {parsedSortCategory()}{" "}
              {Boolean(categoryMenuIsOpen) == true ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </Button>
            <Menu
              anchorEl={categoryMenuIsOpen}
              open={Boolean(categoryMenuIsOpen)}
              onClose={event => {
                this.handleClose("category", event);
              }}
            >
              <MenuItem
                value={categoryMenuIsOpen}
                onClick={event => {
                  this.handleClose("category", event);
                  handleClickChangeSortCriteria("name", event);
                }}
                className={classes.sortButton}
              >
                Name
              </MenuItem>
              <MenuItem
                onClick={event => {
                  this.handleClose("category", event);
                  handleClickChangeSortCriteria("price", event);
                }}
                className={classes.sortButton}
              >
                Price
              </MenuItem>
              <MenuItem
                onClick={event => {
                  this.handleClose("category", event);
                  handleClickChangeSortCriteria("starRating", event);
                }}
                className={classes.sortButton}
              >
                Star Rating
              </MenuItem>
              <MenuItem
                onClick={event => {
                  this.handleClose("category", event);
                  handleClickChangeSortCriteria("guestRating", event);
                }}
                className={classes.sortButton}
              >
                Guest Rating
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item sm={6} md="auto">
            <Button
              variant="outlined"
              onClick={event => {
                this.handleClick("order", event);
              }}
              className={classes.sortButton}
            >
              {parsedSortOrder()}{" "}
              {orderMenuIsOpen == true ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Menu
              anchorEl={orderMenuIsOpen}
              open={Boolean(orderMenuIsOpen)}
              onClose={event => {
                this.handleClose("order", event);
              }}
            >
              <MenuItem
                onClick={event => {
                  this.handleClose("order", event);
                  handleClickChangeOrder("ascending", event);
                }}
                className={classes.sortButton}
              >
                Ascending
              </MenuItem>
              <MenuItem
                onClick={event => {
                  this.handleClose("order", event);
                  handleClickChangeOrder("descending", event);
                }}
                className={classes.sortButton}
              >
                Descending
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

// Expected props
SortBar.propTypes = {
  classes: PropTypes.object.isRequired,
  sortCategory: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth()(SortBar));
