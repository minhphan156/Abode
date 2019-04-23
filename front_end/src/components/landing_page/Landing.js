import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { readyLanding, setLandingStatus } from "../../actions/landingActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SearchWidget from "./search_widget/SearchWidget";
import ReactStars from "react-stars";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Animation CSS imports
import "./Landing.css";

// Material-UI Imports
import {
  Grid,
  Typography,
  withStyles,
  withWidth,
  Card,
  CardContent,
  CardMedia
} from "@material-ui/core";

// Component CSS
let styles = {
  root: {
    height: 90
  },
  card: {
    width: "100%",
    height: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },

  centerFlexbox: {
    display: "flex"
  },
  searchWidgetBox: {
    alignSelf: "center",
    background: "rgba(0,0,0,0.5)",
    padding: 20,
    width: "100%"
  },
  collageImg: {
    width: "100%"
  },
  collageImgSmall: {
    height: "100%"
  },
  noYMarginTop: {
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 0
  }
};

class Landing extends Component {
  constructor() {
    super();
    this.state = { open: false, chosenDealImage: null, chosenDealHotel: null };

    this.handleClickChooseDeal = this.handleClickChooseDeal.bind(this);
  }

  // sets state to be displayed in the deals pop-up
  handleClickChooseDeal = (hotel, img) => event => {
    event.preventDefault();
    this.setState({ chosenDealImage: img });
    this.setState({ chosenDealHotel: hotel });

    this.handleClickOpen();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.setLandingStatus(true);
    this.props.readyLanding();
  };

  componentWillUnmount = () => {
    this.props.setLandingStatus(false);
  };

  render() {
    if (this.props.landing != null) {
      let { classes, landing, width } = this.props;

      // Hotel Deals of the Week
      let deals1 = {
        CityAbbr: "LA",
        HotelName: "Freehand Los Angeles",
        CityName: "Los Angeles, CA",
        Image:
          "https://thumbnails.trvl-media.com/rmHwfoL4I1mySzyzLHoF1hu1f_w=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/17000000/16320000/16317400/16317325/3fdedd72_z.jpg",
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",
        DiscountRate: 15,
        NumStars: 4,
        GuestRating: 8.8,
        LowPrice: 229
      };
      let deals2 = {
        CityAbbr: "NYC",
        HotelName: "DoubleTree by Hilton New York Times Square West",
        CityName: "New York City, NY",
        Image:
          "https://thumbnails.trvl-media.com/CLyK-qc_c1FqmYigHzHpfxL52y8=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/17000000/16260000/16255100/16255092/0697a962_z.jpg",
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",

        DiscountRate: 15,
        NumStars: 4,
        GuestRating: 8,
        LowPrice: 367
      };
      let deals3 = {
        CityAbbr: "MIA",
        HotelName: "The Setai",
        CityName: "Miami, FL",
        Image:
          "https://thumbnails.trvl-media.com/IV6AxJfwZRwdeaEEJ8j_KELAlG0=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/2000000/1130000/1126600/1126560/61ad9b86_z.jpg",
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",

        DiscountRate: 20,
        NumStars: 5,
        GuestRating: 9.6,
        LowPrice: 900
      };

      let dealsArr = [deals1, deals2, deals3];

      // topDealMarkup is the collection of cards for hotel deals of the week
      let topDealsMarkup = dealsArr.map(deal => {
        if (deal != null) {
          return (
            <Grid className="dealContainer" container sm="4">
              <Card className={classes.card}>
                <CardHeader
                  className="dealContainerHeader"
                  avatar={
                    <Avatar aria-label="City" className="dealAvatar">
                      {deal.CityAbbr}
                    </Avatar>
                  }
                  title={deal.HotelName}
                  subheader={deal.CityName}
                />
                <CardMedia
                  className={classes.media}
                  image={deal.Image}
                  title={deal.HotelName}
                />
                <CardContent className="dealsSpacing">
                  <Grid container direction="row" justify="space-between">
                    <Grid>
                      <h5>Get {deal.DiscountRate}% off!</h5>
                    </Grid>
                    <Grid className="newPrice">
                      Starting from ${" "}
                      {(
                        (deal.LowPrice / 100) *
                        (100 - deal.DiscountRate)
                      ).toFixed(2)}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    className="dealsSpacing2"
                  >
                    <Grid>
                      <ReactStars
                        count={5}
                        value={deal.NumStars}
                        size={28}
                        edit={false}
                        color2={"#FFD700"}
                      />
                    </Grid>
                    <Grid className="dealsSpacing">
                      <h6>Guest Rating: {deal.GuestRating}</h6>
                    </Grid>

                    <Grid className="dealsSpacing2">
                      <Button
                        class="buttonSearch"
                        primary
                        onClick={this.handleClickChooseDeal(
                          deal.HotelName,
                          deal.Image
                        )}
                      >
                        Book now
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        }
      });

      // featureDestinationMarkup is the collection of images for feature cities
      let featureDestinationMarkup = landing.featCities.map(city => {
        let landmark1 = null;
        let landmark2 = null;

        if (city.landmarkNames) {
          landmark1 = city.landmarkNames[0];
          landmark2 = city.landmarkNames[1];
        }

        return (
          <Grid container direction="row" justify="center">
            <Grid xs={12} sm={8} md={8} lg={8}>
              <div className="imageContainerLarge">
                {/* TODO: Update Link to={} to each cards respective cities after city backend is implemented */}
                <Link to="/cities/0">
                  <img src={city.imgMain} className={classes.collageImg} />
                  <div class="text-block-cities">
                    <h4 className="imageTextCityTitle">{city.name}</h4>
                    <p className="imageTextBookings">
                      Bookings in the past week: {city.bookings}
                    </p>
                  </div>
                </Link>
              </div>
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <Grid
                container
                direction={width === "xs" ? "row" : "column"}
                justify="center"
              >
                <Grid xs={6} sm={12}>
                  <div className="imageContainerSmall imageContainerSmall1">
                    {/* TODO: Update Link to={} to each cards respective cities after city backend is implemented */}
                    <Link to="/cities/0">
                      <img
                        src={city.imgAlt[0]}
                        className={classes.collageImgSmall}
                      />
                      <div class="text-block-cities-small">
                        <h4 src={city.name} className="imageTextAttraction">
                          {landmark1}
                        </h4>
                        <p className="imageTextCity">{city.name}</p>
                      </div>
                    </Link>
                  </div>
                </Grid>
                <Grid xs={6} sm={12} md={12} lg={12}>
                  <div className="imageContainerSmall imageContainerSmall2">
                    {/* TODO: Update Link to={} to each cards respective cities after city backend is implemented */}
                    <Link to="/cities/0">
                      <img
                        src={city.imgAlt[1]}
                        className={classes.collageImgSmall}
                      />
                      <div class="text-block-cities-small">
                        <h4 className="imageTextAttraction">{landmark2}</h4>
                        <p className="imageTextCity">{city.name}</p>
                      </div>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      });

      // Generates markup for the inspiration picture
      let genBackgroundImgStyle = () => {
        return {
          display: "flex",
          backgroundImage: `url(${this.props.landing.inspire})`,
          backgroundSize: "cover",
          maxWidth: "100%",
          maxHeight: "100%",
          height: "95vh",
          minHeight: 450
        };
      };

      return (
        <div>
          <div style={genBackgroundImgStyle()} boxShadow={3}>
            <div className={`${classes.searchWidgetBox} fadeIn`}>
              <SearchWidget />
            </div>
            <div class="text-block-inspiration">
              <Link to="/cities" style={{ color: "white" }}>
                explore {this.props.landing.inspireCity}
              </Link>
            </div>
          </div>
          <br />
          <div
            style={{
              width: "auto",
              height: "auto",
              marginLeft: "5%",
              marginRight: "5%"
            }}
          >
            <div className="fadeIn">
              <div>
                <div className={classes.centerFlexbox}>
                  <div id="topDealsAnchor" className={classes.centerFlexbox} />
                  <Typography variant="h5" style={{ marginTop: 50 }}>
                    Deals of the Week
                  </Typography>
                </div>
                <hr className={classes.noYMarginTop} />
                <br />
              </div>

              <Grid
                container
                direction={width === "xs" ? "column" : "row"}
                justify="space-around"
                alignItems="stretch"
              >
                {topDealsMarkup}
              </Grid>
              <div>
                <div
                  id="featuredCitiesAnchor"
                  style={{ padding: 0, margin: 0 }}
                />
                <Typography variant="h5" style={{ marginTop: 50 }}>
                  Featured Cities
                </Typography>
                <hr className={classes.noYMarginTop} />
              </div>
              <Grid
                container
                spacing={8}
                direction="row"
                justify="center"
                style={{ marginBottom: 20 }}
              >
                {featureDestinationMarkup}
              </Grid>
            </div>
          </div>

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
              <div className="BookingInfoTitle">
                Please choose your travel dates and number of rooms:
              </div>
            </DialogTitle>

            <DialogContent>
              <SearchWidget
                dealPage={true}
                dealDestination={this.state.chosenDealHotel}
              />
              <Grid
                container
                className="dealPopUpTitle"
                direction="column"
                justify="space-between"
                alignItems="center"
              >
                <br />
                {this.state.chosenDealHotel} <br />
                <img src={this.state.chosenDealImage} className="dealImage" />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  landing: PropTypes.object.IsRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  landing: state.landing
});

export default connect(
  mapStateToProps,
  { readyLanding, setLandingStatus }
)(withStyles(styles)(withWidth()(Landing)));
