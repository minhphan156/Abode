import React, { Component } from "react";
import ProductCard from "../product-tiles/ProductCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipe } from "../../actions/recipeActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

/**
 * TODO: Still need to connect to back end and replace test values with props
 */
class RecipeItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id);
  }

  // PROBLEM: Updating the props after re-rendering causes aparrent lag when re-rendering component.

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
      return (
        <div>
          <img
            src={recipe.img}
            alt="recipe-img"
            className="review-recipe-img img-fluid d-block mx-auto rounded border mb-3"
          />
          <hr className="shadow" />
          <div className="border rounded p-2">
            <h2 className="Roboto text-center font-weight-bold">{recipe.title}</h2>
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
            <div className="container">
              <div className="row border p-1" />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe
});

RecipeItem.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getRecipe }
)(RecipeItem);
