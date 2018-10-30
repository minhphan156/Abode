import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addItem } from "../../actions/cartActions";
import { connect } from "react-redux";

/*
Product Card component that shows a product's image, name, and price as well as an 'add to cart' button.

HOW TO USE:
    When adding to a larger component that shows rows of ProductCards,
    each <ProductCard /> must be wrapped with <div className="col-md-3 pb-5">
    ALL of these col divs must be wrapped in ONE <div className="row">
    which in turn is also wrapped with ONE <div className="container">

EXAMPLE:
<div className="container">
    <div className="row">
        *Each iteration of loop for each product*
        <div className="col-md-3 pb-5">
            <ProductCard />
        </div>
        *END OF LOOP*
    </div>
</div>
    
Please remove HOW TO USE, and EXAMPLE when finalizing app.
*/
class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.onCartClick = this.onCartClick.bind(this);
  }

  onCartClick(e) {
    const product = {
      name: e
    };
    this.setState({ name: e });

    this.props.addItem(product);
    console.log(product);
  }

  render() {
    return (
      <div key={this.props.productKey} className="product-card border m-0 p-0">
        <Link to={`/product/${this.props.productName}`}>
          <img
            src={this.props.productImage}
            className="product-card-img img-fluid m-0"
            alt="Responsive image"
          />
          <span className="product-card-name text-center m-0 p-2">
            {this.props.productName}
          </span>
        </Link>
        <div className="d-flex text-center">
          <span className="product-card-price align-middle border-top m-0 p-2">
            ${(this.props.productPrice / 100).toFixed(2)}
          </span>
          <button
            onClick={() => this.onCartClick(this.props.productName)}
            type="button"
            className="product-card-btn btn rounded-0 m-0 p-2"
          >
            <i className="fas fa-cart-plus" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addItem }
)(ProductCard);
