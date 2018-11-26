import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/recipeActions";
import PropTypes from "prop-types";

export default class RecipeBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      image,
      title,
      author,
      description,
      userID,
      _id,
      likes
    } = this.props.recipe;
    const { isAuthenticated, user } = this.props.auth;

    let sameUser;
    if (isAuthenticated && user.id === userID) {
      sameUser = (
        <div className="d-inline">
          <Link to={`/recipe/edit/${title}`} className="mr-auto">
            <button
              type="button"
              className="btn btn-info btn-sm p-0 pl-1 pr-1 m-0 ml-2"
            >
              Edit Recipe
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <div className="card m-0 p-0">
          <Link to={`/recipe/view/${_id}`}>
            <img
              src={image}
              className="product-card-img img-fluid m-0"
              alt="Responsive image"
            />
          </Link>
          <div class="card-body">
            <Link to={`/recipe/view/${_id}`} className="mr-auto">
              <div style={{ minHeight: "90px" }}>
                <h4 className="card-title">{title}</h4>
              </div>
            </Link>
            <span className="card-text">by {author}</span>
            {sameUser}
            <div className="text-right">
              <button
                type="button"
                className="btn btn-danger btn-sm rounded-0 m-0 p-1"
              >
                <i className="fas fa-heart" />{" "}
                <span className="badge badge-light">{likes.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
