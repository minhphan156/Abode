import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
  FormControlLabel,
  TablePagination
} from "@material-ui/core";
import SearchWidget from "../landing_page/search_widget/SearchWidget";
import { connect } from "react-redux";
import { getIndividualHotelResult } from "../../actions/searchResultActions";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  rating: { float: "left", width: "100%" },
  imageStyle: { margin: 20, width: 200, height: 200, float: "left" }
};

class searchResultOverview extends Component {
  render() {
    let { classes } = this.props;
    let hotels;
    const queryResult = this.props.query.hotelQuery;
    const searchQuery = this.props.query.searchQuery;
    if (queryResult.length) {
      hotels = queryResult.map(hotel => {
        return (
          <Card style={{ marginBottom: 10 }}>
            <CardMedia
              className={classes.imageStyle}
              image={`${hotel.img}`}
              title="Hotel Image"
            />
            <div style={{ float: "left" }}>
              <CardContent>
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
                  <Typography gutterBottom variant="h5" component="h2">
                    {hotel.name}
                  </Typography>
                </Link>
                <Typography component="p">{hotel.city}</Typography>
              </CardContent>
            </div>
            <div style={{ float: "right" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {hotel.star_rates}
                </Typography>

                <Typography component="p">{hotel.guest_rate}</Typography>
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
            <TablePagination
              style={{ float: "right" }}
              rowsPerPageOptions={[5, 10, 25]}
              count={100}
              page={9}
              rowsPerPage={10}
            />
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
  { getIndividualHotelResult }
)(withStyles(styles)(searchResultOverview));
