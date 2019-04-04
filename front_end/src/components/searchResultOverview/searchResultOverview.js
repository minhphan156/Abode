import React, { Component } from "react";
import { connect } from "react-redux";
import { getIndividualHotelResult } from "../../actions/searchResultActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Additional libraries
import ReactStars from "react-stars";

// Child Component Imports
import SearchWidget from "../landing_page/search_widget/SearchWidget";
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

// Component CSS to Javascript styles
let styles = theme => ({
  pageMargins: {
    // Mobile margins
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: "2%",
      marginBottom: "2%"
    },
    // Tablet, laptop, desktop margins
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

// Main component of the Search Result Overview Page
class searchResultOverview extends Component {
  constructor() {
    super();

    this.state = {
      // States used for sorting
      sortCategory: "name",
      sortOrder: "descending",

      // States used for filter
      star_rate: 0,
      guest_rate: 0,
      price_low: 0,
      price_high: 0,
      free_wifi: false,
      free_parking: false,
      free_breakfast: false,
      pool: false,
      pet_friendly: false
    };

    // Methods passed to child components
    this.handleChange = this.handleChange.bind(this);
    this.handleStarRatings = this.handleStarRatings.bind(this);
    this.handleGuestRatings = this.handleGuestRatings.bind(this);
    this.handleAmenities = this.handleAmenities.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
  }

  // Used to force user browser to scroll to top of page upon mounting this component
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  // Used to store the star rating input in <FiltersWindow />
  handleStarRatings = newRating => {
    this.setState({
      star_rate: newRating
    });
  };

  // Used to store the star rating input in <FiltersWindow />
  handleGuestRatings = newRating => {
    this.setState({
      guest_rate: newRating
    });
  };

  // Used to store the amenities input in <FiltersWindow />
  handleAmenities = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  // Used to store the inputs from price range fields in <FiltersWindow />
  handlePriceRangeChange = name => event => {
    this.setState({
      [name]: Number(event.target.value)
    });
  };

  // Used to store the inputs from selections felds in <SortBar />
  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: [event.target.value]
    });
  };

  render() {
    let { star_rate, guest_rate, price_low, price_high } = this.state;
    let { classes } = this.props;
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
          {/* xs={12} sm={4} md={3} lg={2} */}
          <FiltersWindow
            star_rate={star_rate}
            guest_rate={guest_rate}
            price_low={price_low}
            price_high={price_high}
            handleAmenities={this.handleAmenities}
            handleStarRatings={this.handleStarRatings}
            handleGuestRatings={this.handleGuestRatings}
            handlePriceRangeChange={this.handlePriceRangeChange}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            lg={10}
            direction="column"
            spacing={8}
          >
            <SortBar
              sortCategory={this.state.sortCategory}
              sortOrder={this.state.sortOrder}
              handleChange={this.handleChange}
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
  query: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(
  mapStateToProps,
  { getIndividualHotelResult }
)(withStyles(styles)(withWidth()(searchResultOverview)));
