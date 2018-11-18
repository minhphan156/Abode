import React, { Component } from "react";
import RecipeBar from "./RecipeBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes } from "../../actions/recipeActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class BrowseRecipe extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const { recipes, loading } = this.props.recipe;

    if (loading || isEmpty(recipes)) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else if (recipes) {
      const recipeFeed = recipes.map(recipe => (
        <div className="col-md-10 mb-2">
          <Link to={`/recipe/${recipe._id}/`}>
            <RecipeBar
              key={recipe.title}
              title={recipe.title}
              author={recipe.author}
              img={recipe.img}
              desc={recipe.description}
              likes={recipe.likes}
            />
          </Link>
        </div>
      ));

      return (
        <div>
          <h2 className="Roboto text-center font-weight-bold">
            Browse our Recipes
          </h2>
          <hr className="shadow" />
          <div className="row justify-content-center">{recipeFeed}</div>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="Roboto text-center font-weight-bold">
            Browse our Recipes
          </h2>
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
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(BrowseRecipe);
