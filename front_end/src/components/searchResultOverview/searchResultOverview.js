import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
  FormControlLabel,
  TablePagination,
  CardHeader
} from "@material-ui/core";
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import { connect } from "react-redux";
import { getIndividualHotelResult } from "../../actions/searchResultActions";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { submitQuery, saveQuery } from "../../actions/searchActions";

const styles = {
  rating: { float: "left", width: "100%" },
  imageStyle: { margin: 20, width: 200, height: 200, float: "left" }
};

class searchResultOverview extends Component {


  goToPreviousPage(queryResult,searchQuery){
    queryResult.pageNumber--;
    let lastIndex = queryResult.lastIndex - 2*searchQuery.numResults
    if(lastIndex < 0 || queryResult.pageNumber === 1)
      {lastIndex = 0}
      const newQuery = {
        destinationName:searchQuery.destinationName,
        checkIn:searchQuery.checkIn,
        checkOut:searchQuery.checkOut,
        numberRooms:searchQuery.numberRooms,
        lastIndex:lastIndex,
        numResults:searchQuery.numResults,
        pageNumber:queryResult.pageNumber
      }
      this.props.submitQuery(newQuery);
      this.props.saveQuery(newQuery);
  }

  goToNextPage(queryResult,searchQuery){
    queryResult.pageNumber++;
      const newQuery = {
        destinationName:searchQuery.destinationName,
        checkIn:searchQuery.checkIn,
        checkOut:searchQuery.checkOut,
        numberRooms:searchQuery.numberRooms,
        lastIndex:queryResult.lastIndex,
        numResults:searchQuery.numResults,
        pageNumber:queryResult.pageNumber
      }
      this.props.submitQuery(newQuery);
      this.props.saveQuery(newQuery);
  }

  render() {
    let { classes } = this.props;
    let hotels;
    const queryResult = this.props.query.hotelQuery;
    const hotelResult = this.props.query.hotelQuery.results;
    const searchQuery = this.props.query.searchQuery;
    if (hotelResult.length) {
      hotels = hotelResult.map(hotel => {
        return (
          <Card style={{ marginBottom: 10 }}>
            
              <CardContent>
                <div>
                <Link
                  to="/indiv-hotel"
                  onClick={() =>
                    this.props.getIndividualHotelResult({
                      id: hotel.hotelID,
                      checkIn: searchQuery.checkIn,
                      checkOut: searchQuery.checkOut,
                      numberRooms: searchQuery.numberRooms
                    })
                  }
                >
                <div className="row">
                <div className="col-10" style={{align:'left'}}>
                      <Typography gutterBottom variant="h5" component="h2" style={{display:'inline'}}>
                        {hotel.name}
                      </Typography>
                </div>
                <div className="col-2" style={{align:'right'}}>
                        <Typography gutterBottom variant="h5" component="h5" style={{color:"green", display:'inline'}} align="right">
                          ${hotel.price}
                        </Typography>
                </div>
                </div>
                </Link>
                
                <Typography style={{color: "#808080", marginLeft:'1%', marginTop:'1%'}} component="h3">{hotel.city}</Typography>
                </div>
              </CardContent>
              <div style={{float: "left"}}>
            <CardMedia
              className={classes.imageStyle}
              image={`${hotel.img}`}
              title="Hotel Image"
            />
            </div>
            <div style={{ float: "right" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{marginRight:'0'}}>
                <h5 >{hotel.star_rates}-Star Hotel</h5>
                <ReactStars
                    count={5}
                    value={hotel.star_rates}
                    size={22}
                    edit={false}
                    color2={"#FFD700"}
                    style={{align:'right'}}
                  />
                </Typography>

                <Typography variant="h5" component="h5">Guest Rating: {hotel.guest_rate}</Typography>
                
                      <Link
                      to="/indiv-hotel"
                      onClick={() =>
                        this.props.getIndividualHotelResult({
                          id: hotel.hotelID,
                          checkIn: searchQuery.checkIn,
                          checkOut: searchQuery.checkOut,
                          numberRooms: searchQuery.numberRooms
                        })
                      }
                    >
                       <button 
                      type="button" 
                      class="btn btn-success h-100"
                      >
                        Book Now
                      </button>
                        </Link>
              </CardContent>
            </div>
          </Card>
        );
      });
    }
    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item xs={10} style={{ marginLeft: 30 }}>
            <SearchWidget />
          </Grid>
          <Grid item xs={2} style={{ marginLeft: 30 }}>
            <Card style={{ marginBottom: 10 }}>
              <div style={{ margin: 20 }}>
                <Typography>Star Rating</Typography>
                <FormControlLabel
                  control={<Checkbox value="star1" />}
                  label="1 star"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star2" />}
                  label="2 stars"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star3" />}
                  label="3 stars"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star4" />}
                  label="4 stars"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star5" />}
                  label="5 stars"
                  className={classes.rating}
                />
              </div>
            </Card>
            <Card style={{ marginBottom: 10 }}>
              <div style={{ margin: 20 }}>
                <Typography>Review Score</Typography>
                <FormControlLabel
                  control={<Checkbox value="Awesome" />}
                  label="Awesome: 9+"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="Verygood" />}
                  label="Very good: 8+"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="Good" />}
                  label="Good: 7+"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="Pleasant" />}
                  label="Pleasant: 6+"
                  className={classes.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="NoRating" />}
                  label="No rating"
                  className={classes.rating}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={7}>
            {hotels}

          {/* Pagination, please fix the style */}
            <Grid item sm={6}>
            <div className="row" style={{marginBottom:40}}>
{/* previous page button */}
            <div classNmae="col-4" style={{align:'left'}}>
            {queryResult.pageNumber === 1? 
            <button className="btn btn-outline-danger" disabled>Previous</button>
            :<button className="btn btn-outline-danger" onClick={() => this.goToPreviousPage(queryResult,searchQuery)}>Previous</button>}
            </div>
{/* show current page */}
            <div classNmae="col-4" style={{align:'center',marginLeft:50,marginRight:50}}>
            <h6 style={{fontWeight: 'bold'}}>{queryResult.pageNumber}</h6>
            </div>
{/* Next page button */}
            <div classNmae="col-4" style={{align:'right'}}>
            {queryResult.nextExists ?
            <button className="btn btn-outline-danger"
            onClick={() => this.goToNextPage(queryResult,searchQuery)}
            >Next</button> 
            :<button className="btn btn-outline-danger" disabled>Next</button>}
            </div>

            </div>
          </Grid>


          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.query
});
export default connect(
  mapStateToProps,
  { getIndividualHotelResult,submitQuery, saveQuery }
)(withStyles(styles)(searchResultOverview));
