import React, { Component } from "react";
import { Link } from "react-router-dom";

class BrowseByCategory extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <h1 className="lobster-font">Browse By Category</h1>
          <hr className="shadow-sm" />
        </div>
        <div className="row justify-content-md-center">
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Snacks_c.png" className="category-img" />
              <br />
              <p class="category-text">Snacks</p>
            </Link>
          </div>
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Drinks_c.png" className="category-img" />
              <br />
              <p class="category-text">Drinks</p>
            </Link>
          </div>
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Produce_c.png" className="category-img" />
              <br />
              <p class="category-text">Produce</p>
            </Link>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Bakery_c.png" className="category-img" />
              <br />
              <p class="category-text">Bakery</p>
            </Link>
          </div>
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Dairy_c.png" className="category-img" />
              <br />
              <p class="category-text">Dairy</p>
            </Link>
          </div>
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Meats_c.png" className="category-img" />
              <br />
              <p class="category-text">Meats</p>
            </Link>
          </div>
          <div className="m-3 col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Alcohol_c.png" className="category-img" />
              <br />
              <p class="category-text">Alcohol</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseByCategory;
