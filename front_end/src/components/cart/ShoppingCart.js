import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, removeItem } from "../../actions/cartActions";

class ShoppingCart extends Component {
  constructor() {
    super();
    this.onIncrementCountClick = this.onIncrementCountClick.bind(this);
    this.onDecrementCountClick = this.onDecrementCountClick.bind(this);
  }

  onIncrementCountClick(e) {
    const product = {
      name: e
    };
    this.props.addItem(product);
  }

  onDecrementCountClick(e, isRemoveAllItems, isEmptyCart) {
    const product = {
      productId: e,
      removeAllItems: isRemoveAllItems,
      emptyCart: isEmptyCart
    };
    this.props.removeItem(product);
  }

  render() {
    const cart = this.props.cart.shoppingCart;

    if (cart.length) {
      var total = 0;
      const itemsList = cart.map(item => {
        if (item != undefined) {
          total += item.count * item.price;
          return (
            <div className="col-sm-2 product-in-cart" key={item._id}>
              <img src={item.image} />
              <br />
              <div> {item._id} </div>
              <div> {item.name} </div>
              <div>
                <button
                  className="btn btn-light"
                  onClick={() =>
                    this.onDecrementCountClick(item._id, false, false)
                  }
                >
                  <i className="fas fa-minus text-info mr-1" />
                </button>
                {item.count}
                <button
                  className="btn btn-light"
                  onClick={() => this.onIncrementCountClick(item.name)}
                >
                  <i className="fa fa-plus text-info mr-1" />
                </button>
              </div>
              <div>{item.count * item.price}</div>
              <button
                className="btn btn-light"
                onClick={() =>
                  this.onDecrementCountClick(item._id, true, false)
                }
              >
                <i className="fa fa-window-close text-info mr-1" />
              </button>
            </div>
          );
        }
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
            <div className="row">Total: {total}</div>
          </div>
          <div className="btn-group mb-4" role="group">
            <button
              className="btn btn-light"
              onClick={() =>
                this.onDecrementCountClick(
                  "Placeholder: All Items",
                  false,
                  true
                )
              }
            >
              <i className="fas fa-cart-arrow-down text-info mr-1" />
              Empty Cart
            </button>
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
  { addItem, removeItem }
)(ShoppingCart);
