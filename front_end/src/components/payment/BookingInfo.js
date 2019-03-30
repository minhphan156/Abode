import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./PaymentPage.css";

export class BookingInfo extends Component {
  render() {
    const time = moment().format("dddd, MMMM Do YYYY");

    const { individualHotelData } = this.props.individualHotelData;

    const query = this.props.query;

    const roomSelection = this.props.roomSelection;

    return (
      <React.Fragment>
        <br />
        <br />
        <Paper style={{ margin: "10%", backgroundColor: "#e3ecf7" }}>
          <div>
            <img src={individualHotelData.img[0]} alt="image" />
          </div>
          <h4
            className="display-4 test-left"
            style={{ marginTop: "5%", fontSize: 14, fontWeight: "bold" }}
          >
            {individualHotelData.name}
          </h4>
          <h5
            className="display-4 test-left"
            style={{ fontSize: 14, color: "#808080" }}
          >
            {individualHotelData.street}, {individualHotelData.city}
          </h5>

          <Card style={{ marginTop: "2%" }}>
            <CardContent>
              <div className=".payment-row">
                <p style={{ fontWeight: "bold" }}>Check-in: </p>
                {/* {this.props.query.searchQuery.destinationName} */}
                {/* <p> {query.searchQuery.checkIn.format("dddd, MMMM Do YYYY")}</p> */}
              </div>
              <div className=".payment-row">
                <p style={{ fontWeight: "bold" }}>Check-out: </p>
                <p>
                  {" "}
                  {/* {query.searchQuery.checkOut.format("dddd, MMMM Do YYYY")} */}
                </p>
              </div>
              <hr />
              <p>1-night stay</p>
            </CardContent>
          </Card>
          <h4 className="text-center">Summary</h4>
          <Card style={{ marginTop: "2%" }}>
            <CardContent>
              <h5 style={{ marginTop: "1%" }}>
                {/* {query.searchQuery.numberRooms} Room: {roomSelection} */}
              </h5>
              <hr />
              <div>
                <p>
                  {/* {query.searchQuery.checkIn.format("dddd, MMMM Do YYYY")}{" "} */}
                  $119.20
                </p>
                <p>Taxes and fees $19.61</p>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-center">Total to pay now: $138.82</h3>
          <Card>
            <CardContent>
              <p style={{ margin: "1%", fontWeight: "bold" }}>
                This price may increase if you book later.
              </p>
            </CardContent>
          </Card>
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  individualHotelData: state.individualHotelData,
  query: state.query,
  roomSelection: state.roomSelection
});

export default connect(
  mapStateToProps,
  {}
)(BookingInfo);
