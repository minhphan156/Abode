import React, { Component } from "react";
import { Link } from "react-router-dom";

class BrowseByCategory extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <h1>
            Browse By Aisle <i class="fas fa-search" />
          </h1>
          <hr className="shadow-sm" />
        </div>
        <div className="row justify-content-md-center">
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Snacks</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Beverages</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Produce</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Deli</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Dairy</Link>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Bakery</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Frozen</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Condiments</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Alcohol</Link>
          </div>
          <div className="m-2 col-sm-2 border category-Tile shadow-sm">
            <Link to="/browse">Medicine</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseByCategory;
