import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {/* left column */}
          <div className="col">
            Product Image
            <img
              className="card-img-top"
              src=".../100px180/"
              alt="Card image cap"
            />
          </div>
          {/* right column */}
          <div className="col">
            {/* Product attributes */}
            <div className="product-description">
              <a href="#" className>
                Brand
              </a>
              <h3>Product Name</h3>
              <p>Product Description</p>
            </div>
            {/* purchase quantity */}
            <div className="quantity">
              Quantity: <input type="number" name="quantity" min={1} />
            </div>
            <div className="product-price">
              <span>$10</span>
              <button type="button" className="btn btn-primary">
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="row">
          <div className="col-12">
            <hr />
            <h5>Related Products</h5>
            <div className="card-deck">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src=".../100px180/"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <a href="#" className>
                    Product Name
                  </a>
                  <br />
                  <span>$5</span>
                  <br />
                  <a href="#" className="btn btn-primary">
                    Add to cart
                  </a>
                </div>
              </div>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src=".../100px180/"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <a href="#" className>
                    Product Name
                  </a>
                  <br />
                  <span>$5</span>
                  <br />
                  <a href="#" className="btn btn-primary">
                    Add to cart
                  </a>
                </div>
              </div>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src=".../100px180/"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <a href="#" className>
                    Product Name
                  </a>
                  <br />
                  <span>$5</span>
                  <br />
                  <a href="#" className="btn btn-primary">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
