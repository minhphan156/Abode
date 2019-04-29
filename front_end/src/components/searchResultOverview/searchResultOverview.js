import React, { Component } from "react";
import { connect } from "react-redux";
import { getIndividualHotelResult } from "../../actions/searchResultActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { submitQuery, saveQuery } from "../../actions/searchActions";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { clearData } from "../../actions/searchResultActions";
// Additional libraries
import ReactStars from "react-stars";

// Child Component Imports
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import FiltersWindow from "./FiltersWindow.js";
import SortBar from "./SortBar.js";
import "./searchResultOverview.css";
// Material UI Imports
import {
  Grid,
  Card,
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  withStyles,
  withWidth,
  Divider,
  CircularProgress
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import {
  Search,
  ExpandMore,
  NavigateNext,
  NavigateBefore
} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  pad25: { padding: 25 },
  msgHeight: { height: "25vh" },
  subtitles: { fontWeight: "bold", color: "#808080" },
  root: {
    color: "#228B22"
  }
});

class searchResultOverview extends Component {
  constructor() {
    super();

    this.state = {
      // States used for sorting
      sortCategory: null,
      sortOrder: "descending",

      // States used for filter
      star_rate: 0,
      guest_rate: 0,
      price_low: null,
      price_high: null,
      free_wifi: false,
      free_parking: false,
      free_breakfast: false,
      pool: false,
      pet_friendly: false,
      priceRangeEquality: "To",
      priceRangeAnchorEl: null,
      lat: null,
      lng: null,
      open: false,
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      onMarkerClickIndex: 0,  
    };

    // Methods passed to child components
    this.handleChange = this.handleChange.bind(this);
    this.handleStarRatings = this.handleStarRatings.bind(this);
    this.handleGuestRatings = this.handleGuestRatings.bind(this);
    this.handleAmenities = this.handleAmenities.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleClickToHotel = this.handleClickToHotel.bind(this);
    this.handleEqualityMenuOpen = this.handleEqualityMenuOpen.bind(this);
    this.handleEqualityMenuClose = this.handleEqualityMenuClose.bind(this);
    this.handleResetSearchOverview = this.handleResetSearchOverview.bind(this);

    // Action calls
    this.handleFiltersApply = this.handleFiltersApply.bind(this);
    this.backendCall = this.backendCall.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.handleClickChooseDeal = this.handleClickChooseDeal.bind(this);
  }

  handleClickChooseDeal = () => event => {
    event.preventDefault();
    this.handleClickOpen();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onMarkerClick = (props, marker, e, index) =>{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    onMarkerClickIndex : index,
  });
  console.log("Being Called Function Here", index);
}

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  // Upon mounting this component, browser is moved to the top of page.
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  componentWillUnmount() {
    this.props.clearData();
  };

  // Used to reset <FiltersWindow /> upon pressing 'Search'
  handleResetSearchOverview = () => {
    this.setState({
      star_rate: 0,
      guest_rate: 0,
      price_low: null,
      price_high: null,
      free_wifi: false,
      free_parking: false,
      free_breakfast: false,
      pool: false,
      pet_friendly: false,
      priceRangeEquality: "To",
      priceRangeAnchorEl: null,
      sortCategory: null,
      sortOrder: "descending"
    });
  };

  // Used to store the star rating input in <FiltersWindow />
  handleStarRatings = newRating => {
    this.setState({
      star_rate: newRating
    });
  };

  // Used to store the star rating input in <FiltersWindow />
  handleGuestRatings = (event, value) => {
    this.setState({
      guest_rate: value
    });
  };

  // Used to store the amenities input in <FiltersWindow />
  handleAmenities = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  // Used to store the inputs from price range fields in <FiltersWindow />
  handlePriceRangeChange = name => event => {
    let value;
    if (event.target.value == "") {
      value = null;
    } else {
      value = Number(event.target.value);
    }
    this.setState({
      [name]: value
    });
  };

  // Handles clicks to the apply filter button
  handleFiltersApply = event => {
    event.preventDefault();
    this.backendCall(null);
  };

  // Used to store the inputs from selections felds in <SortBar />
  handleChange = event => {
    event.preventDefault();

    let sortObject = this.state;
    sortObject = {
      ...sortObject,
      [event.target.name]: event.target.value
    };

    if (sortObject.sortCategory != null) {
      this.backendCall(sortObject);
    }

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Handles the Equality button
  handleEqualityMenuOpen = event => {
    event.preventDefault();
    this.setState({
      priceRangeAnchorEl: event.currentTarget
    });
  };

  handleEqualityMenuClose = value => event => {
    event.preventDefault();
    if (value == null) {
      this.setState({
        priceRangeAnchorEl: null
      });
    } else {
      this.setState({
        priceRangeEquality: value,
        priceRangeAnchorEl: null
      });
    }
  };

  // Handles backend call for filter and sort
  backendCall = sortObject => {
    let {
      destinationName,
      checkIn,
      checkOut,
      numberRooms,
      lastIndex,
      numResults
    } = this.props.query.searchQuery;
    let {
      price_low,
      price_high,
      guest_rate,
      star_rate,
      priceRangeEquality,
      free_wifi,
      free_parking,
      free_breakfast,
      pool,
      pet_friendly
    } = this.state;

    let { sortCategory, sortOrder } =
      sortObject == null ? this.state : sortObject;

    let orderSign;
    switch (sortOrder) {
      case "ascending":
        orderSign = "";
        break;
      case "descending":
      default:
        orderSign = "-";
        break;
    }

    let price_low_validated, price_high_validated;
    switch (priceRangeEquality) {
      case "Greater than":
        price_low_validated = price_high;
        price_high_validated = Number.MAX_SAFE_INTEGER;
        break;
      case "Less than":
        price_low_validated = 0;
        price_high_validated = price_high;
        break;
      case "To":
      default:
        price_low_validated =
          price_low == null || price_low > price_high || price_low == price_high
            ? null
            : price_low;
        price_high_validated =
          price_high == null ||
          price_low > price_high ||
          price_low == price_high
            ? null
            : price_high;
        break;
    }

    let newQuery = {
      destinationName: destinationName,
      checkIn: checkIn,
      checkOut: checkOut,
      numberRooms: numberRooms,
      lastIndex: lastIndex,
      numResults: numResults,
      pageNumber: 1,
      free_wifi: free_wifi ? 1 : 0,
      free_parking: free_parking ? 1 : 0,
      free_breakfast: free_breakfast ? 1 : 0,
      pool: pool ? 1 : 0,
      pet_friendly: pet_friendly ? 1 : 0,
      price_low: price_low_validated,
      price_high: price_high_validated,
      review_score: guest_rate,
      star_rating: star_rate,
      sortObject: `${orderSign}${sortCategory}`
    };

    this.props.saveQuery(newQuery);
    this.props.submitQuery(newQuery);
  };

  // Handles 'Navigate to Hotel card'
  handleClickToHotel = hotel => event => {
    event.preventDefault();
    this.props.getIndividualHotelResult({
      id: hotel.hotelID,
      checkIn: this.props.query.searchQuery.checkIn,
      checkOut: this.props.query.searchQuery.checkOut,
      numberRooms: this.props.query.searchQuery.numberRooms
    });
    this.props.history.push("/indiv-hotel");
  };

  // Handles navigation to previous page of pagination
  goToPreviousPage = (queryResult, searchQuery) => event => {
    event.preventDefault();

    window.scrollTo(0, 0);
    queryResult.pageNumber--;
    let lastIndex = queryResult.lastIndex - 2 * searchQuery.numResults;
    if (lastIndex < 0 || queryResult.pageNumber === 1) {
      lastIndex = 0;
    }
    let newQuery = searchQuery;
    newQuery.lastIndex = lastIndex;
    newQuery.pageNumber = queryResult.pageNumber;

    this.props.saveQuery(newQuery);
    this.props.submitQuery(newQuery);
  };

  // Handles navigation to next page of pagination
  goToNextPage = (queryResult, searchQuery) => event => {
    event.preventDefault();

    window.scrollTo(0, 0);
    queryResult.pageNumber++;
    let newQuery = searchQuery;
    newQuery.lastIndex = queryResult.lastIndex;
    newQuery.pageNumber = queryResult.pageNumber;

    this.props.saveQuery(newQuery);
    this.props.submitQuery(newQuery);
  };

  render() {
    if (this.props.query.searchQuery == null) {
      this.props.history.push("/");
      return null;
    } else {
      let {
        star_rate,
        guest_rate,
        price_low,
        price_high,
        priceRangeEquality,
        priceRangeAnchorEl,
        free_wifi,
        free_parking,
        free_breakfast,
        pool,
        pet_friendly
      } = this.state;
      let { classes, width } = this.props;
      let { hotelQuery, searchQuery, loading } = this.props.query;
      let displayGoogleMap = null;
      // Markup for each hotel result card
      let hotels;
      if (loading) {
        hotels = (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.msgHeight}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        );
      } else if (hotelQuery.results.length > 0) {
        if (hotelQuery.results.length > 0) {
          displayGoogleMap = (
            <Map
              class = "googleMap"
              google={this.props.google}
              zoom={10}
              initialCenter={{
                lat: hotelQuery.results[0].lat,
                lng: hotelQuery.results[0].lng
              }}
            >
              {hotelQuery.results.map((item, index) => {
              return (
                <Marker
                  key={index}
                  onClick={() => this.onMarkerClick(index)}
                  name={hotelQuery.results[index].name}
                  position={{
                    lat: hotelQuery.results[index].lat,
                    lng: hotelQuery.results[index].lng
                  }}
                >
                {(this.state.onMarkerClickIndex === index) && 
                <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{hotelQuery.results[index].name}</h4>
                  <div>
                  <ReactStars
                    count={5}
                    value={hotelQuery.results[index].star_rates}
                    size={23}
                    edit={false}
                    color2={"#FFD700"}
                    color1={"#dcdcdc"}
                  />
                  </div>
                  <img src={hotelQuery.results[index].img} />
                </div>
              </InfoWindow>
            }
                </Marker>
                
              );
              })}
            </Map>
          );

          hotels = hotelQuery.results.map(hotel => {
            // Markup for price container
            let displayPriceContainer = null;

            if (hotel.discount > 0) {
              displayPriceContainer = (
                <div>
                  <Grid item xs="auto">
                    <Typography className={classes.root} variant="h5">
                      {((1 - hotel.discount) * 100).toFixed(0)}% OFF!
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography className={classes.root} variant="h5">
                      ${(hotel.price * hotel.discount).toFixed(0)}
                    </Typography>
                  </Grid>
                </div>
              );
            } else {
              displayPriceContainer = (
                <div>
                  <Grid item xs="auto">
                    <Typography variant="h5">${hotel.price}</Typography>
                  </Grid>
                </div>
              );
            }

            return (
              <Grid item xs={12}>
                <Card className={classes.pad25} square="false">
                  <Grid
                    container
                    direction="flow"
                    justify={isWidthDown("sm", width) ? "center" : "flex-start"}
                    spacing={8}
                  >
                    <Grid item xs={12} md>
                      <Grid container direction="column" spacing={0}>
                        <Grid item>
                          <Typography variant="h5" color="primary">
                            {hotel.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" color="secondary">
                            {hotel.address}
                          </Typography>
                        </Grid>
                        <Grid item style={{ paddingTop: 8 }}>
                          <Grid container direction="flow" spacing={16}>
                            <Grid item xs={12} md={4} lg={3}>
                              <Card style={{ padding: 7 }}>
                                <img src={hotel.img} />
                              </Card>
                            </Grid>
                            <Grid item xs={12} md="auto">
                              <Grid
                                container
                                direction="column"
                                justify={
                                  isWidthDown("sm", width)
                                    ? "center"
                                    : "flex-start"
                                }
                                alignItems={
                                  isWidthDown("sm", width)
                                    ? "center"
                                    : "flex-start"
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
                                        value={hotel.star_rates}
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
                                        {hotel.star_rates} out of 5 Star Rating
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Typography variant="h6" color="default">
                                    {hotel.guest_rate} Guest Rating
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                      >
                        {displayPriceContainer}

                        <Grid item xs="auto">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickToHotel(hotel)}
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
          });
        }
      } else {
        hotels = (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.msgHeight}
          >
            <Grid item>
              <Typography variant="subtitle1" className={classes.subtitles}>
                There are no hotels that satisfy your search criteria...
              </Typography>
            </Grid>
          </Grid>
        );
      }
      // Markup for pagination
      let pagination = (
        <Grid
          container
          direction="flow"
          justify="center"
          alignItems="center"
          spacing={8}
        >
          <Grid item>
            <IconButton
              onClick={this.goToPreviousPage(hotelQuery, searchQuery)}
              disabled={
                loading == true || hotelQuery.pageNumber == "1" ? true : false
              }
            >
              <NavigateBefore />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.subtitles}>
              {hotelQuery.pageNumber}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={this.goToNextPage(hotelQuery, searchQuery)}
              disabled={
                loading == true || hotelQuery.nextExists != true ? true : false
              }
            >
              <NavigateNext />
            </IconButton>
          </Grid>
        </Grid>
      );

      return (
        <div className={classes.pageMargins} 
        style={{ minHeight: window.innerHeight - 180 }}>
          <ExpansionPanel
            defaultExpanded={width == "xs" ? false : true}
            square="false"
            style={{ marginBottom: 8 }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.subtitles} variant="subtitle2">
                <Search /> Search
              </Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                <SearchWidget
                  handleResetSearchOverview={this.handleResetSearchOverview}
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Grid container direction="flow" spacing={8}>
            <FiltersWindow
              star_rate={star_rate}
              guest_rate={guest_rate}
              price_low={price_low}
              price_high={price_high}
              priceRangeEquality={priceRangeEquality}
              priceRangeAnchorEl={priceRangeAnchorEl}
              handleAmenities={this.handleAmenities}
              handleStarRatings={this.handleStarRatings}
              handleGuestRatings={this.handleGuestRatings}
              handlePriceRangeChange={this.handlePriceRangeChange}
              handleFiltersApply={this.handleFiltersApply}
              handleEqualityMenuOpen={this.handleEqualityMenuOpen}
              handleEqualityMenuClose={this.handleEqualityMenuClose}
              free_wifi={free_wifi}
              free_parking={free_parking}
              free_breakfast={free_breakfast}
              pool={pool}
              pet_friendly={pet_friendly}
            />
            <Grid item xs={12} sm={8} md={9} lg={9}>
              <Grid container direction="row" justify="center" spacing={8}>
                <Grid item xs={12} sm={10} md={10} lg={10}>
                  <SortBar
                    sortCategory={this.state.sortCategory}
                    sortOrder={this.state.sortOrder}
                    handleChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={2} justify="left">
                <div>
                  <Button
                    class="buttonSearch"
                    primary
                    onClick={this.handleClickChooseDeal()}
                  >
                    <i class="fas fa-map-marked-alt"></i> View Map
                  </Button>
                </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    {hotels}
                  </Grid>
                </Grid>
              </Grid>
              {loading == false && hotelQuery.results.length > 0 ? (
                pagination
              ) : (
                <div />
              )}
            </Grid>
          </Grid>
          {/* <Dialog> is a material UI pop-up window. It appears if the user clicks on "Book now" for the hotel deals */}
          <Dialog
            maxWidth={"md"}
            scroll={"body"}
            fullScreen={width === "xs" ? true : false}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle className="BookingInfoTitle">
              <div className="text-right">
                <Button onClick={this.handleClose} color="primary">
                  Close
                </Button>
              </div>
            </DialogTitle>
            <DialogContent>
            <Grid
                container
                className="dealPopUpTitle"
                direction="column"
                justify="space-between"
                alignItems="center"
            >
                { displayGoogleMap }
            </Grid>
            </DialogContent>
            <DialogActions>

            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

searchResultOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired,
  getIndividualHotelResult: PropTypes.func.isRequired,
  submitQuery: PropTypes.func.isRequired,
  saveQuery: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(
  mapStateToProps,
  { getIndividualHotelResult, submitQuery, saveQuery, clearData }
)(withStyles(styles)(withWidth()(
  GoogleApiWrapper({
    apiKey: "AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8"
  })(searchResultOverview)
)));
