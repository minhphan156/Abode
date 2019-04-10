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
import moment from "moment";

class IndivHotel extends Component {
  constructor() {
    super();
    this.state = {};
    this.saveBookingInfo = this.saveBookingInfo.bind(this);
  }

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
          <div style={{ margin:"auto", minHeight:window.innerHeight-180}}>
          {individualHotelData.hotelsRate === "" ? (
            <div class="d-flex justify-content-center">
            <div class="spinner-boarder text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            </div>
          ):(
            <div
            id="whole page"
            className="container"
            style={{ marginTop: "2%" }}
            >
            <div className="d-flex justify-content-center mt-3">
              <div className="col-12">
                <SearchWidget />
              </div>
            </div>
            <div id="hotel info" className="row" style={{marginTop:'3%'}}>
            <div id="hotel Name Address" className="col-lg-10 col-sm-12 col-12 text-left">
              <h1
                className="display-4 text-left"
                style={{ fontSize: 40, fontWeight: "bold" }}
              >
                {individualHotelData.name}
              </h1>
              <h2
                className="display-4 test-left"
                style={{ fontSize: 24, color: "#808080" }}
              >
                {individualHotelData.address}
              </h2>
            </div>
            <div id="hotel ratings" className="col-lg-2 col-sm-12 col-12">
              <div id="hotel star rating" className="row">
                <div className="col-lg-11 col-sm-6 col-6">
                  <h1
                    className="display-4"
                    style={{ fontSize: 24, color: "#FFD700" }}
                  >
                    {individualHotelData.star_rating} Star Hotel
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
                  />
                </div>
             </div>
             </div>
            </div>


            <div className="row">
              <div
                id="pics and amentities"
                className="col-lg-8 col-sm-12 col-12"
                style={{ marginLeft: "0", marginTop: "30px" }}
              >
                <div id="pics sliding show" className="container">
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

              <div className="col" style={{ marginTop: "2%", height:'590px'}}>
                <h2
                  className="text-center"
                  style={{ fontSize: 40, color: "#3ba711" }}
                >
                  ${individualHotelData.price.singlePrice}
                </h2>
                <AnchorLink href="#table1">
                  <button
                    type="button"
                    class="btn btn-primary h-10"
                    style={{ width: "100%" }}
                  >
                    See Rooms
                  </button>
                </AnchorLink>
                <div className="row" style={{ marginTop: "2%" }}>
                  <div className="col">
                    <h3 className="text-left" style={{ fontSize: 20 }}>
                      <img
                        style={{ width: "20%", height: "18%" }}
                        src="https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/8/9/3/673987-1-eng-GB/TripAdvisor-being-used-to-blackmail-hoteliers.jpg"
                      />{" "}
                      Trip Advisor
                    </h3>

                    <ReactStars
                      count={5}
                      value={individualHotelData.ta_rating}
                      size={22}
                      edit={false}
                      color2={"#00af87"}
                    />
                  </div>
                  <div className="col">
                    <h3 className="text-left" style={{ fontSize: 20 }}>
                      <img
                        style={{ width: "14%", height: "5%" }}
                        src="https://a.cdn-hotels.com/da/assets/s/63.0/images/brands/hcom/logos/logo-social.jpg"
                      />{" "}
                      Hotels.com
                    </h3>
                    <ReactStars
                      count={5}
                      value={individualHotelData.hdc_rating / 2}
                      size={22}
                      edit={false}
                      color2={"#d32f2f"}
                    />
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
                    height: "70%",
                    width: "97%",
                    marginTop: "1%",
                    align: "left"
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
                style={{ marginTop: "3%", position: "relative", z_index: 100 }}
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
                        <div className="col-lg-6 col-sm-12 col-12">
                          <button type="button" class="btn btn-primary h-100 w-100">
                            Book Single Room
                          </button>
                        </div>
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
                        <div className="col-lg-6 col-sm-12 col-12">
                          <button type="button" class="btn btn-primary h-100 w-100">
                            Book Double Room
                          </button>
                        </div>
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
                        <div className="col-lg-6 col-sm-12 col-12">
                          <button type="button" class="btn btn-primary h-100 w-100">
                            Book King Room
                          </button>
                        </div>
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
                        <div className="col-lg-6 col-sm-12 col-12">
                          <button type="button" class="btn btn-primary h-100 w-100">
                            Book Studio Suite
                          </button>
                        </div>
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
  { saveBooking }
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8"
  })(IndivHotel)
);
