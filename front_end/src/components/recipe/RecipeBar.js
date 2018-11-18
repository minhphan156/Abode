import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RecipeBar extends Component {
  render() {
    return (
      <div>
        <div className="recipe-bar d-flex border m-0 p-0">
          <img
            className="recipe-bar-img img-fluid border-right"
            src={this.props.img}
            alt="test-img"
          />
          <div className="recipe-bar-desc border-left">
            <h4 className="font-weight-bold ml-2 m-0">{this.props.title}</h4>
            <span className="font-style-italic ml-2 m-0">
              by {this.props.author}
            </span>
            <p className="text-truncate d-none d-md-block mt-3 ml-2 m-0">
              {this.props.desc}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

RecipeBar.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};
