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
    //NOTE: we assume user will search for name
    // submit query as object with to submitQuery at queryActions.js
    const newCategory = {
      category: e
    };
    this.props.submitCategory(newCategory);
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h1 className="lobster-font">Browse By Category</h1>
          <hr className="shadow-sm" />
        </div>
        <div className="row justify-content-md-center">
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/Snack" onClick={() => this.onClick("snack")}>
              <img
                src="category-imgs/Snacks_c.png"
                className="category-img"
                alt="Snacks.img"
              />
              <br />
              <button className="category-text" type="button">
                Snack
              </button>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/Drink" onClick={() => this.onClick("drink")}>
              <img
                src="category-imgs/Drinks_c.png"
                className="category-img"
                alt="Drinks.img"
              />
              <br />
              <button className="category-text" type="button">
                Drink
              </button>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/Alcohol" onClick={() => this.onClick("alcohol")}>
              <img
                src="category-imgs/Alcohol_c.png"
                className="category-img"
                alt="Produce.img"
              />
              <br />
              <button className="category-text" type="button">
                Alcohol
              </button>
            </Link>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/Bakery" onClick={() => this.onClick("bakery")}>
              <img
                src="category-imgs/Bakery_c.png"
                className="category-img"
                alt="Bakery.img"
              />
              <br />
              <button className="category-text" type="button">
                Bakery
              </button>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/Dairy" onClick={() => this.onClick("dairy")}>
              <img
                src="category-imgs/Dairy_c.png"
                className="category-img"
                alt="Dairy.img"
              />
              <br />
              <button className="category-text" type="button">
                Diary
              </button>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/Meat" onClick={() => this.onClick("meat")}>
              <img
                src="category-imgs/Meats_c.png"
                className="category-img"
                alt="Meats.img"
              />
              <br />
              <button className="category-text" type="button">
                Meat
              </button>
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
