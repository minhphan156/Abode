import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { submitDiscount } from "../../actions/cartActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class CheckoutCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onDiscountClick = this.onDiscountClick.bind(this);
    this.onSubmitPayment = this.onSubmitPayment.bind(this);
  }

  onChange(e) {
    this.setState({ discount: e.target.value });
  }

  onDiscountClick() {
    const newDiscount = {
      discountCode: this.state.discount
    };
    this.props.submitDiscount(newDiscount);
    this.setState({ discount: "" });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmitPayment() {
    const profileReducer = this.props.profile.profile;

    //getting current date and time
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date + " " + time;
    let discountPercent = this.props.cart.discount;

    let totalPrice = 0;
    const itemsList = this.props.cart.shoppingCart.map(item => {
      totalPrice += item.count * item.price;
    });

    // pushing order to history array
    let history;
    if (
      this.props.cart.shoppingCart != null &&
      profileReducer.history != null
    ) {
      const newCart = {};
      let cart = JSON.parse(JSON.stringify(this.props.cart.shoppingCart)); // create deep copy of shopping cart
      newCart["subtotal"] = totalPrice;
      newCart["total"] = (totalPrice * discountPercent).toFixed(0);
      newCart["discount"] = discountPercent;
      newCart["date"] = dateTime;
      newCart["items"] = cart;
      profileReducer.history.push(newCart);
      history = profileReducer.history;
    }

    const profileData = {
      street: profileReducer.address.street,
      apartment: profileReducer.address.apartment,
      city: profileReducer.address.city,
      zip: profileReducer.address.zip,
      homeState: profileReducer.address.homeState,
      ccNumber: profileReducer.creditCard.ccNumber,
      ccExp: profileReducer.creditCard.ccExp,
      ccCvv: profileReducer.creditCard.ccCvv,
      history: history
    };

    this.props.createProfile(profileData, this.props.history);
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
    const cart = this.props.cart.shoppingCart;
    const discount = this.props.cart.discount;
    var total = 0;

    var submitButton =
      Object.keys(profile).length > 0
        ? { redirect: "/receipt", description: "Go to Payment" }
        : { redirect: "/delivery", description: "Add Delivery Information" };

    if (cart.length) {
      const itemsList = cart.map(item => {
        total += item.count * item.price;

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
                  <span className="d-float font-weight-bold m-0 p-0">
                    Price:
                  </span>
                  <br />
                  <span className="align-middle m-0 pt-1">
                    ${(item.price / 100).toFixed(2)}
                  </span>
                </div>
                <div className="product-bar-price text-center border-right m-0 p-0">
                  <span className="d-float font-weight-bold m-0 p-0">
                    Qty x Price:
                  </span>
                  <br />
                  <span className="align-middle m-0 pt-1">
                    ${((item.count * item.price) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      });

      return (
        <div>
          <div className="text-center">
            <h1>Check Out</h1>
            <hr className="shadow-sm" />
          </div>
          {itemsList}
          <hr className="shadow" />
          <div className="cart-modal-subTotalBox text-right">
            <span className="cart-modal-subTotalBox font-weight-bold">
              Subtotal:
            </span>
            <span> ${(total / 100).toFixed(2)}</span>
          </div>
          {discount < 1 ? (
            <div>
              <div className="cart-modal-subTotalBox text-right">
                <span className="cart-modal-subTotalBox font-weight-bold">
                  Discount%:
                </span>
                <span> {((1 - discount) * 100).toFixed(0)}% </span>
              </div>
              <div className="cart-modal-subTotalBox text-right">
                <span className="cart-modal-subTotalBox font-weight-bold">
                  After Discount:
                </span>
                <span> ${((discount * total) / 100).toFixed(2)}</span>
              </div>
            </div>
          ) : null}

          <div className="btn-group d-flex justify-content-center" role="group">
            <Link
              to={submitButton.redirect}
              className="btn btn-light"
              onClick={this.onSubmitPayment}
            >
              <i className="fas fa-credit-card text-info mr-1" />
              {submitButton.description}
            </Link>
          </div>
          <div className="product-bar-name float-right">
            <div className="input-group mr-auto">
              <input
                style={{ height: 36 }}
                type="input"
                className="form-control"
                name="discount"
                value={this.state.discount}
                onChange={this.onChange}
              />

              <button
                className="btn btn-light"
                type="button"
                onClick={this.onDiscountClick}
                type="submit"
              >
                <i className="fas fa-cart-arrow-down text-info mr-1" />
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="text-center">
          <h1>Checkout Cart</h1>
          <hr className="shadow-sm" />
          <div>You have no items in your cart.</div>
        </div>
      </div>
    );
  }
}

CheckoutCart.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  cart: state.cart
});

//connect to cartReducer to display items in cart
export default connect(
  mapStateToProps,
  { submitDiscount, createProfile, getCurrentProfile }
)(CheckoutCart);
