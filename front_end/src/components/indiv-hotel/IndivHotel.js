import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import ReactStars from "react-stars";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { connect } from "react-redux";
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import { Link } from "react-router-dom";
import { saveBooking } from "../../actions/bookingActions";
import { getIndividualHotelResult } from "../../actions/searchResultActions";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { Grid, CircularProgress } from "@material-ui/core";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider
} from "@material-ui/core";
import { Search, ExpandMore } from "@material-ui/icons";

import "./indivHotel.css";
import taxrates from "../payment/taxrates.json";

class IndivHotel extends Component {
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor() {
    super();
    this.state = {};
    this.saveBookingInfo = this.saveBookingInfo.bind(this);
  }

  /*  TODO: Make backend API that searches for an individual hotel using its ID
  componentDidMount = () => {
    this.props.getIndividualHotelResult(this.props.match.params.hotelID);
  };
  */

  saveBookingInfo(roomTypeSelected, price) {
    // IN HERE WE SAVE ALL THE INFO WE NEED FOR THE PAYMENT PAGE

    var duration = moment.duration(
      this.props.query.searchQuery.checkOut.diff(
        this.props.query.searchQuery.checkIn
      )
    );
    var days = duration.asDays();

    let taxRate = 12.22;

    // get the city's tax rate and pass it on as part of tempBookingInfo
    taxrates.name.filter(taxrate => {
      if (
        taxrate.label ===
        this.props.individualHotelData.individualHotelData.city
      ) {
        taxRate = taxrate.rate;
      }
    });

    // calculate the discount, as provided by backend
    let calculateDiscount = 0;
    if (this.props.individualHotelData.individualHotelData.discount > 0) {
      calculateDiscount =
        (1 - this.props.individualHotelData.individualHotelData.discount) *
        (days * price * this.props.query.searchQuery.numberRooms);
    }

    // tempBookingInfo will be sent to saveBooking, which provides data to Payment page
    let tempBookingInfo = {
      name: this.props.individualHotelData.individualHotelData.name,
      address: this.props.individualHotelData.individualHotelData.address,
      roomType: roomTypeSelected,
      checkIn: this.props.query.searchQuery.checkIn,
      checkOut: this.props.query.searchQuery.checkOut,
      numRooms: this.props.query.searchQuery.numberRooms,
      pricePerNight: price,
      hotelImage: this.props.individualHotelData.individualHotelData.img[0],
      numberOfNights: days,
      subtotal: days * price * this.props.query.searchQuery.numberRooms,
      discounts: calculateDiscount,

      taxRate: taxRate
    };
    this.props.saveBooking(tempBookingInfo);
  }

  render() {
    console.log(this.props.individualHotelData.individualHotelData);
    console.log(this.props.query.searchQuery);
    if (
      this.props.individualHotelData.individualHotelData === null ||
      this.props.query.searchQuery === null
    ) {
      this.props.history.push("/");
      return null;
    } else {
      let discountRate = 1;
      if (this.props.individualHotelData.individualHotelData.discount > 0) {
        discountRate = this.props.individualHotelData.individualHotelData
          .discount;
      }

      const { individualHotelData } = this.props.individualHotelData;
      let iconA = {
        url: "./logo.png",
        size: new this.props.google.maps.Size(100, 100),
        scaledSize: new this.props.google.maps.Size(40,40),
        origin: new this.props.google.maps.Point(0, 0),
        anchor: new this.props.google.maps.Point(0, 32)
      };
      let displayGoogleMaps = (                    
        <Map
          google={this.props.google}
          zoom={15}
          initialCenter={{
            lat: individualHotelData.lat,
            lng: individualHotelData.alt
          }}
          style={{
            width: "100%",
            height: "70%",
            marginTop: "1%"
          }}
        >
          <Marker
            icon={ iconA }
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={{
              lat: individualHotelData.lat,
              lng: individualHotelData.alt
            }}
          />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{individualHotelData.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      );
      let displayGoogleMapsLong =(
        <Map
          google={this.props.google}
          zoom={15}
          initialCenter={{
            lat: individualHotelData.lat,
            lng: individualHotelData.alt
          }}
          style={{
            width: "100%",
            height: "100%",
            marginTop: "1%"
          }}
        >
          <Marker
            icon = { iconA }
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={{
             lat: individualHotelData.lat,
             lng: individualHotelData.alt
            }}
          />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{individualHotelData.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      );
      return (
        <div class="wholePage" style={{ minHeight: window.innerHeight - 180 }}>
          {individualHotelData.img.length === 0 ? (
            <div style={{ marginLeft: "46%", marginTop: "10%" }}>
              <Grid item>
                <CircularProgress />
              </Grid>
            </div>
          ) : (
            <div id="whole page">
              <div style={{ margin: "auto" }}>
                <ExpansionPanel
                  square="false"
                  style={{ marginTop: "2%", width: "100%" }}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold", color: "#808080" }}
                    >
                      <Search /> Search
                    </Typography>
                  </ExpansionPanelSummary>
                  <Divider />
                  <ExpansionPanelDetails>
                    <div style={{ width: "100%", height: "100%" }}>
                      <SearchWidget tyle={{ width: "100%", height: "100%" }} />
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
              <div id="hotel info" className="row" style={{ marginTop: "3%" }}>
                <div
                  id="hotel Name Address"
                  className="col-lg-10 col-sm-12 col-12 text-left"
                >
                  <p class="hotelName">{individualHotelData.name}</p>
                  <p class="hotelAdd">{individualHotelData.address}</p>
                </div>
                <div
                  id="hotel ratings"
                  className="col-xl-2 col-lg-12 col-sm-12 col-12"
                >
                  <div class="hotelStar">
                    <div id="hotel star rating" className="row">
                      <div className="col-lg-11 col-sm-12 col-12">
                        <h1
                          className="display-4"
                          style={{ fontSize: 24, color: "#FFD700" }}
                        >
                          {individualHotelData.star_rating}-star hotel
                        </h1>
                        <div className="col-lg-1 col-sm-6 col-6" />
                      </div>
                    </div>
                    <div id="hotel stars" className="row">
                      <div className="col-xl-1 col-lg-12 col-sm-12 col-12" />
                      <div className="col-xl-11 col-lg-12 col-sm-12 col-12">
                        <ReactStars
                          className="stars"
                          count={5}
                          value={individualHotelData.star_rating}
                          size={26}
                          edit={false}
                          color2={"#FFD700"}
                          color1={"#dcdcdc"}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="hotelStarShrt">
                    <div id="hotel star rating" className="row">
                      <div className="col-lg-11 col-sm-12 col-12">
                        <h1
                          className="display-4"
                          style={{ fontSize: 18, color: "#FFD700" }}
                        >
                          {individualHotelData.star_rating}-star hotel
                        </h1>
                        <div className="col-lg-1 col-sm-6 col-6" />
                      </div>
                    </div>
                    <div id="hotel stars" className="row">
                      <div className="col-lg-12 col-sm-12 col-12">
                        <ReactStars
                          className="stars"
                          count={5}
                          value={individualHotelData.star_rating}
                          size={23}
                          edit={false}
                          color2={"#FFD700"}
                          color1={"#dcdcdc"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="priceAndRateHeader" style={{ marginTop: "2%" }}>
                <h2
                  className="text-center"
                  style={{ fontSize: 30, color: "#3ba711" }}
                >
                  {discountRate < 1
                    ? ((1 - discountRate) * 100).toFixed(0) + "% OFF!"
                    : null}
                </h2>
                <h2
                  className="text-center"
                  style={{ fontSize: 40, color: "#3ba711" }}
                >
                  ${individualHotelData.price.singlePrice * discountRate}
                </h2>

                <div>
                  <AnchorLink href="#table1">
                    <Button class="seeRoomBtn">See Rooms</Button>
                  </AnchorLink>
                </div>

                <div class="singleRate">
                  <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col">
                      <div class="otherRating">
                        <img
                          style={{ width: "16%", height: "25%" }}
                          src="https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/8/9/3/673987-1-eng-GB/TripAdvisor-being-used-to-blackmail-hoteliers.jpg"
                        />{" "}
                        Trip Advisor
                      </div>

                      <ReactStars
                        className="stars"
                        count={5}
                        value={individualHotelData.ta_rating}
                        size={22}
                        edit={false}
                        color2={"#00af87"}
                        color1={"#dcdcdc"}
                      />
                    </div>
                    <div className="col">
                      <div class="otherRating">
                        <img
                          style={{ width: "10%", height: "4%" }}
                          src="https://a.cdn-hotels.com/da/assets/s/63.0/images/brands/hcom/logos/logo-social.jpg"
                        />{" "}
                        Hotels.com
                      </div>
                      <ReactStars
                        className="stars"
                        count={5}
                        value={individualHotelData.hdc_rating / 2}
                        size={22}
                        edit={false}
                        color2={"#d32f2f"}
                        color1={"#dcdcdc"}
                      />
                    </div>
                  </div>
                </div>

                <div class="doubleRate">
                  <div className="container" style={{ marginTop: "0" }}>
                    <div className="row justify-content-center">
                      <div class="otherRating text-center">
                        <img
                          style={{ width: "10%", height: "95%" }}
                          src="https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/8/9/3/673987-1-eng-GB/TripAdvisor-being-used-to-blackmail-hoteliers.jpg"
                        />{" "}
                        Trip Advisor
                      </div>

                      <ReactStars
                        className="stars"
                        count={5}
                        value={individualHotelData.ta_rating}
                        size={20}
                        edit={false}
                        color2={"#00af87"}
                        color1={"#dcdcdc"}
                      />
                    </div>
                    <div className="row justify-content-center">
                      <div class="otherRating text-center">
                        <img
                          style={{ width: "10%", height: "85%" }}
                          src="https://a.cdn-hotels.com/da/assets/s/63.0/images/brands/hcom/logos/logo-social.jpg"
                        />{" "}
                        Hotels.com
                      </div>
                      <ReactStars
                        className="stars"
                        count={5}
                        value={individualHotelData.hdc_rating / 2}
                        size={20}
                        edit={false}
                        color2={"#d32f2f"}
                        color1={"#dcdcdc"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  id="pics and amentities"
                  className="col-lg-8 col-sm-12 col-12"
                  style={{ marginLeft: "0", marginTop: "1%" }}
                >
                  <div id="pics sliding show">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide w-100 h-50"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        {individualHotelData.img.map((item, index) => {
                          if (index == 0)
                            return (
                              <li
                                data-target="#carouselExampleIndicators"
                                data-slide-to={index}
                                className="active"
                              />
                            );
                          else
                            return (
                              <li
                                data-target="#carouselExampleIndicators"
                                data-slide-to={index}
                              />
                            );
                        })}
                      </ol>
                      <div className="carousel-inner">
                        {individualHotelData.img.map((item, index) => {
                          if (index == 0)
                            return (
                              <div className="carousel-item active">
                                <img
                                  className="d-block w-100"
                                  src={individualHotelData.img[index]}
                                  alt="hotel img"
                                />
                              </div>
                            );
                          else
                            return (
                              <div className="carousel-item">
                                <img
                                  className="d-block w-100"
                                  src={individualHotelData.img[index]}
                                  alt="hotel img"
                                />
                              </div>
                            );
                        })}
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                  <div class="bigTab">
                    <div
                      id="amenities"
                      className="expandable-content overview-sections"
                      style={{ marginTop: "15px", minHeight: "180px" }}
                    >
                      <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <a
                            class="tabName nav-item nav-link active"
                            id="amentities-tab"
                            data-toggle="tab"
                            href="#amentities"
                            role="tab"
                            aria-controls="amentities"
                            aria-selected="true"
                          >
                            <i class="fas fa-concierge-bell" /> Main Amentities
                          </a>
                          <a
                            class="tabName nav-item nav-link"
                            id="airports-tab"
                            data-toggle="tab"
                            href="#airports"
                            role="tab"
                            aria-controls="airports"
                            aria-selected="false"
                          >
                            <i class="fas fa-plane" /> Nearby Airports
                          </a>
                          <a
                            class="tabName nav-item nav-link"
                            id="top-spots-tab"
                            data-toggle="tab"
                            href="#top-spots"
                            role="tab"
                            aria-controls="top-spots"
                            aria-selected="false"
                          >
                            <i class="fas fa-fire" /> Top Spots
                          </a>
                        </div>
                      </nav>
                      <div class="tab-content" id="nav-tabContent">
                        <div
                          class="tabContent tab-pane fade show active"
                          id="amentities"
                          role="tabpanel"
                          aria-labelledby="amentities-tab"
                        >
                          <div className="row">
                            <div
                              id="amentities row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.amenities
                                .slice(
                                  0,
                                  individualHotelData.amenities.length / 2
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="amentities col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-check"
                                          style={{ color: "#3e6e00" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div
                              id="amentities row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.amenities
                                .slice(
                                  individualHotelData.amenities.length / 2,
                                  individualHotelData.amenities.length
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="amentities col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-check"
                                          style={{ color: "#3e6e00" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <div
                          class="tabContent tab-pane fade"
                          id="airports"
                          role="tabpanel"
                          aria-labelledby="airports-tab"
                        >
                          <div className="row">
                            <div
                              id="airports row"
                              className="col-lg-12 col-sm-12 col-12"
                            >
                              {individualHotelData.airports.map((item, key) => {
                                return (
                                  <div class="tabContent">
                                    <div
                                      className="col"
                                      style={{ color: "#808080" }}
                                    >
                                      <i
                                        class="fas fa-plane-departure"
                                        style={{ color: "#568cba" }}
                                      />{" "}
                                      {item}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="top-spots"
                          role="tabpanel"
                          aria-labelledby="top-spots-tab"
                        >
                          <div className="row">
                            <div
                              id="amentities row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.top_spots
                                .slice(
                                  0,
                                  individualHotelData.top_spots.length / 2
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="top_spots col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-map-marker-alt"
                                          style={{ color: "#c90d1f" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div
                              id="top_spots row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.top_spots
                                .slice(
                                  individualHotelData.top_spots.length / 2,
                                  individualHotelData.top_spots.length
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="top_spots col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-map-marker-alt"
                                          style={{ color: "#c90d1f" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mobileTab">
                    <div
                      id="amenitiesMobile"
                      className="expandable-content overview-sections"
                      style={{ marginTop: "15px", minHeight: "180px" }}
                    >
                      <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <a
                            class="tabName nav-item nav-link active"
                            id="amentitiesM-tab"
                            data-toggle="tab"
                            href="#amentitiesM"
                            role="tab"
                            aria-controls="amentitiesM"
                            aria-selected="true"
                          >
                            <i class="fas fa-concierge-bell" /> Amentities
                          </a>
                          <a
                            class="tabName nav-item nav-link"
                            id="airportsM-tab"
                            data-toggle="tab"
                            href="#airportsM"
                            role="tab"
                            aria-controls="airportsM"
                            aria-selected="false"
                          >
                            <i class="fas fa-plane" /> Airports
                          </a>
                          <a
                            class="tabName nav-item nav-link"
                            id="top-spotsM-tab"
                            data-toggle="tab"
                            href="#top-spotsM"
                            role="tab"
                            aria-controls="top-spotsM"
                            aria-selected="false"
                          >
                            <i class="fas fa-fire" /> Spots
                          </a>
                        </div>
                      </nav>
                      <div class="tab-content" id="nav-tabContent">
                        <div
                          class="tabContent tab-pane fade show active"
                          id="amentitiesM"
                          role="tabpanel"
                          aria-labelledby="amentitiesM-tab"
                        >
                          <div className="row">
                            <div
                              id="amentitiesM row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.amenities
                                .slice(
                                  0,
                                  individualHotelData.amenities.length / 2
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="amentitiesM col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-check"
                                          style={{ color: "#3e6e00" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div
                              id="amentitiesM row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.amenities
                                .slice(
                                  individualHotelData.amenities.length / 2,
                                  individualHotelData.amenities.length
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="amentitiesM col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-check"
                                          style={{ color: "#3e6e00" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <div
                          class="tabContent tab-pane fade"
                          id="airportsM"
                          role="tabpanel"
                          aria-labelledby="airportsM-tab"
                        >
                          <div className="row">
                            <div
                              id="airportsM row"
                              className="col-lg-12 col-sm-12 col-12"
                            >
                              {individualHotelData.airports.map((item, key) => {
                                return (
                                  <div class="tabContent">
                                    {console.log("airports")}
                                    <div
                                      className="col"
                                      style={{ color: "#808080" }}
                                    >
                                      <i
                                        class="fas fa-plane-departure"
                                        style={{ color: "#568cba" }}
                                      />{" "}
                                      {item}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="top-spotsM"
                          role="tabpanel"
                          aria-labelledby="top-spotsM-tab"
                        >
                          <div className="row">
                            <div
                              id="amentitiesM row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.top_spots
                                .slice(
                                  0,
                                  individualHotelData.top_spots.length / 2
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="top_spotsM col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-map-marker-alt"
                                          style={{ color: "#c90d1f" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div
                              id="top_spotsM row"
                              className="col-lg-6 col-sm-12 col-12"
                            >
                              {individualHotelData.top_spots
                                .slice(
                                  individualHotelData.top_spots.length / 2,
                                  individualHotelData.top_spots.length
                                )
                                .map((item, key) => {
                                  return (
                                    <div class="tabContent">
                                      <div
                                        id="top_spotsM col"
                                        className="col"
                                        style={{ color: "#808080" }}
                                      >
                                        <i
                                          class="fas fa-map-marker-alt"
                                          style={{ color: "#c90d1f" }}
                                        />{" "}
                                        {item}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col maps" style={{ marginTop: "1%" }}>
                  <div class="priceAndRate">
                    <h2
                      className="text-center"
                      style={{ fontSize: 30, color: "#3ba711" }}
                    >
                      {discountRate < 1
                        ? ((1 - discountRate) * 100).toFixed(0) + "% OFF!"
                        : null}
                    </h2>
                    <h2
                      className="text-center"
                      style={{ fontSize: 40, color: "#3ba711" }}
                    >
                      ${individualHotelData.price.singlePrice * discountRate}
                    </h2>
                    <div>
                      <AnchorLink href="#table1">
                        <Button class="seeRoomBtn">See Rooms</Button>
                      </AnchorLink>
                    </div>
                    <div className="row" style={{ marginTop: "2%" }}>
                      <div className="col">
                        <div class="otherRating">
                          <img
                            style={{ width: "20%", height: "18%" }}
                            src="https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/8/9/3/673987-1-eng-GB/TripAdvisor-being-used-to-blackmail-hoteliers.jpg"
                          />{" "}
                          Trip Advisor
                        </div>

                        <ReactStars
                          className="stars"
                          count={5}
                          value={individualHotelData.ta_rating}
                          size={22}
                          edit={false}
                          color2={"#00af87"}
                          color1={"#dcdcdc"}
                        />
                      </div>
                      <div className="col">
                        <div class="otherRating">
                          <img
                            style={{ width: "14%", height: "5%" }}
                            src="https://a.cdn-hotels.com/da/assets/s/63.0/images/brands/hcom/logos/logo-social.jpg"
                          />{" "}
                          Hotels.com
                        </div>
                        <ReactStars
                          className="stars"
                          count={5}
                          value={individualHotelData.hdc_rating / 2}
                          size={22}
                          edit={false}
                          color2={"#d32f2f"}
                          color1={"#dcdcdc"}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="shrtMap">
                    <div className="row">
                      {displayGoogleMaps}
                    </div>
                  </div>

                  <div class="longMap">
                    <div className="row">
                      {displayGoogleMapsLong}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row-xl-12 row-lg-12 row-sm-12 row-12"
                style={{ margin: "auto", zIndex: 10 }}
              >
                <section id="table1">
                  <table
                    class="table table-bordered"
                    style={{ marginTop: "3%" }}
                  >
                    <thead>
                      <tr>
                        <th>Room Type</th>
                        <th>Today's Price (Per Night)</th>
                        <th>Book Now</th>
                      </tr>
                    </thead>
                    <tbody>
                      {individualHotelData.singleAvailability ? (
                        <tr>
                          <th scope="row">Single Room</th>
                          <td
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#3ba711"
                            }}
                          >
                            $
                            {(
                              individualHotelData.price.singlePrice *
                              discountRate
                            ).toFixed(0)}
                          </td>
                          <td>
                            <Link
                              onClick={() =>
                                this.saveBookingInfo(
                                  "single",
                                  individualHotelData.price.singlePrice
                                )
                              }
                              to="/payment"
                            >
                              <Button class="bookBtn">Book Single Room</Button>
                              <Button class="bookBtnShrt">Book Single</Button>
                            </Link>
                          </td>
                        </tr>
                      ) : null}
                      {individualHotelData.doubleAvailability ? (
                        <tr>
                          <th scope="row">Double Room</th>
                          <td
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#3ba711"
                            }}
                          >
                            $
                            {(
                              individualHotelData.price.doublePrice *
                              discountRate
                            ).toFixed(0)}
                          </td>
                          <td>
                            <Link
                              to="/payment"
                              onClick={() =>
                                this.saveBookingInfo(
                                  "double",
                                  individualHotelData.price.doublePrice
                                )
                              }
                            >
                              <Button class="bookBtn">Book Double Room</Button>
                              <Button class="bookBtnShrt">Book Double</Button>
                            </Link>
                          </td>
                        </tr>
                      ) : null}
                      {individualHotelData.kingAvailability ? (
                        <tr>
                          <th scope="row">King Room</th>
                          <td
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#3ba711"
                            }}
                          >
                            $
                            {(
                              individualHotelData.price.kingPrice * discountRate
                            ).toFixed(0)}
                          </td>
                          <td>
                            <Link
                              to="/payment"
                              onClick={() =>
                                this.saveBookingInfo(
                                  "king",
                                  individualHotelData.price.kingPrice
                                )
                              }
                            >
                              <Button class="bookBtn">Book King Room</Button>
                              <Button class="bookBtnShrt">Book King</Button>
                            </Link>
                          </td>
                        </tr>
                      ) : null}
                      {individualHotelData.studioAvailability ? (
                        <tr>
                          <th scope="row">Studio Suite</th>
                          <td
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#3ba711"
                            }}
                          >
                            $
                            {(
                              individualHotelData.price.suitePrice *
                              discountRate
                            ).toFixed(0)}
                          </td>
                          <td>
                            <Link
                              to="/payment"
                              onClick={() =>
                                this.saveBookingInfo(
                                  "studio",
                                  individualHotelData.price.suitePrice
                                )
                              }
                            >
                              <Button class="bookBtn">Book Studio Suite</Button>
                              <Button class="bookBtnShrt">Book Studio</Button>
                            </Link>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </section>
              </div>
              {console.log(individualHotelData)}
              <p class="reviewSection">
                <i class="fas fa-poll" style={{ color: "#0c4b78" }} /> Reviews (
                {individualHotelData.review.length})
              </p>
              <div class="list-group" style={{ marginBottom: "2%" }}>
                {individualHotelData.review.map((item, index) => {
                  return (
                    <a class="list-group-item list-group-item-action">
                      <div class="d-flex w-100 justify-content-between">
                        <p
                          class="mb-1"
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#0c4b78"
                          }}
                        >
                          {individualHotelData.review[index].reviewName}
                        </p>
                        <small>
                          {
                            individualHotelData.review[index].reviewDate.split(
                              "T"
                            )[0]
                          }
                        </small>
                      </div>
                      <small>
                        <ReactStars
                          className="stars"
                          count={5}
                          value={individualHotelData.review[index].reviewStar}
                          size={16}
                          edit={false}
                          color2={"#0c4b78"}
                          color1={"#dcdcdc"}
                        />
                      </small>
                      <p
                        class="mb-1"
                        style={{
                          fontSize: 15
                        }}
                      >
                        {individualHotelData.review[index].reviewText}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  individualHotelData: state.individualHotelData,
  query: state.query
});
export default connect(
  mapStateToProps,
  { saveBooking, getIndividualHotelResult }
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8"
  })(IndivHotel)
);
