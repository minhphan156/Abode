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

    this.state = {
      title: "",
      description: "",
      img: "",
      steps: [],
      ingredients: [],
      ingredientProducts: []
    };
  }

  componentDidMount() {
    this.props.getRecipes()
  }

  render() {
    const { recipes, loading } = this.props.recipe;

    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    else {

      let stepCount = 1;
      const stepsList = this.state.steps.map(step => {
        <div>
          <label htmlFor={"step" + stepCount} className="Roboto">
            Step {stepCount}
          </label>
          <p id={"step" + stepCount++} className="Roboto">
            {step}
          </p>
        </div>;
      });

      const ingredientsList = this.state.ingredients.map(ingredient => {
        <div>
          <p className="Roboto">ingredient</p>
        </div>;
      });

      const ingredientProductsList = this.state.ingredientProducts.map(
        ingredientProduct => {
          <div className="col-md-3 m-1">
            <ProductCard
              productKey=""
              productImage=""
              productName=""
              productPrice=""
            />
          </div>;
        }
      );

      return (
        <div>
          <img
            src="/test/recipe-test.jpg"
            alt="recipe-img"
            className="review-recipe-img img-fluid d-block mx-auto rounded shadow mb-3"
          />
          <hr className="shadow" />
          <h2 className="Roboto">
            {this.state.title}
          </h2>
          <label htmlFor="description" className="Roboto">
            Description:
        </label>
          <p id="description" className="Roboto">
            {this.state.description}
          </p>
          {stepsList}
          <label htmlFor="ingredients" className="Roboto">
            Ingredients:
          </label>
          <div id="ingredients">
            {ingredientsList}
          </div>
          <label htmlFor="" className="Roboto">
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

const mapStateToProps = (state) => ({
  recipe: state.recipe
})

export default connect(mapStateToProps, { getRecipes })(RecipeItem);