import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { readyLanding, setLandingStatus } from "../../actions/landingActions";

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
  }

  render() {
    // TODO: Create slideshow that dynamically changes based on featured cities
    if (this.props.landing != null) {
      let { classes, landing } = this.props;
      
      let {
        header,
        deals1,
        deals2,
        deals3,
        featureDestination
      } = this.props.landing;

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
                  <div id="topDealsAnchor" className={classes.centerFlexbox}/>
                  <Typography variant="h5" style={{ marginTop: 50 }}>
                    Deals of the Week
                  </Typography>
                </div>
                <hr className={classes.noYMarginTop} />
              </div>
              <Grid container spacing={8} direction="row" justify="center">
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
                        <Typography variant="h6">
                          Featured City Deals!
                        </Typography>
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
                  <div id="featuredCitiesAnchor" style={{padding:0, margin:0}}/>
                  <Typography variant="h5" style={{ marginTop: 50 }}>
                    Featured Cities
                  </Typography>
                <hr className={classes.noYMarginTop} />
              </div>
              <Grid container spacing={8} direction="row" justify="center" style={{marginBottom: 20}}>
                { featureDestinationMarkup }
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
