import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, incrementItemCount } from "../../actions/cartActions";

class ShoppingCart extends Component {
  constructor() {
    super();
    this.onIncrementCountClick = this.onIncrementCountClick.bind(this);
    this.onDecrementCountClick = this.onDecrementCountClick.bind(this);
  }

  onIncrementCountClick(e) {
    const productId = e;
    this.props.incrementItemCount(productId);
  }

  onDecrementCountClick(e, isRemoveItem) {
    const product = {
      productId: e,
      removeItem: isRemoveItem
    };
    this.props.removeItem(product);
  }

  render() {
    const cart = this.props.cart.shoppingCart;
    const discount = this.props.cart.discount;
    if (cart.length) {
      var total = 0;

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
                  <button
                    className="product-bar-quantity-btn btn font-weight-bold mr-2 p-0"
                    onClick={() => this.onDecrementCountClick(item._id, false)}
                  >
                    -
                  </button>
                  <span className="align-middle m-0 p-0">{item.count}</span>
                  <button
                    className="product-bar-quantity-btn btn font-weight-bold ml-2 p-0"
                    onClick={() => this.onIncrementCountClick(item._id)}
                  >
                    +
                  </button>
                </div>
                <div className="product-bar-price text-center border-right m-0 p-0">
                  <span className="d-float font-weight-bold m-0 p-0">
                    Price:
                  </span>
                  <br />
                  <span className="align-middle m-0 pt-1">
                    ${((item.count * item.price) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="product-bar-btnBox d-flex justify-content-center align-items-center m-0 p-0">
                  <button
                    className="product-bar-btn btn m-0 p-2"
                    onClick={() => this.onDecrementCountClick(item._id, true)}
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });

      return (
        <div>
          {itemsList}
          <hr className="shadow" />
          <div className="cart-modal-subTotalBox text-right">
            <span className="cart-modal-subTotalBox font-weight-bold">
              Subtotal:
            </span>
            <span> ${(total / 100).toFixed(2)}</span>
          </div>
          {discount < 1 ? (
            <div className="cart-modal-subTotalBox text-right">
              <span className="cart-modal-subTotalBox font-weight-bold">
                After Discount:
              </span>
              <span> ${((discount * total) / 100).toFixed(2)}</span>
            </div>
          ) : null}
          <div className="btn-group d-flex justify-content-center" role="group">
            <button
              className="btn btn-light"
              onClick={() =>
                this.onDecrementCountClick("Remove All Items In Cart", false)
              }
            >
              <i className="fas fa-cart-arrow-down text-info mr-1" />
              Empty Cart
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h5 className="text-center">You have no items in your cart.</h5>
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
  { removeItem, incrementItemCount }
)(ShoppingCart);
