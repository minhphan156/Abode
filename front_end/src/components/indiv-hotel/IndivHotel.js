// TO DO:
//- add actual discounts, not dummy value '999'

import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import ReactStars from "react-stars";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { connect } from "react-redux";
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import { Link } from "react-router-dom";
import { saveBooking } from "../../actions/bookingActions";
import { getIndividualHotelResult, clearData } from "../../actions/searchResultActions";
import moment from "moment";
import Button from "@material-ui/core/Button";
import {
  Grid,
  CircularProgress
} from "@material-ui/core";import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider,
} from "@material-ui/core";
import {
  Search,
  ExpandMore,
} from "@material-ui/icons";

import "./indivHotel.css";

class IndivHotel extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount(){
    this.props.clearData();
  }

  constructor() {
    super();
    this.state = {
      dataHolding:"",
    };
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

    let tempBookingInfo = {
      name: this.props.individualHotelData.individualHotelData.name,
      address: this.props.individualHotelData.individualHotelData.address,
      roomType: roomTypeSelected,
      checkIn: this.props.query.searchQuery.checkIn,
      checkOut: this.props.query.searchQuery.checkOut,
      numRooms: this.props.query.searchQuery.numberRooms,
      pricePerNight: price,
      // discounts: this.props.individualHotelData.individualHotelData.discount,
      discounts: 50, // needs to be updated!!!
      hotelImage: this.props.individualHotelData.individualHotelData.img[0],
      numberOfNights: days,
      subtotal: days * price * this.props.query.searchQuery.numberRooms
    };
    this.props.saveBooking(tempBookingInfo);
  }

  render() {
    if (
      this.props.individualHotelData.individualHotelData === null ||
      this.props.query.searchQuery === null
    ) {
      this.props.history.push("/");
      return null;
    } else {
      const { individualHotelData } = this.props.individualHotelData;
      return (  
          <div style={{ marginLeft: 40, marginRight: 40, minHeight:window.innerHeight-180}}>
          { individualHotelData.img.length === 0 ? (
          <div style={{marginLeft:'50%', marginTop:'10%'}}>
              <Grid item>
                <CircularProgress />
              </Grid>
          </div>
          ):(
            <div
            id="whole page"
            style={{ margin:'auto'}}
            >
            <div style={{margin:'auto'}}>
            <ExpansionPanel
            square="false"
            style={{ marginTop:'2%', width:'100%'}}
            >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2">
                <Search /> Search
              </Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                <SearchWidget/>
              </div>
            </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
            <div id="hotel info" className="row" style={{marginTop:'3%'}}>
            <div id="hotel Name Address" className="col-lg-10 col-sm-12 col-12 text-left">
              <p
                class = "hotelName"
              >
                {individualHotelData.name}
              </p>
              <p
                class="hotelAdd"
              >
                {individualHotelData.address}
              </p>
            </div>
            <div id="hotel ratings" className="col-lg-2 col-sm-12 col-12">
            <div class = "hotelStar">
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
                <div className="col-lg-1 col-sm-12 col-12" />
                <div className="col-lg-11 col-sm-12 col-12">
                  <ReactStars
                    count={5}
                    value={individualHotelData.star_rating}
                    size={28}
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
                <div className="col-lg-1 col-sm-12 col-12" />
                <div className="col-lg-11 col-sm-12 col-12">
                  <ReactStars
                    count={5}
                    value={individualHotelData.star_rating}
                    size={22}
                    edit={false}
                    color2={"#FFD700"}
                    color1={"#dcdcdc"}
                  />
                </div>
             </div>
             </div>
             </div>
            </div>

            <div class = "priceAndRateHeader" style={{marginTop:'2%'}}>
                <h2
                  className="text-center"
                  style={{ fontSize: 40, color: "#3ba711" }}
                >
                  ${individualHotelData.price.singlePrice}
                </h2>
                <div>
                <AnchorLink href="#table1">
                  <Button
                    class="seeRoomBtn"
                  >
                    See Rooms
                  </Button>
                </AnchorLink>
                </div>

                <div class="singleRate">
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
                  <div className="container" style={{marginTop:'0'}}>
                  <div className="row">
                    <div class="otherRating">
                      <img
                        style={{ width: "13%", height: "65%" }}
                        src="https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/8/9/3/673987-1-eng-GB/TripAdvisor-being-used-to-blackmail-hoteliers.jpg"
                      />{" "}
                      Trip Advisor
                    </div>

                    <ReactStars
                      count={5}
                      value={individualHotelData.ta_rating}
                      size={20}
                      edit={false}
                      color2={"#00af87"}
                      color1={"#dcdcdc"}
                    />
                  </div>
                  <div className="row">
                    <div class="otherRating">
                      <img
                        style={{ width: "11%", height: "60%" }}
                        src="https://a.cdn-hotels.com/da/assets/s/63.0/images/brands/hcom/logos/logo-social.jpg"
                      />{" "}
                      Hotels.com
                    </div>
                    <ReactStars
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
                style={{ marginLeft: "0", marginTop: "3%" }}
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
                <div
                  id="amenities"
                  className="expandable-content overview-sections"
                  style={{ marginTop: "10px", height: "auto" }}
                >
                  <h5 style={{ fontWeight: "bold" }}>
                    <i class="fas fa-concierge-bell" /> Main Amentities
                  </h5>
                  <div className="row">
                    <div id="amentities row" className="col-lg-6 col-sm-12 col-12">
                      {individualHotelData.amenities
                        .slice(0, individualHotelData.amenities.length / 2)
                        .map((item, key) => {
                          return (
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
                          );
                        })}
                    </div>
                    <div id="amentities row" className="col-lg-6 col-sm-12 col-12">
                      {individualHotelData.amenities
                        .slice(
                          individualHotelData.amenities.length / 2,
                          individualHotelData.amenities.length
                        )
                        .map((item, key) => {
                          return (
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
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col maps" 
                   style={{ marginTop: "3%", overflow:'hidden'}}
              >
              <div class = "priceAndRate">
                <h2
                  className="text-center"
                  style={{ fontSize: 40, color: "#3ba711" }}
                >
                  ${individualHotelData.price.singlePrice}
                </h2>
                <div>
                <AnchorLink href="#table1">
                  <Button
                    class="seeRoomBtn"
                  >
                    See Rooms
                  </Button>
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
                <div className='row'>
                <Map
                  google={this.props.google}
                  zoom={15}
                  center={{
                    lat: individualHotelData.lat,
                    lng: individualHotelData.alt
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                    marginTop: "1%"
                  }}
                >
                  <Marker
                    onClick={this.onMarkerClick}
                    name={"Current location"}
                    position={{
                      lat: individualHotelData.lat,
                      lng: individualHotelData.alt
                    }}
                  />
                  {console.log(individualHotelData.lat)}
                  {console.log(individualHotelData.alt)}
                  <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                      <h1>{individualHotelData.name}</h1>
                    </div>
                  </InfoWindow>
                </Map>
                </div>
              </div>
            </div>

            <div className="row-12">
            <section id="table1">
              <table
                class="table table-bordered"
                style={{ marginTop: "3%"}}
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
                      <td style={{fontSize:20,
                                  fontWeight:'bold', 
                                  color:'#3ba711'}}
                      >${individualHotelData.price.singlePrice}</td>
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
                          <Button
                            class="bookBtn"
                          >
                            Book Single Room
                          </Button>
                          <Button
                            class="bookBtnShrt"
                          >
                            Book Single
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                  {individualHotelData.doubleAvailability ? (
                    <tr>
                      <th scope="row">Double Room</th>
                      <td style={{fontSize:20,
                                  fontWeight:'bold', 
                                  color:'#3ba711'}}
                      >${individualHotelData.price.doublePrice}</td>
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
                          <Button
                            class="bookBtn"
                          >
                            Book Double Room
                          </Button>
                          <Button
                            class="bookBtnShrt"
                          >
                            Book Double
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                  {individualHotelData.kingAvailability ? (
                    <tr>
                      <th scope="row">King Room</th>
                      <td style={{fontSize:20,
                                  fontWeight:'bold', 
                                  color:'#3ba711'}}
                      >${individualHotelData.price.kingPrice}</td>
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
                          <Button
                            class="bookBtn"
                          >
                            Book King Room
                          </Button>
                          <Button
                            class="bookBtnShrt"
                          >
                            Book King
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                  {individualHotelData.studioAvailability ? (
                    <tr>
                      <th scope="row">Studio Suite</th>
                      <td style={{fontSize:20,
                                  fontWeight:'bold', 
                                  color:'#3ba711'}}
                      >${individualHotelData.price.suitePrice}</td>
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
                          <Button
                            class="bookBtn"
                          >
                            Book Studio Suite
                          </Button>
                          <Button
                            class="bookBtnShrt"
                          >
                            Book Studio
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </section>
            </div> 
          </div> )}
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
  { saveBooking, getIndividualHotelResult, clearData }
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8"
  })(IndivHotel)
);
