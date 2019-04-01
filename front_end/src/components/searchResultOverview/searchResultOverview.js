import React, { Component } from "react";
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import { connect } from "react-redux";
import { getIndividualHotelResult } from "../../actions/searchResultActions";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import PropTypes from "prop-types";

// Child Component Imports
import FiltersWindow from "./FiltersWindow.js";
import SortBar from "./SortBar.js";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TablePagination
} from "@material-ui/core";
import { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

let styles = theme => ({
  pageMargins: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: "2%",
      marginBottom: "2%"
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "10%",
      marginRight: "10%",
      marginTop: "1%",
      marginBottom: "1%"
    }
  },
  subtitles: { fontWeight: "bold", color: "#808080" },
  imageStyle: { margin: 20, width: 200, height: 200, float: "left" },
  sortButton: { width: "100%", boxShadow: "none" }
});

class searchResultOverview extends Component {
  constructor() {
    super();

    this.state = {
      // State used to determine the criteria of which the search results are sorted by.
      sortCategory: "name",
      sortOrder: "descending"
    };

    this.handleClickChangeSortCriteria = this.handleClickChangeSortCriteria.bind(
      this
    );
    this.handleClickChangeOrder = this.handleClickChangeOrder.bind(this);
  }

  // Used to change the sort criteria
  handleClickChangeSortCriteria(category, event) {
    event.preventDefault();
    this.setState({
      sortCategory: category
    });
  }

  // Used to change the order of results shown
  handleClickChangeOrder(order, event) {
    event.preventDefault();
    this.setState({
      sortOrder: order
    });
  }

  render() {
    let { classes, width } = this.props;
    let { hotelQuery, searchQuery } = this.props.query;

    let hotels;

    if (hotelQuery.length) {
      hotels = hotelQuery.map(hotel => {
        return (
          <Card style={{ marginBottom: 10 }} square="false">
            <CardContent>
              <div>
                <Link
                  to="/indiv-hotel"
                  onClick={event => {
                    event.preventDefault();
                    this.props.getIndividualHotelResult({
                      id: hotel.hotelID,
                      checkIn: searchQuery.checkIn,
                      checkOut: searchQuery.checkOut,
                      numberRooms: searchQuery.numberRooms
                    });
                  }}
                >
                  <div className="row">
                    <div className="col-10" style={{ align: "left" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ display: "inline" }}
                      >
                        {hotel.name}
                      </Typography>
                    </div>
                    <div className="col-2" style={{ align: "right" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h5"
                        style={{ color: "green", display: "inline" }}
                        align="right"
                      >
                        ${hotel.price}
                      </Typography>
                    </div>
                  </div>
                </Link>

                <Typography
                  style={{
                    color: "#808080",
                    marginLeft: "1%",
                    marginTop: "1%"
                  }}
                  component="h3"
                >
                  {hotel.city}
                </Typography>
              </div>
            </CardContent>
            <div style={{ float: "left" }}>
              <CardMedia
                className={classes.imageStyle}
                image={`${hotel.img}`}
                title="Hotel Image"
              />
            </div>
            <div style={{ float: "right" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ marginRight: "0" }}
                >
                  <h5>{hotel.star_rates}-Star Hotel</h5>
                  <ReactStars
                    count={5}
                    value={hotel.star_rates}
                    size={22}
                    edit={false}
                    color2={"#FFD700"}
                    style={{ align: "right" }}
                  />
                </Typography>

                <Typography variant="h5" component="h5">
                  Guest Rating: {hotel.guest_rate}
                </Typography>

                <Link
                  to="/indiv-hotel"
                  onClick={() =>
                    this.props.getIndividualHotelResult({
                      id: hotel.hotelID,
                      checkIn: searchQuery.checkIn,
                      checkOut: searchQuery.checkOut,
                      numberRooms: searchQuery.numberRooms
                    })
                  }
                >
                  <button type="button" class="btn btn-success h-100">
                    Book Now
                  </button>
                </Link>
              </CardContent>
            </div>
          </Card>
        );
      });
    }

    let pagination = (
      <Grid item>
        <TablePagination
          style={{ float: "right" }}
          rowsPerPageOptions={[5, 10, 25]}
          count={100}
          page={9}
          rowsPerPage={10}
        />
      </Grid>
    );

    return (
      <div className={classes.pageMargins}>
        <SearchWidget />
        <Grid container direction="flow" spacing={8}>
          <FiltersWindow /> {/* xs={12} md={2} */}
          <Grid item xs={12} md="auto" direction="column" spacing={0}>
            <SortBar
              sortCategory={this.state.sortCategory}
              sortOrder={this.state.sortOrder}
              handleClickChangeSortCriteria={this.handleClickChangeSortCriteria}
              handleClickChangeOrder={this.handleClickChangeOrder}
            />
            <Grid item direction="flow">
              {hotels}
            </Grid>
            {hotelQuery.length ? pagination : <div />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

searchResultOverview.propTypes = {
  query: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(
  mapStateToProps,
  { getIndividualHotelResult }
)(withStyles(styles)(withWidth()(searchResultOverview)));
