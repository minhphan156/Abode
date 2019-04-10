import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { readyLanding, setLandingStatus } from "../../actions/landingActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SearchWidget from "./search_widget/SearchWidget";

// Animation CSS imports
import "./Landing.css";

// Image imports (For Prototype Only)
import SD from "./SD.jpg";
import VG from "./Vegas.jpg";
import WA from "./WA.jpg";

// Material-UI Imports
import {
  Grid,
  Typography,
  withStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@material-ui/core";

// Component CSS
let styles = {
  card: {
    maxWidth: 400,
    height: 490
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: "#B22222"
  },

  root: {
    width: "auto",
    justify: "center",
    flexGrow: 1
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
      let { classes, landing } = this.props;

      let deals1a = {
        CityAbbr: "LA",
        HotelName: "Some Hotel in LA",
        CityName: "Los Angeles, CA",
        Image: SD,
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",
        DiscountRate: 15
      };
      let deals2a = {
        CityAbbr: "NYC",
        HotelName: "Some Hotel in New York",
        CityName: "New York City, NY",
        Image: VG,
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",

        DiscountRate: 10
      };
      let deals3a = {
        CityAbbr: "MIA",
        HotelName: "Some Hotel in Miami",
        CityName: "Miami, FL",
        Image: WA,
        PromoText:
          "The ABC is a beautiful hotel at the pacific coast. Offers great food. LA is cool too. just book it already!",

        DiscountRate: 20
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
                  // image={SD}
                  image={deal.Image}
                  title={deal.HotelName}
                />
                <CardContent>
                  <h4>Get {deal.DiscountRate}% off!</h4>
                  <Typography component="p">{deal.PromoText}</Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Link to="/searchResultOverview">
                    <Button
                      class="buttonSearch"
                      primary
                      onClick={this.onSearchClick}
                    >
                      Book now
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        }
      });

      // Uses genFeatureDestination() to create markup for each featured city.
      let featureDestinationMarkup = landing.featCities.map(city => {
        return (
          <Grid item className="mouseHover" xs={3}>
            <img className={classes.collageImg} src={city.imgMain} />
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
)(withStyles(styles)(Landing));
