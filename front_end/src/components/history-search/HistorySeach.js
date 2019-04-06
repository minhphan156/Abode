import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

class HistorySearch extends Component {
  constructor() {
    super();
    this.state = {
      bookingID:"",
      email:"",
      mockID:"123",
      mockEmail:"123@gmail.com",
      match:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchClick(){
    const newQuery = {
      bookingID: this.state.bookingID,
      email: this.state.email
    };
    this.props.submitQuery(newQuery);
    this.props.saveQuery(newQuery);
  };

  handleChange = ({target:{name,value}}) => {
    this.setState({
      [name]:value
    });
  };


  render() {
    const { historyData } = this.props.searchHistoryData;


    return (
      <div
        id="whole page"
        className="container"
        style={{ marginTop: "2%", minHeight:window.innerHeight-223}}
      >
        <h1 className="text-center"
          style={{ color: '#3d4e96', marginTop: '45px' }}
        >Search Travel History</h1>

        <div style={{marginTop:'45px'}}>
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
            <label class="sr-only" for="inlineFormInputName2">BookingID</label>
            <input type="text"
                   name="bookingID"
                   value={this.state.bookingID}  
                   className="form-control mb-2 mr-sm-2"
                   placeholder="Enter Booking ID" 
                   onChange={this.handleChange}/>
            </div>
            <div className='col'>
              <label class="sr-only" for="inlineFormInputName2">Email</label>
              <input type="text"
                     name="email"
                     value={this.state.email}
                     className="form-control mb-2 mr-sm-2"
                     placeholder="Enter Your Email" 
                     onChange= {this.handleChange}/>  
            </div>
            <div className='col'>
              <Button type="submit" 
                      class="buttonSearch" 
                      primary onClick={this.onSearchClick}>
                SEARCH
              </Button>
            </div>
          </div>
        </div>
        <div>
          {console.log(this.state)}
          {this.state.mockID === this.state.bookingID &&
           this.state.mockEmail === this.state.email ? (
            <h1> here comes again </h1>
            ):(
              <h1> not found </h1>
            )}
        </div>
      </div>
        );
    }
  }
  
const mapStateToProps = state => ({
  historyData: state.historyData
});

export default connect(
  mapStateToProps,
  {}
)(HistorySearch);