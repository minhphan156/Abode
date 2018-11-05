import React, { Component } from "react";

export default class RecipeBar extends Component {
  render() {
    return (
      <div>
        <div className="recipe-bar d-flex border m-0 p-0">
          <img
            className="recipe-bar-img img-fluid border"
            src={this.props.img}
            alt="test-img"
          />
          <div className="recipe-bar-desc">
            <h3 className="font-weight-bold ml-2 m-0">{this.props.name}}</h3>
            <span className="font-style-italic ml-2 m-0">
              by {this.props.author}
            </span>
            <p className="text-truncate mt-3 ml-2 m-0">{this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}
