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

// PROTOTYPE IMPORTS
import LV from "./hotel-img-5.jpg";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Grid,
  Card,
  Button,
  Typography,
  TablePagination,
  CircularProgress
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";

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
  pad25: { padding: 25 }
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
      pet_friendly: false,

      // State used for pagination
      page: 0
    };

    // Methods passed to child components
    this.handleChange = this.handleChange.bind(this);
    this.handleStarRatings = this.handleStarRatings.bind(this);
    this.handleGuestRatings = this.handleGuestRatings.bind(this);
    this.handleAmenities = this.handleAmenities.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleClickToHotel = this.handleClickToHotel.bind(this);
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
  handleGuestRatings = (event, value) => {
    event.preventDefault();
    this.setState({
      guest_rate: value
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

  handleClickToHotel = hotel => event => {
    event.preventDefault();
    /*
    // TODO: Update action call upon merging with backend
    this.props.getIndividualHotelResult({
      id: hotel.hotelID,
      checkIn: searchQuery.checkIn,
      checkOut: searchQuery.checkOut,
      numberRooms: searchQuery.numberRooms
    });
    */
  };

  render() {
    let { star_rate, guest_rate, price_low, price_high, page } = this.state;
    let { classes, width } = this.props;
    let { hotelQuery } = this.props.query;

    let hotels;
    if (true) {
      hotels = (
      <Grid item>
        <Card className={classes.pad25} square="false">
          <Grid
            container
            direction="flow"
            justify={isWidthDown("sm", width) ? "center" : "flex-start"}
            alignItems="center"
            spacing={8}
          >
            <Grid item xs={12} md>
              <Grid container direction="column" spacing={0}>
                <Grid item>
                  <Typography variant="h5" color="primary">
                    Mandalay Bay Resort And Casino
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" color="secondary">
                    Las Vegas, Nevada
                  </Typography>
                </Grid>
                <Grid item style={{ paddingTop: 8 }}>
                  <Grid container direction="flow" spacing={16}>
                    <Grid item xs={12} md={4} lg={3}>
                      <Card style={{ padding: 7 }}>
                        <img src={LV} />
                      </Card>
                    </Grid>
                    <Grid item xs={12} md="auto">
                      <Grid
                        container
                        direction="column"
                        justify={
                          isWidthDown("sm", width) ? "center" : "flex-start"
                        }
                        alignItems={
                          isWidthDown("sm", width) ? "center" : "flex-start"
                        }
                        spacing={0}
                      >
                        <Grid item xs={12} md="auto">
                          <Grid
                            container
                            direction="flow"
                            justify={
                              isWidthDown("sm", width)
                                ? "center"
                                : "flex-start"
                            }
                            alignItems="center"
                            spacing={8}
                          >
                            <Grid item>
                              <ReactStars
                                value={4}
                                count={5}
                                size={32}
                                color2={"#ffd700"}
                                edit={false}
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="subtitle2"
                                color="default"
                              >
                                4 out of 5 Star Rating
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" color="default">
                            Fabulous! 8.9 Guest Rating
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="auto" style={{height: "100%"}}>
              <Grid container className="border" direction="column">
                <Grid item>
                  <Typography variant="h5">
                    $500
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClickToHotel(hotels)}
                  >
                    Book Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      );
    }

    let pagination = (
      <Grid item>
        <TablePagination
          style={{ float: "right" }}
          rowsPerPageOptions={[5, 10, 25]}
          count={100}
          page={page}
          rowsPerPage={10}
        />
      </Grid>
    );

    return (
      <div className={classes.pageMargins}>
        <SearchWidget
          sortObject={{
            sortCategory: this.state.sortCategory,
            sortOrder: this.state.sortOrder
          }}
          filterObject={{
            star_rate: this.state.star_rate,
            guest_rate: this.state.guest_rate,
            price_low: this.state.price_low,
            price_high: this.state.price_high,
            free_wifi: this.state.free_wifi,
            free_parking: this.state.free_parking,
            free_breakfast: this.state.free_breakfast,
            pool: this.state.pool,
            pet_friendly: this.state.pet_friendly
          }}
        />
        <Grid container direction="flow" spacing={8}>
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
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Grid container direction="flow" justify="center" spacing={8}>
              <Grid item xs={12}>
                <SortBar
                  sortCategory={this.state.sortCategory}
                  sortOrder={this.state.sortOrder}
                  handleChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={8}>
                  {/* TODO: Show Spinner when fetching from backend*/}
                  {hotels}
                </Grid>
              </Grid>
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
