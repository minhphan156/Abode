import React, { Component } from "react";

export default class RecipeBar extends Component {
  render() {
    return (
      <div>
        <div class="recipe-bar d-flex border m-0 p-0">
          <img
            class="recipe-bar-img img-fluid border"
            src="imgs/test-img1.jpg"
            alt="test-img"
          />
          <div class="recipe-bar-desc">
            <h3 class="font-weight-bold ml-2 m-0">{this.props.name}}</h3>
            <span class="font-style-italic ml-2 m-0">
              by {this.props.author}
            </span>
            <p class="text-truncate mt-3 ml-2 m-0">{this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}
