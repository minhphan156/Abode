import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchWidget from "./search_widget/SearchWidget";

// Animation CSS imports
import "./Landing.css";

// Image imports (For Prototype Only)
import SF from "./SF.jpg";
import LA from "./LA.jpg";
import NY from "./NY.jpg";
import CH from "./CH.jpg";
import AU from "./AU.jpg";
import DE from "./DE.jpg";
import PO from "./PO.jpg";
import SA from "./SA.jpg";
import SD from "./SD.jpg";
import VG from "./Vegas.jpg";
import WA from "./WA.jpg";
import PA from "./PA.jpg";

// Material-UI Imports
import {
  Grid,
  Typography,
  Paper,
  withStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@material-ui/core";

// Component CSS
let styles = {
  root: {
    width: "auto",
    justify: "center",
    flexGrow: 1
  },
  imgSlideShow: {
    display: "flex",
    backgroundImage: `url(${SF})`, // (For Prototype Only)
    backgroundSize: "cover",
    maxWidth: "100%",
    maxHeight: "100%",
    height: "95vh",
    minHeight: 450
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
  constructor(props) {
    super(props);
    this.state = {};

    this.genBackgroundImgStyle = this.genBackgroundImgStyle.bind(this);
  }

  // TODO: Replace deprecated 'componenDidMount' with proper lifecycle method
  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    // TODO: Create slideshow that dynamically changes based on featured cities

    // TODO: Remove the following placeholder once backend is implemented and connected.
    // The following object is here as a placeholder to avoid compiler errors.

    let { classes } = this.props;

    let landing = {
      header: {
        cityName: String,
        head: String
      },
      deals1: {
        name: String,
        picurl: NY,
        rates: Number,
        price: Number
      },
      deals2: {
        name: String,
        picurl: LA,
        rates: Number,
        price: Number
      },
      deals3: {
        name: String,
        picurl: SD,
        rates: Number,
        price: Number
      },
      featureDestination: [
        {
          cityName: String,
          picurl: String
        }
      ]
    };

    // TODO: Remove the following placeholder once backend is implemented and connected.
    // The folowing declaration is a placeholder to avoid compiler errors.
    let { header, deals1, deals2, deals3, featureDestination } = landing;

    let dealsArr = [deals1, deals2, deals3];

    let topDealsMarkup = dealsArr.map(city => {
      if (city != null) {
        return (
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image={city.picurl}
                title="Weekend Deals"
              />
              <CardContent>
                <Typography variant="h6">{city.picurl}</Typography>
                <Typography variant="subtitle1">View Deals</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      }
    });

    let featureDestinationMarkup = featureDestination.map(city => {
      return (
        <Grid item className="mouseHover" xs={3}>
          <img src={city.picurl} style={styles.collageImg} />
        </Grid>
      );
    });

    var genBackgroundImgStyle = () => {
      return {
        display: "inline-block",
        backgroundImage: `url(${featureDestination})`,
        backgroundSize: "cover",
        alignItems: "center"
      };
    };

    return (
      <div>
        {/*<div className={genBackgroundImgStyle()} boxShadow={3}>*/}
        {/* PROTOTYPE LINE BEGINNING */}
        <div className={classes.imgSlideShow} boxShadow={3}>
          {/* PROTOTYPE LINE BEGINNING */}
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
                <Typography variant="h5" style={{ marginTop: 50 }}>
                  Deals of the Week
                </Typography>
              </div>
              <hr className={classes.noYMarginTop} />
            </div>
            <Grid container spacing={8} direction="row" justify="center">
              {/* topDealsMarkup */}
              {/* Prototype Markup BEGINNING */}
              <Grid item xs={4} className="mouseHover">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image={SD}
                      title="Weekend Deals"
                    />
                    <CardContent>
                      <Typography variant="h6">Weekend Deals!</Typography>
                      <Typography variant="subtitle1">View Deals</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4} className="mouseHover">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image={VG}
                      title="Weekend Deals"
                    />
                    <CardContent>
                      <Typography variant="h6">Featured City Deals!</Typography>
                      <Typography variant="subtitle1">View Deals</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4} className="mouseHover">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image={WA}
                      title="Weekend Deals"
                    />
                    <CardContent>
                      <Typography variant="h6">Holiday Deals!</Typography>
                      <Typography variant="subtitle1">View Deals</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              {/* Prototype Markup ENDING */}
            </Grid>
            <div>
              <div className={classes.centerFlexbox}>
                <Typography variant="h5" style={{ marginTop: 50 }}>
                  Featured Cities
                </Typography>
              </div>
              <hr className={classes.noYMarginTop} />
            </div>
            <Grid container spacing={8} direction="row" justify="center">
              {/* featureDestinationMarkup */}
              {/* Prototype Markup BEGINNING */}
              <Grid item xs={3} className="mouseHover">
                <img src={AU} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={CH} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={DE} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={LA} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={NY} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={PA} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={PO} backgroundSize="contain" />
              </Grid>
              <Grid item xs={3} className="mouseHover">
                <img src={SA} backgroundSize="contain" />
              </Grid>
              {/* Prototype Markup ENDING */}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
  // landing: PropTypes.object.IsRequired
  // TODO: Once backend is implement, uncomment above line.
};

const mapStateToProps = state => ({
  auth: state.auth
  // landing: state.landing
  // TODO: Once backend is implement, uncomment above line.
});

export default connect(mapStateToProps)(withStyles(styles)(Landing));
