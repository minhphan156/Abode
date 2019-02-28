import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TablePagination from '@material-ui/core/TablePagination';

class searchResultOverview extends Component {

	render() {

		return (
			<div>
				<Grid container spacing={24}>
					<Grid item xs={10} style={{ marginLeft: 30 }}>
						<Card>
							<Typography>Sandro search bar here</Typography>
						</Card>
					</Grid>

					<Grid item xs={2} style={{ marginLeft: 30 }}>
						<Card style={{ marginBottom: 10 }}>
							<div style={{ margin: 20 }}>

								<Typography >Star Rating</Typography>
								<FormControlLabel control={<Checkbox value="star1" />} label="1 star" style={{ float: "left", width: '50%' }} />
								<FormControlLabel control={<Checkbox value="star2" />} label="2 stars" style={{ float: "left", width: '50%' }} />
								<FormControlLabel control={<Checkbox value="star3" />} label="3 stars" style={{ float: "left", width: '50%' }} />
								<FormControlLabel control={<Checkbox value="star4" />} label="4 stars" style={{ float: "left", width: '50%' }} />
								<FormControlLabel control={<Checkbox value="star5" />} label="5 stars" style={{ float: "left", width: '50%' }} />
							</div>

						</Card>

						<Card style={{ marginBottom: 10 }}>

							<div style={{ margin: 20 }}>

								<Typography>Review Score</Typography>
								<FormControlLabel control={<Checkbox value="star1" />} label="Awesome: 9+" style={{ float: "left", width: '60%' }} />
								<FormControlLabel control={<Checkbox value="star2" />} label="Very good: 8+" style={{ float: "left", width: '60%' }} />
								<FormControlLabel control={<Checkbox value="star3" />} label="Good: 7+" style={{ float: "left", width: '60%' }} />
								<FormControlLabel control={<Checkbox value="star4" />} label="Pleasant: 6+" style={{ float: "left", width: '60%' }} />
								<FormControlLabel control={<Checkbox value="star5" />} label="No rating" style={{ float: "left", width: '60%' }} />
							</div>

						</Card>

					</Grid>
					<Grid item xs={7}>
						<Card style={{ marginBottom: 10 }}>
							<CardMedia
								style={{ margin: 20, width: 200, height: 200, float: "left" }}
								image={require("./hotel-img.jpg")}
								title="Hotel Image"
							/>
							<div style={{ float: "left" }}
							>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Hotel Central park
																	</Typography>
									<Typography component="p">
										Manhattan, New York - Show on map
																	</Typography>
								</CardContent>
							</div>
							<div style={{ float: "right" }}
							>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Excellent 8.9
																	</Typography>

									<Typography component="p">
										1.284 reviews
																	</Typography>
									<Typography component="p">
										$140
																	</Typography>
								</CardContent>
							</div>
						</Card>

						<Card style={{ marginBottom: 10 }}>
							<CardMedia
								style={{ margin: 20, width: 200, height: 200, float: "left" }}
								image={require("./hotel-img-2.jpg")}
								title="Hotel Image"
							/>
							<div style={{ float: "left" }}
							>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Minh's giant cave
																	</Typography>
									<Typography component="p">
										under the bridge, San Jose - Show on map
																	</Typography>
								</CardContent>
							</div>
							<div style={{ float: "right" }}
							>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Excellent 1000
																	</Typography>

									<Typography component="p">
										1.284000 reviews
																	</Typography>
									<Typography component="p">
										$1000
																	</Typography>
								</CardContent>
							</div>
						</Card>
						<TablePagination
							style={{ float: "right" }}
							rowsPerPageOptions={[5, 10, 25]}
							count={100}
							page={9}
							rowsPerPage={10}
						/>
					</Grid>
				</Grid>

			</div>);
	}

}

export default searchResultOverview;