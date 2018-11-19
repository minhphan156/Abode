import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class RecipeBar extends Component {
  render() {
    const { img, title, author, description, userID, _id } = this.props.recipe;
    const { isAuthenticated, user } = this.props.auth;

    let sameUser;
    console.log(isAuthenticated);
    console.log(user.id);
    if (isAuthenticated && user.id === userID) {
      sameUser = (
        <div className="d-inline">
          <button type="button" className="btn btn-info btn-sm p-0 pl-1 pr-1 m-0 ml-2">Edit Recipe</button>
        </div>
      );
    }

    return (
      <div>
        <div className="recipe-bar d-flex border m-0 p-0">
          <img
            className="recipe-bar-img img-fluid border-right"
            src={img}
            alt="test-img"
          >
          </img>
          <div className="recipe-bar-desc border-left">
            <Link to={`/recipe/${_id}/`}>
              <h4 className="font-weight-bold ml-2 m-0">{title}</h4>
            </Link>
            <span className="font-style-italic ml-2 m-0">
              by {author}
            </span>
            {sameUser}
            <p className="text-truncate d-none d-md-block mt-3 ml-2 m-0">{description}</p>
          </div>
        </div>
      </div>
    );
  }
}