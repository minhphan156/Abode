// TO DO:
//- add actual discounts, not dummy value '999'

import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import ReactStars from "react-stars";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { connect } from "react-redux";
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { saveBooking } from "../../actions/bookingActions";
import moment from "moment";

class IndivHotel extends Component {
  constructor() {
    super();
    this.state = {
      daysOfStay: null
    };
    this.saveBookingInfo = this.saveBookingInfo.bind(this);
  }

  saveBookingInfo(roomTypeSelected, price) {
    // IN HERE WE SAVE ALL THE INFO WE NEED FOR THE PAYMENT PAGE

    let tempBookingInfo = {
      name: this.props.individualHotelData.individualHotelData.name,
      street: this.props.individualHotelData.individualHotelData.street,
      city: this.props.individualHotelData.individualHotelData.city,
      roomType: roomTypeSelected,
      checkIn: this.props.query.searchQuery.checkIn,
      checkOut: this.props.query.searchQuery.checkOut,
      numRooms: this.props.query.searchQuery.numberRooms,
      subtotal:
        price *
        this.props.query.searchQuery.numberRooms *
        this.state.daysOfStay,
      discounts: 999, // needs to be updated!!!
      hotelImage: this.props.individualHotelData.individualHotelData.img[0]
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
      const { searchQuery } = this.props.query;

      var duration = moment.duration(
        searchQuery.checkOut.diff(searchQuery.checkIn)
      );

      this.state.daysOfStay = duration.asDays();

      return (
        <div>
          <div className="d-flex justify-content-center mt-3">
            <div className="col-12">
              <SearchWidget />
            </div>
          </div>
          <div
            id="whole page"
            className="container"
            style={{ marginTop: "2%" }}
          >
            <div className="row">
              <h1
                className="display-4 text-left col-10"
                style={{ fontSize: 40, fontWeight: "bold" }}
              >
                {individualHotelData.name}
              </h1>
              <h1
                className="display-4 text-center col-2"
                style={{ fontSize: 24, color: "#FFD700" }}
              >
                {individualHotelData.star_rates}
                <ReactStars
                  count={5}
                  value={4}
                  size={28}
                  edit={false}
                  color2={"#FFD700"}
                />
              </h1>
            </div>
            <h2
              className="display-4 test-left"
              style={{ fontSize: 24, color: "#808080" }}
            >
              {individualHotelData.street}, {individualHotelData.city}
            </h2>

            <div className="row">
              <div
                id="pics and amentities"
                className="col-8 w-75 h-75"
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
                    <div id="amentities row" className="col">
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
                    <div id="amentities row" className="col">
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

              <div className="col" style={{ marginTop: "0" }}>
                <h2
                  className="text-center"
                  style={{ fontSize: 40, color: "red" }}
                >
                  ${individualHotelData.price.singlePrice}
                </h2>
                <AnchorLink href="#table1">
                  <button
                    type="button"
                    class="btn btn-success h-10"
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
                      value={individualHotelData.tripAdvisorRate}
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
                      value={individualHotelData.hotelsRate}
                      size={22}
                      edit={false}
                      color2={"#d32f2f"}
                    />
                  </div>
                </div>
                <Map
                  google={this.props.google}
                  zoom={15}
                  center={{
                    lat: individualHotelData.lat,
                    lng: individualHotelData.alt
                  }}
                  style={{
                    height: "50%",
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
                      <td>${individualHotelData.price.singlePrice}</td>
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
                          <button type="button" class="btn btn-success h-100">
                            Book Single Room
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                  {individualHotelData.doubleAvailability ? (
                    <tr>
                      <th scope="row">Double Room</th>
                      <td>${individualHotelData.price.doublePrice}</td>
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
                          <button type="button" class="btn btn-success h-100">
                            Book Double Room
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}

                  {individualHotelData.kingAvailability ? (
                    <tr>
                      <th scope="row">King Room</th>
                      <td>${individualHotelData.price.kingPrice}</td>
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
                          <button type="button" class="btn btn-success h-100">
                            Book King Room
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                  {individualHotelData.studioAvailability ? (
                    <tr>
                      <th scope="row">Studio Suite</th>
                      <td>${individualHotelData.price.studioPrice}</td>
                      <td>
                        <Link
                          to="/payment"
                          onClick={() =>
                            this.saveBookingInfo(
                              "studio",
                              individualHotelData.price.studioPrice
                            )
                          }
                        >
                          <button type="button" class="btn btn-success h-100">
                            Book Studio Suite
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </section>
          </div>
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
