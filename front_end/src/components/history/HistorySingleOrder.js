import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import { addItemFromHistory } from "../../actions/cartActions";

class HistorySingleOrder extends Component {
  constructor() {
    super();
    this.state = {
      product_array: []
    };
    this.onCartClick = this.onCartClick.bind(this);
  }

  onCartClick(e, count) {
    const product = {
      name: e
    };
    this.props.addItemFromHistory(product, count);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Set profile_array
      const element = this.searchArray(profile);
      this.setState({
        product_array: profile.history[element].items
      });
    }
  }

  searchArray(profile) {
    const URL = window.location.pathname;
    const stringDate = URL.substring(9, 19);
    const stringTime = URL.substring(22, 30);
    const stringDT = stringDate + " " + stringTime;

    var i;
    for (i = 0; i < 99; i++) {
      if (profile.history[i].date === stringDT) {
        return i;
      }
    }
    return -1;
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />; // show the spinner while loading
    } else {
      dashboardContent = this._render(profile);
    }
    return <div>{dashboardContent}</div>;
  }

  _render(profile) {
    const element = this.searchArray(profile);

    const subtotal = profile.history[element].subtotal;
    const discount = profile.history[element].discount;
    const total = profile.history[element].total;
    const date = profile.history[element].date;
    const dateOnly = date.substring(0, 10);
    const timeNoSecond = date.substring(11, 16);
    const timeWithSecond = date.substring(11, 19);

    const itemsList = this.state.product_array.map(item => {
      return (
        <div className="row justify-content-center" key={item._id}>
          <div className="col-md-10 p-1">
            <div className="product-bar d-flex border rounded shadow m-0 p-0">
              <img
                src={item.image}
                className="product-bar-img img-fluid border-right m-0"
                alt={item.name}
              />
              <div className="product-bar-name d-flex justify-content-center align-items-center border-right m-0 p-0">
                <span className="font-weight-bold align-middle text-truncate m-0 p-0">
                  {item.name}
                </span>
              </div>
              <div className="product-bar-quantity text-center border-right m-0 p-0">
                <span className="font-weight-bold m-0 p-0">Qty:</span>
                <br />
                <span className="align-middle m-0 p-0">{item.count}</span>
              </div>
              <div className="product-bar-price text-center border-right m-0 p-0">
                <span className="d-float font-weight-bold m-0 p-0">Price:</span>
                <br />
                <span className="align-middle m-0 pt-1">
                  ${(item.price / 100).toFixed(2)}
                </span>
              </div>
              <div className="product-bar-price text-center border-right m-0 p-0">
                <span className="d-float font-weight-bold m-0 p-0">Total:</span>
                <br />
                <span className="align-middle m-0 pt-1">
                  ${((item.count * item.price) / 100).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => this.onCartClick(item.name, item.count)}
                type="button"
                className="product-bar-price text-center border-right m-0 p-0 align-middle m-0 pt-1 product-card-btn btn rounded-0 m-0 p-2"
              >
                <i className="fas fa-cart-plus" />
              </button>
            </div>
          </div>
        </div>
      );
    });
    //className="align-middle m-0 pt-1"
    return (
      <div>
        <div className="text-center">
          <h1>Your Order from {dateOnly}</h1>
          <h4>Order Time: {timeWithSecond}</h4>

          <hr className="shadow-sm" />
        </div>
        {itemsList}
        <hr className="shadow" />

        {discount < 1 ? (
          <div>
            <div className="cart-modal-subTotalBox text-right">
              <span className="cart-modal-subTotalBox font-weight-bold">
                Subtotal:
              </span>
              <span> ${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="cart-modal-subTotalBox text-right">
              <span className="cart-modal-subTotalBox font-weight-bold">
                Discount Value:
              </span>
              <span> {((1 - discount) * 100).toFixed(0)}%</span>
            </div>
            <div className="cart-modal-subTotalBox text-right">
              <span className="cart-modal-subTotalBox font-weight-bold">
                After Discount:
              </span>
              <span> ${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="cart-modal-subTotalBox text-right">
            <span className="cart-modal-subTotalBox font-weight-bold">
              Total:
            </span>
            <span> ${(subtotal / 100).toFixed(2)}</span>
          </div>
        )}
        <Link to="/history" className="btn btn-light">
          <i className="fas fa-arrow-circle-left" />
          Back
        </Link>
      </div>
    );
  }
}
HistorySingleOrder.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  cart: state.cart
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, addItemFromHistory }
)(HistorySingleOrder);
