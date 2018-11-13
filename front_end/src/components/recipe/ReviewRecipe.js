import React, { Component } from "react";
import ProductCard from "../product-tiles/ProductCard";

/**
 * TODO: Still need to connect to back end and replace test values with props
 */
export default class ReviewRecipe extends Component {
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

  render() {
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
        <h2 className="Roboto">TEST TITLE</h2>
        <label htmlFor="description" className="Roboto">
          Description:
        </label>
        <p id="description" className="Roboto">
          Aeneanero sit amet quam egestas semp ultricies mi vitae est.
          Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet,
          wisi. Aenean fermentum, elit eget tincidunt condimentum.
        </p>
        {stepsList}
        <label htmlFor="ingredients" className="Roboto">
          Ingredients:{" "}
        </label>
        {ingredientsList}
        <label htmlFor="" className="Roboto">
          Available products from ingredients:{" "}
        </label>
        <div className="row border p-1" />
      </div>
    );
  }
}
