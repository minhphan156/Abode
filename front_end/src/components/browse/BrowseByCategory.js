import React, { Component } from "react";
import { Link } from "react-router-dom";

class BrowseByCategory extends Component {
  render() {
    /*
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
    */
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
