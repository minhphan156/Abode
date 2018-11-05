import React, { Component } from "react";
import { Link } from "react-router-dom";
import { submitCategory } from "../../actions/categoryActions";
import { connect } from "react-redux";

class BrowseByCategory extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const newCategory = {
      category: e
    };
    this.props.submitCategory(newCategory);
  }

  render() {
    return (
      <div>
        <h1 className="category-title text-center font-weight-bold">
          Categories
        </h1>
        <hr className="shadow" />
        <div className="row justify-content-center">
          <div className="col-md-3 pb-5">
            <Link to="/Snack" onClick={() => this.onClick("snack")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/snacks.png"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0 text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Snacks
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/Drink" onClick={() => this.onClick("drink")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/drinks.png"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0 text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Drinks
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/Fruit" onClick={() => this.onClick("fruit")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/produce.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0  text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Fruit
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 pb-5">
            <Link to="/Bakery" onClick={() => this.onClick("bakery")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/bakery.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0  text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Bakery
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/Dairy" onClick={() => this.onClick("dairy")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/dairy.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0  text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Dairy
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/Meat" onClick={() => this.onClick("meat")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/meats.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0  text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Meats
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/Alcohol" onClick={() => this.onClick("alcohol")}>
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/alcohol.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <button
                  type="button"
                  className="category-card-nameBox btn rounded-0  text-center m-0 p-0"
                >
                  <span className="category-card-name align-middle m-0">
                    Alcohol
                  </span>
                </button>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { submitCategory }
)(BrowseByCategory);
