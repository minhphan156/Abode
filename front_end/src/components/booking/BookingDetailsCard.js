import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import lightBlue from "@material-ui/core/colors/lightBlue";
import SvgIcon from "@material-ui/core/SvgIcon";
import { connect } from "react-redux";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function BookingDetailsCard(props) {
  const { classes } = props;
  const bookingData = props.bookingData;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {bookingData.name}
          <HomeIcon
            className={classes.icon}
            color="primary"
            fontSize="large"
            component={svgProps => (
              <svg {...svgProps}>
                <defs>
                  <linearGradient id="gradient1">
                    <stop offset="30%" stopColor={lightBlue[500]} />
                    <stop offset="70%" stopColor={lightBlue[50]} />
                  </linearGradient>
                </defs>
                {React.cloneElement(svgProps.children[0], {
                  fill: "url(#gradient1)"
                })}
              </svg>
            )}
          />
        </Typography>
        <Typography variant="h5" component="h2">
          Confirmation Number: 123241
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Booking Date: 2/2/2019
        </Typography>
        <Typography component="p">
          Room Type: Double room
          <br />
          {"Number of Nights: 4"}
          <br />
          {"Check In: 4/2/2019"}
          <br />
          {"Check Out: 4/6/2019"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <i class="material-icons">directions_run</i>Raring to go?
        </Button>
        {/* Leads to video about attractions in that city */}
      </CardActions>
    </Card>
  );
}

BookingDetailsCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(BookingDetailsCard));
