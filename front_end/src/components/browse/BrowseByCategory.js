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
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Snacks_c.png" className="category-img" alt="Snacks.img"/>
              <br />
              <div class="category-text">Snacks</div>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Drinks_c.png" className="category-img" alt="Drinks.img"/>
              <br />
              <div class="category-text">Drinks</div>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Produce_c.png" className="category-img" alt="Produce.img"/>
              <br />
              <div class="category-text">Produce</div>
            </Link>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Bakery_c.png" className="category-img" alt="Bakery.img"/>
              <br />
              <div class="category-text">Bakery</div>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Dairy_c.png" className="category-img" alt="Dairy.img"/>
              <br />
              <div class="category-text">Dairy</div>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Meats_c.png" className="category-img" alt="Meats.img"/>
              <br />
              <div class="category-text">Meats</div>
            </Link>
          </div>
          <div className="col-sm-2 border category-tile shadow">
            <Link to="/categories">
              <img src="category-imgs/Alcohol_c.png" className="category-img" alt="Alcohol.img"/>
              <br />
              <div class="category-text">Alcohol</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseByCategory;
