import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShoppingCart extends Component {
  render() {
    return (
      //empty cart, redirect to home page
      //add items to cart, redirect to browse by category page
      //checkout, redirect to checkout page
      <div>
        <div className="text-center">
          <h1>Shopping Cart</h1>
          <hr className="shadow-sm" />
        </div>
        <div className="col-sm-2 product-in-cart">
          <img src="category-imgs/Produce_c.png" alt="Produce.img" />
          <br />
          <div>Banana </div>
          <Link to="/cart" className="btn btn-light">
            <i className="fas fa-minus text-info mr-1" />
          </Link>
          <img src="category-imgs/Meats_c.png" alt="Meats.img" />
          <br />
          <div>Turkey </div>
          <Link to="/cart" className="btn btn-light">
            <i className="fas fa-minus text-info mr-1" />
          </Link>
        </div>
        <div className="btn-group mb-4" role="group">
          <Link to="/" className="btn btn-light">
            <i className="fas fa-cart-arrow-down text-info mr-1" />
            Empty Cart
          </Link>
          <Link to="/categories" className="btn btn-light">
            <i className="fas fa-cart-plus text-info mr-1" />
            Continue Shopping and Add To Cart
          </Link>
          <Link to="/checkout" className="btn btn-light">
            <i className="fas fa-credit-card text-info mr-1" />
            Checkout
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
