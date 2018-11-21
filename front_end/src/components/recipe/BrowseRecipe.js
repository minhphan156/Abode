import React, { Component } from "react";
import RecipeBar from "./RecipeBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes } from "../../actions/recipeActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class BrowseRecipe extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const { recipes, loading } = this.props.recipe;

    let recipeListContent = (
      <div>
        <div className="browse-recipe-overlay-container rounded mb-1">
          <div className="browse-recipe-overlay rounded" />
          <img
            src="/recipes/recipes-header.jpg"
            alt="recipes-header"
            className="browse-recipe-headerimg rounded"
          />
        </div>
        <h1 className="Roboto text-center font-weight-bold">
          Browse our Recipes
        </h1>
      </div>
    );

    if (loading || isEmpty(recipes)) {
      return (
        <div>
          {recipeListContent}
          <Spinner />
        </div>
      );
    } else if (recipes) {
      const recipeFeed = recipes.map(recipe => (
        <div className="col-md-10 mb-2">
          <RecipeBar recipe={recipe} auth={this.props.auth} />
        </div>
      ));

      return (
        <div>
          {recipeListContent}
          <hr className="shadow" />
          <div className="row justify-content-center">{recipeFeed}</div>
        </div>
      );
    } else {
      return (
        <div>
          {recipeListContent}
          <hr className="shadow" />
          <p className="Roboto text-center">
            We do not have any recipes at the moment.
          </p>
        </div>
      );
    }
  }
}

PropTypes.BrowseRecipe = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(BrowseRecipe);
