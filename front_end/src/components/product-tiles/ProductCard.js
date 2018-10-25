import React, { Component } from "react";
import { Link } from "react-router-dom";

/*
  The contents of this component is for testing purposes for now and will be changed in the future to show products served from the backend.
  Backend code for products is still needed.
*/
class ProductCard extends Component {
  render() {
    return (
      <div
        key={this.props.productKey}
        className="container card border-light p-0"
        style={{ width: 120, marginBottom: 10 }}
      >
        <Link to={`/product/${this.props.productName}`}>
          <div style={{ height: 170 }}>
            <img
              src={this.props.productImage}
              alt="test-img"
              className="product-card-img"
            />
          </div>
          <div style={{ height: 130 }}>
            <h5 className="card-title">{this.props.productName}</h5>
          </div>
        </Link>
        <button type="button" className="btn product-card-info-btn">
          <i className="fas fa-cart-plus" /> ${this.props.productPrice / 100}
        </button>
      </div>
    );
  }
}

export default ProductCard;
