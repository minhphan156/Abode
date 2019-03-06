import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 14
  },
  footer: {
    backgroundColor: "#84ffff",
    fontSize: 14,
    variant: "body2",
    color: theme.palette.common.black
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(breakdown, qty, cost, tax, subtotal) {
  id += 1;
  return { id, breakdown, qty, cost, tax, subtotal };
}

const rows = [
  createData("Room Charge", 1, 20, 2, 22),
  createData("Maintenance Fee", 1, 20, 2, 22),
  createData("Administration Fee", 1, 20, 2, 22),
  createData("Utilities Fee", 1, 20, 2, 22)
];

const totalRow = [createData("Total", 4, 80, 4, 88)];

function BookingBreakdownTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Price Breakdown</CustomTableCell>
            <CustomTableCell align="right">Quantity</CustomTableCell>
            <CustomTableCell align="right">Cost</CustomTableCell>
            <CustomTableCell align="right">Service Tax</CustomTableCell>
            <CustomTableCell align="right">Sum</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.breakdown}
              </CustomTableCell>
              <CustomTableCell align="right">{row.qty}</CustomTableCell>
              <CustomTableCell align="right">{row.cost}</CustomTableCell>
              <CustomTableCell align="right">{row.tax}</CustomTableCell>
              <CustomTableCell align="right">{row.subtotal}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {totalRow.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.breakdown}
              </CustomTableCell>
              <CustomTableCell align="right">{row.qty}</CustomTableCell>
              <CustomTableCell align="right">{row.cost}</CustomTableCell>
              <CustomTableCell align="right">{row.tax}</CustomTableCell>
              <CustomTableCell align="right">{row.subtotal}</CustomTableCell>
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </Paper>
  );
}

BookingBreakdownTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookingBreakdownTable);
