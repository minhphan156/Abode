import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getProductByName } from "../../actions/productActions";

class ProductDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.productname) {
      this.props.getProductByName(this.props.match.params.productname);
      console.log(this.props.match.params.productname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.product === null && this.props.product.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { product, loading } = this.props.product;
    let productContent;

    if (product === null || loading) {
      productContent = <Spinner />;
    } else {
      productContent = (
        <main className="product-container">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="left-column">
                  <img
                    data-image="red"
                    src={product.image}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-4">
              <div className="right-column">
            <div className="product-description">
              <span>{product.category}</span>

              <h1>{product.name}</h1>
              <p>
                Sold by <b>{product.brand}</b>
              </p>

              <p>{product.description}</p>
            </div>

            <div className="product-price">
              <span>${(product.price / 100).toFixed(2)}</span>
              <a href="#" className="cart-btn">
                Add to Cart
              </a>
            </div>
          </div>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return <div>{productContent}</div>;
  }
}

ProductDetail.propTypes = {
  getProductByName: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductByName }
)(ProductDetail);
