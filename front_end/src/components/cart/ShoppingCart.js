import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ShoppingCart extends Component {
  render() {
    const cart = this.props.cart.shoppingCart;

    if (cart.length) {
      const itemsList = cart.map(item => {
        return (
          <div className="col-sm-2 product-in-cart" key={item._id}>
            <img src={item.image} />
            <br />
            <div> {item._id} </div>
            <div> {item.name} </div>
            <div> {item.price} </div>
            <Link to="/cart" className="btn btn-light">
              <i className="fas fa-minus text-info mr-1" />
            </Link>
          </div>
        );
      });

      return (
        //empty cart, redirect to home page
        //checkout, redirect to checkout page
        <div>
          <div className="text-center">
            <h1>Shopping Cart</h1>
            <hr className="shadow-sm" />
          </div>
          <div className="container">
            <div className="row">{itemsList}</div>
          </div>
          <div className="btn-group mb-4" role="group">
            <Link to="/" className="btn btn-light">
              <i className="fas fa-cart-arrow-down text-info mr-1" />
              Empty Cart
            </Link>
            <Link to="/checkout" className="btn btn-light">
              <i className="fas fa-credit-card text-info mr-1" />
              Checkout
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="text-center">
          <h1>Shopping Cart</h1>
          <hr className="shadow-sm" />
          <div>No Items in Cart</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

//connect to cartReducer to display items in cart
export default connect(
  mapStateToProps,
  {}
)(ShoppingCart);
