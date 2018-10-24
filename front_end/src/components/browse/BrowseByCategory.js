import React, { Component } from "react";
import { Link } from "react-router-dom";

/*
  The main component of the 'Browse by Category' page.
  NOTE: This page is NOT connected to the backend as the backend is still yet to be implemented.
        To connect to the back end (Once it's been implemented), 
        wrap <Links> around the contents of <div className="col-md-3"> elements.
*/
class BrowseByCategory extends Component {
  render() {
    return (
      <div>
        <h1 className="category-title text-center font-weight-bold">
          Browse by Category
        </h1>
        <hr className="shadow" />
        <div className="row justify-content-center">
          <div className="col-md-3 pb-5">
            <Link to="/categories">
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/snacks.png"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <div className="category-card-nameBox text-center m-0 p-0">
                  <span className="category-card-name align-middle m-0">
                    Snacks
                  </span>
                </div>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/categories">
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/drinks.png"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <div className="category-card-nameBox text-center m-0 p-0">
                  <span className="category-card-name align-middle m-0">
                    Drinks
                  </span>
                </div>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/categories">
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/produce.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <div className="category-card-nameBox text-center m-0 p-0">
                  <span className="category-card-name align-middle m-0">
                    Produce
                  </span>
                </div>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 pb-5">
            <Link to="/categories">
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/dairy.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <div className="category-card-nameBox text-center m-0 p-0">
                  <span className="category-card-name align-middle m-0">
                    Dairy
                  </span>
                </div>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/categories">
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/meats.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <div className="category-card-nameBox text-center m-0 p-0">
                  <span className="category-card-name align-middle m-0">
                    Meats
                  </span>
                </div>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
          <div className="col-md-3 pb-5">
            <Link to="/categories">
              <div className="border shadow m-0 p-0">
                <img
                  src="category-imgs/alcohol.jpg"
                  alt="Test Image"
                  className="category-card-img img-fluid m-0 p-0"
                />
                <div className="category-card-nameBox text-center m-0 p-0">
                  <span className="category-card-name align-middle m-0">
                    Alcohol
                  </span>
                </div>
                <div className="category-card-botBox" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseByCategory;
