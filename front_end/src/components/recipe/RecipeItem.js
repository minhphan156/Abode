import React, { Component } from "react";
import ProductCard from "../product-tiles/ProductCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes } from "../../actions/recipeActions";
import Spinner from "../common/Spinner";

/**
 * TODO: Still need to connect to back end and replace test values with props
 */
class RecipeItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const { recipes, loading } = this.props.recipe;

    if (recipes[0] === null || loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      const stepsList = recipes[0].steps.map(step => (
        <div>
          <li>{step}</li>
        </div>
      ));

      const ingredientsList = recipes[0].ingredients.map(ingredient => (
        <div>
          <li className="Roboto">{ingredient}</li>
        </div>
      ));

      const ingredientProductsList = this.state.ingredientProducts.map(
        ingredientProduct => (
          <div className="col-md-3 m-1">
            <ProductCard
              productKey=""
              productImage=""
              productName=""
              productPrice=""
            />
          </div>
        )
      );

      return (
        <div>
          <img
            src={recipes[0].img}
            alt="recipe-img"
            className="review-recipe-img img-fluid d-block mx-auto rounded shadow mb-3"
          />
          <hr className="shadow" />
          <h2 className="Roboto text-center">{recipes[0].title}</h2>
          <span className="d-block text-center font-italic">
            by {recipes[0].author}
          </span>
          <label htmlFor="description" className="Roboto font-weight-bold">
            Description:
          </label>
          <p id="description" className="Roboto">
            {recipes[0].description}
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
          <div className="row border p-1" />
        </div>
      );
    }
  }
}

RecipeItem.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(RecipeItem);
