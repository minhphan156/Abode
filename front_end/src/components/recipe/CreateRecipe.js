import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const StepComponent = function() {
  return (
    <div className="form-group">
      <label for="step">Step {props.stepNum}:</label>
      <textarea
        type="text"
        className="form-control"
        id="step"
        rows="1"
        placeholder="Describe this step of the recipe..."
      />
    </div>
  );
};

const IngredientBoxComponent = function() {
  return (
    <div className="col-md-2">
      <div className="btn-group m-0" role="group">
        <button type="button" className="btn">
          {props.ingredient}
        </button>
        <button type="button" className="btn">
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
};

export default class CreateRecipe extends Component {
  render() {
    return (
      <div>
        <h2 className="category-title text-center font-weight-bold">
          Create Recipe
        </h2>
        <form>
          <div className="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title of your recipe..."
            />
          </div>
          <div className="form-group">
            <label for="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              rows="2"
              placeholder="Short description of your recipe..."
            />
          </div>
          <div className="form-group">
            <label for="image link">Image Links:</label>
            <input
              type="text"
              className="form-control"
              id="img-links"
              placeholder="Link to image..."
            />
          </div>
          {/* START OF STEPS */}
          <StepComponent />
          {/* END OF STEP(S) */}
          <button type="button" className="btn btn-success align-middle p-1">
            <i className="fas fa-plus" /> Add Another Step
          </button>
          <br />
          <div className="form-group">
            <label for="ingredients">Ingredients:</label>
            <div className="input-group recipe-text-25">
              <input
                type="text"
                className="form-control"
                placeholder="Ingredient..."
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success align-middle pl-2 pr-2 p-1"
                  type="button"
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="row m-1">
          {/* START OF INGREDIENT BOXES */}
          <IngredientBoxComponent />
          {/* END OF INGREDIENT BOXES */}
        </div>
      </div>
    );
  }
}
