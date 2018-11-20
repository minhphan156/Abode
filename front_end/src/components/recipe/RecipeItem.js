import React, { Component } from "react";
import ProductCard from "../product-tiles/ProductCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipe, addLike, removeLike } from "../../actions/recipeActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class RecipeItem extends Component {
  constructor(props) {
    super(props);

    this.giveLike = this.giveLike.bind(this);
  }

  giveLike(event) {
    event.preventDefault();

    if (this.props.auth.isAuthenticated) {
      const { likes, _id, userID } = this.props.recipe.recipe;

      let alreadyLiked = false;
      for (let i = 0; i < likes.length && alreadyLiked === false; i++) {
        if (likes[i].user === userID) {
          alreadyLiked = true;
        }
      }

      if (alreadyLiked) {
        this.props.removeLike(_id);
      } else {
        this.props.addLike(_id);
      }
    }
  }

  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id);
  }

  render() {
    const { recipe, loading } = this.props.recipe;

    if (isEmpty(recipe)) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      const ingredientsList = recipe.ingredients.map(ingredient => (
        <li>{ingredient}</li>
      ));

      const stepsList = recipe.steps.map(step => <li>{step}</li>);

      const productList = recipe.ingredientProducts.map(product => {
        <div className="col-md-4">
          <ProductCard
            productKey={product._id}
            productImage={product.image}
            productName={product.name}
            productPrice={product.price}
          />
        </div>;
      });
      return (
        <div>
          <img
            src={recipe.image}
            alt="recipe-img"
            className="review-recipe-img img-fluid d-block mx-auto rounded border mb-3"
          />
          <hr className="shadow" />
          <div className="border rounded p-2">
            <h2 className="Roboto text-center font-weight-bold">
              {recipe.title}
            </h2>
            <span className="d-block text-center font-italic">
              by {recipe.author}
            </span>
            <label htmlFor="description" className="Roboto font-weight-bold">
              Description:
            </label>
            <p id="description" className="Roboto">
              {recipe.description}
            </p>
            <label htmlFor="ingredients" className="Roboto font-weight-bold">
              Ingredients:
            </label>
            <ul id="ingredients">{ingredientsList}</ul>
            <label htmlFor="steps" className="Roboto font-weight-bold">
              Directions:
            </label>
            <ol id="steps">{stepsList}</ol>
            <label htmlFor="" className="Roboto font-weight-bold">
              Available products from ingredients:
            </label>
            <div className="container mb-2">
              <div className="row border p-1">{productList}</div>
            </div>
            <button
              type="button"
              className="d-block btn btn-danger btn-sm mx-auto p-1"
              onClick={this.giveLike}
            >
              <i className="fas fa-heart" />{" "}
              <span className="badge badge-light">{recipe.likes.length}</span>
            </button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
});

RecipeItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getRecipe, addLike, removeLike }
)(RecipeItem);
