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
import { displayResultsOverview } from "../../actions/searchResultActions";

class searchResultOverview extends Component {
  render() {
    const result = this.props.result.result;
    let hotels;

    const styles = {
      rating: { float: "left", width: "100%" },
      imageStyle: { margin: 20, width: 200, height: 200, float: "left" }
    };
    if (result.length) {
      hotels = result.map(hotel => {
        return (
          <Card style={{ marginBottom: 10 }}>
            <CardMedia
              style={styles.imageStyle}
              image={require(`${hotel.img}`)}
              title="Hotel Image"
            />
            <div style={{ float: "left" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {hotel.name}
                </Typography>
                <Typography component="p">{hotel.city}</Typography>
              </CardContent>
            </div>
            <div style={{ float: "right" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {hotel.star_rates}
                </Typography>

                <Typography component="p">{hotel.guest_rate}</Typography>
                <Typography component="p">{hotel.price}</Typography>
              </CardContent>
            </div>
          </Card>
        );
      });
    }
    return (
      <div>
        <Grid container spacing={24}>
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
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star2" />}
                  label="2 stars"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star3" />}
                  label="3 stars"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star4" />}
                  label="4 stars"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="star5" />}
                  label="5 stars"
                  style={styles.rating}
                />
              </div>
            </Card>
            <Card style={{ marginBottom: 10 }}>
              <div style={{ margin: 20 }}>
                <Typography>Review Score</Typography>
                <FormControlLabel
                  control={<Checkbox value="Awesome" />}
                  label="Awesome: 9+"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="Verygood" />}
                  label="Very good: 8+"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="Good" />}
                  label="Good: 7+"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="Pleasant" />}
                  label="Pleasant: 6+"
                  style={styles.rating}
                />
                <FormControlLabel
                  control={<Checkbox value="NoRating" />}
                  label="No rating"
                  style={styles.rating}
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

const mapStateToProps = state => ({ result: state.searchResult });
export default connect(
  mapStateToProps,
  { displayResultsOverview }
)(searchResultOverview);
