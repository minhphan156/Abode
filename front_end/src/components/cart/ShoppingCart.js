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

  onDecrementCountClick(e, isRemoveAllItems) {
    const product = {
      productId: e,
      removeAllItems: isRemoveAllItems
    };
    this.props.removeItem(product);
  }

  render() {
    const cart = this.props.cart.shoppingCart;

    if (cart.length) {
      var total = 0;

      const itemsList = cart.map(item => {
        total += item.count * item.price;
        return (
          <div className="row justify-content-center" key={item._id}>
            <div className="col-md-6 p-3">
              <div className="product-bar d-flex border rounded shadow m-0 p-0">
                <img
                  src={item.image}
                  // className="product-bar-img img-fluid border-right m-0 p-0"
                  className="product-card-img img-fluid m-0"
                />
                <div className="product-bar-name d-flex justify-content-center align-items-center border-right m-0 p-0">
                  <span className="font-weight-bold align-middle text-truncate m-0 p-0">
                    {item.name}
                  </span>
                </div>
                <div className="product-bar-quantity text-center border-right m-0 p-0">
                  <span className="font-weight-bold m-0 p-0">
                    Qty: {item.count}{" "}
                  </span>
                  <br />
                  <button
                    className="product-bar-quantity-btn btn font-weight-bold hidden-xs hidden-sm mt-2 mr-2 p-0"
                    onClick={() => this.onDecrementCountClick(item._id, false)}
                  >
                    -
                  </button>
                  <span className="align-middle m-0 pt-2" />
                  <button
                    className="product-bar-quantity-btn btn font-weight-bold hidden-xs hidden-sm mt-2 ml-2 p-0"
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
                    className="product-bar-btn btn m-auto"
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

      // const itemsList = cart.map(item => {
      //   total += item.count * item.price;
      //   return (
      //     <div className="col-sm-2 product-in-cart" key={item._id}>
      //       <img src={item.image} />
      //       <br />
      //       <div> {item.name} </div>
      //       <div>
      //         <button
      //           className="btn btn-light"
      //           onClick={() => this.onDecrementCountClick(item._id, false)}
      //         >
      //           <i className="fas fa-minus text-info mr-1" />
      //         </button>
      //         {item.count}
      //         <button
      //           className="btn btn-light"
      //           onClick={() => this.onIncrementCountClick(item._id)}
      //         >
      //           <i className="fa fa-plus text-info mr-1" />
      //         </button>
      //       </div>
      //       <div>${((item.count * item.price) / 100).toFixed(2)}</div>
      //       <button
      //         className="btn btn-light"
      //         onClick={() => this.onDecrementCountClick(item._id, true)}
      //       >
      //         <i className="fa fa-window-close text-info mr-1" />
      //       </button>
      //     </div>
      //   );
      // });

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
            <div className="row">Total: ${(total / 100).toFixed(2)}</div>
          </div>
          <div className="btn-group mb-4" role="group">
            <button
              className="btn btn-light"
              onClick={() =>
                this.onDecrementCountClick("All Product Ids", false)
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
  { removeItem, incrementItemCount }
)(ShoppingCart);
