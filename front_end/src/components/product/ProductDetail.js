import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getProductByName } from "../../actions/productActions";
import { addItem } from "../../actions/cartActions";

class ProductDetail extends Component {
  constructor() {
    super();
    this.onCartClick = this.onCartClick.bind(this);
  }

  onCartClick(e) {
    const product = {
      name: e
    };
    this.props.addItem(product);
  }

  componentDidMount() {
    if (this.props.match.params.productname) {
      this.props.getProductByName(this.props.match.params.productname);
      console.log(this.props.match.params.productname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.product === null && this.props.product.loading) {
      this.props.history.push(
        `/not-found/${this.props.match.params.productname}`
      );
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
                  <img data-image="red" src={product.image} alt="" />
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
                    <a
                      href="#"
                      className="cart-btn"
                      onClick={() => this.onCartClick(product.name)}
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>

              <hr />
              <br />
            </div>
            <br />
            <br />

            <h4>Related Products:</h4>
            <div class="container">
              <div class="row">
                {product.otherproducts.map(relatedProduct => (
                  <div
                    key={relatedProduct.productKey}
                    className="product-card col-md-4 border m-0 p-0"
                  >
                    <a href={`/product/${relatedProduct.name}`}>
                      <img
                        src={relatedProduct.image}
                        className="product-card-img img-fluid m-0"
                        alt="Responsive image"
                      />
                      <span className="product-card-name text-center m-0 p-2">
                        {relatedProduct.name}
                      </span>
                    </a>
                  </div>
                ))}
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
  { getProductByName, addItem }
)(ProductDetail);
