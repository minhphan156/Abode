import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./PaymentPage.css";

export class BookingInfo extends Component {
  render() {
    const { tempBookingData } = this.props.bookingData;

    var duration = moment.duration(
      tempBookingData.checkOut.diff(tempBookingData.checkIn)
    );
    var days = duration.asDays();

    return (
      <React.Fragment>
        <br />
        <br />
        <Paper style={{ margin: "10%", backgroundColor: "#e3ecf7" }}>
          <div>
            <img src={tempBookingData.hotelImage} alt="image" />
          </div>
          <h4
            className="display-4 test-left"
            style={{ marginTop: "5%", fontSize: 14, fontWeight: "bold" }}
          >
            {tempBookingData.name}
          </h4>
          <h5
            className="display-4 test-left"
            style={{ fontSize: 14, color: "#808080" }}
          >
            {tempBookingData.street}, {tempBookingData.city}
          </h5>

          <Card style={{ marginTop: "2%" }}>
            <CardContent>
              <div className=".payment-row">
                <p style={{ fontWeight: "bold" }}>Check-in: </p>
                <p> {tempBookingData.checkIn.format("dddd, MMMM Do YYYY")}</p>
              </div>
              <div className=".payment-row">
                <p style={{ fontWeight: "bold" }}>Check-out: </p>
                <p>{tempBookingData.checkOut.format("dddd, MMMM Do YYYY")}</p>
              </div>
              <hr />
              <p># of Nights: {days}</p>
            </CardContent>
          </Card>
          <h4 className="text-center">Summary</h4>
          <Card style={{ marginTop: "2%" }}>
            <CardContent>
              <h5 style={{ marginTop: "1%" }}>
                {tempBookingData.numberRooms} Room: {tempBookingData.roomType}
              </h5>
              <hr />
              <div>
                <p>Subtotal: $ {tempBookingData.subtotal.toFixed(2)}</p>
                <p>
                  Taxes and fees (10%) ${" "}
                  {(tempBookingData.subtotal * 0.1).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-center">
            Total to pay now: ${" "}
            {(
              tempBookingData.subtotal * 0.1 +
              tempBookingData.subtotal
            ).toFixed(2)}
          </h3>
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
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  {}
)(BookingInfo);
