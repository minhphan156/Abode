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

// Test imports
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
    let { classes, width } = this.props;
    let { hotelQuery, searchQuery } = this.props.query;

    let hotels;
    if (hotelQuery.length > 0) {
      hotels = hotelQuery.map(hotel => {
        return (
          <Grid item>
            <Card style={{ padding: 25 }} square="false">
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
                <Grid item xs="auto">
                  <Button variant="contained" color="primary">
                    Book Now
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        );
      });
    } else {
      hotels = <CircularProgress color="primary" />;
    }

    /*
      onClick={event => {
        event.preventDefault();
        this.props.getIndividualHotelResult({
          id: hotel.hotelID,
          checkIn: searchQuery.checkIn,
          checkOut: searchQuery.checkOut,
          numberRooms: searchQuery.numberRooms
        });
      }}
    */

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

/*
<Grid item>
  <Card style={{ padding: 25 }} square="false">
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
                        isWidthDown("sm", width) ? "center" : "flex-start"
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
                        <Typography variant="subtitle2" color="default">
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
      <Grid item xs="auto">
        <Button variant="contained" color="primary">
          Book Now
        </Button>
      </Grid>
    </Grid>
  </Card>
</Grid>
*/
