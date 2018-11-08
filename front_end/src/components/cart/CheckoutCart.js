import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getCurrentProfile} from "../../actions/profileActions";
import PropTypes from "prop-types";

class CheckoutCart extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render(){
    const {profile, loading} = this.props.profile

    let dashboardContent
    if(profile === null || loading){
      dashboardContent = <Spinner />; // show the spinner while loading
    }else{
      dashboardContent = this._render(profile);
    }
    return <div>{dashboardContent}</div>
  }
  _render(profile) {
    const cart = this.props.cart.shoppingCart;
    var submitButton

    if (cart.length) {
      var total = 0;

      submitButton = Object.keys(profile).length > 0 ?  {redirect: "/recipt", description: "Go to payment"}
      : {redirect: "/delivery", description: "Add delivery information"}

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
                    ${((item.count * item.price) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="product-bar-btnBox d-flex justify-content-center align-items-center m-0 p-0" />
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
          <div className="btn-group d-flex justify-content-center" role="group">
            <Link to={submitButton.redirect} className="btn btn-light">
              <i className="fas fa-credit-card text-info mr-1">
                {submitButton.description}
              </i>
            </Link>
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
  { getCurrentProfile }
)(CheckoutCart);
