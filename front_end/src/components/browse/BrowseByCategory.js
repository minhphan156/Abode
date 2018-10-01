import React, { Component } from "react";

class BrowseByCategory extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <h1>Browse By Aisle</h1>
          <hr className="shadow-sm" />
        </div>
        <div className="row justify-content-md-center">
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
        </div>
        <div className="row justify-content-md-center">
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
          <div className="m-2 col-sm-2 border category-Tile shadow-sm" />
        </div>
      </div>
    );
  }
}

export default BrowseByCategory;
