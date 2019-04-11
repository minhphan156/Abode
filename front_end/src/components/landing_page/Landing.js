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
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: "#B22222"
  },
  centerFlexbox: {
    display: "flex"
  },
  inspirationBox: {
    // alignSelf: "center",
    background: "rgba(0,0,0,1)",
    padding: 5,
    width: "25%"
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
    width: "98%",
    height: "100%"
  },
  noYMarginTop: {
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 0
  },
  cardMedia: {
    height: "25vh"
  }
};

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

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
    // TODO: Create slideshow that dynamically changes based on featured cities
    if (this.props.landing != null) {
      let { classes, landing, width } = this.props;

      let deals1a = {
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
      let deals2a = {
        CityAbbr: "NYC",
        HotelName: "DoubleTree New York Time Square West",
        CityName: "New York City, NY",
        Image:
          "https://thumbnails.trvl-media.com/CLyK-qc_c1FqmYigHzHpfxL52y8=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/17000000/16260000/16255100/16255092/0697a962_z.jpg",
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",

        DiscountRate: 10,
        NumStars: 4,
        GuestRating: 8,
        LowPrice: 367
      };
      let deals3a = {
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

      let {
        header,
        deals1,
        deals2,
        deals3,
        featureDestination
      } = this.props.landing;

      let dealsArr = [deals1a, deals2a, deals3a];

      let topDealsMarkup = dealsArr.map(deal => {
        if (deal != null) {
          return (
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="City" className={classes.avatar}>
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
                      <h4>Get {deal.DiscountRate}% off!</h4>
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
                      <h5>Guest Rating: {deal.GuestRating}</h5>{" "}
                    </Grid>

                    <Grid className="dealsSpacing2">
                      <Link to="/searchResultOverview">
                        <Button
                          class="buttonSearch"
                          primary
                          onClick={this.onSearchClick}
                        >
                          Book now
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        }
      });

      // Uses genFeatureDestination() to create markup for each featured city.
      let featureDestinationMarkup = landing.featCities.map(city => {
        return (
          <Grid container direction="row" justify="center">
            <Grid xs={12} sm={8} md={8} lg={8}>
              <div className="imageContainer">
                <img src={city.imgMain} className={classes.collageImg} />
                <div class="text-block-cities">
                  <h4 className=" imageTextCity">{city.name}</h4>
                  <p>Bookings in the past week: {city.bookings}</p>
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <Grid
                container
                direction={width === "xs" ? "row" : "column"}
                justify="center"
              >
                <Grid xs={6} sm={12}>
                  <div className="imageContainer">
                    <img
                      src={city.imgMain}
                      className={classes.collageImgSmall}
                    />
                    <div class="text-block-cities-small">
                      <h4 className=" imageTextCity">Attraction 1</h4>
                      <p>{city.name}</p>
                    </div>
                  </div>
                </Grid>
                <Grid xs={6} sm={12} md={12} lg={12}>
                  <div className="imageContainer">
                    <img
                      src={city.imgMain}
                      className={classes.collageImgSmall}
                    />
                    <div class="text-block-cities-small">
                      <h4 className=" imageTextCity">Attraction 1</h4>
                      <p>{city.name}</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      });

      // Generates markup for the header city.
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
              <p>explore {this.props.landing.inspireCity}</p>
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
              <Grid container spacing={8} direction="row" justify="center">
                {/* Prototype Markup BEGINNING */}
                {topDealsMarkup}

                {/* Prototype Markup ENDING */}
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
