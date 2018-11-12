import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

/**
 * Main component for the 'Create Recipe' page.
 * It uses 2 functional components (StepComponent & IngredientsBoxComponent) for each new step/ingredient
 */
export default class CreateRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      image: "",
      steps: [],
      ingredients: []
    }

    let newIngredient = "";   // This variable is needed for ingredient input field

    this.onChange = this.onChange.bind(this);
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  /**
   * Mutates the states as text is entered to textfields
   * @param {*} event 
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Mutates the newIngredient variable as text is entered on the ingredient textfield
   * @param {*} event 
   */
  onIngredientChange(event) {
    this.newIngredient = event.target.value;
  }

  /**
   * Adds a new step to the steps[] state.
   * This new step is still changeable by the steps' text field
   */
  addStep() {
    let mutate = this.state.steps.slice();
    mutate.push("");
    this.setState({
      steps: mutate
    })
  }

  /**
   * Adds a new ingredient to the ingredients[] state
   */
  addIngredient() {
    if (this.newIngredient !== "") {
      let mutate = this.state.ingredients.slice();
      mutate.push(this.newIngredient);
      this.setState({
        ingredients: mutate
      })
      this.newIngredient = "";
    }
  }

  /**
   * Removes an ingredient from the ingredients[] state.
   * This function is passed to IngredientBoxComponents
   * @param {*} ingredient 
   */
  removeIngredient(ingredient) {
    let mutate = this.state.ingredients.slice();
    let indexTarg = mutate.indexOf(ingredient);
    if (indexTarg > -1) {
      mutate.splice(indexTarg, 1);
    }
    this.setState({
      ingredients: mutate
    });
  }

  render() {
    this.newIngredient = "";

    let stepCounter = 0;  // This variable is needed to keep track of the order of steps
    const stepsList = this.state.steps.map(step => (
      <StepComponent
        name={"steps[" + (this.state.steps) + "].text"}
        stepCount={stepCounter++}
        onStepChange={(key, value) => {
          let mutate = this.state.steps.slice();
          mutate[key] = value;
          this.setState({
            steps: mutate
          });
        }}
      />
    ));

    const ingredientsList = this.state.ingredients.map(ingredient => (
      <IngredientBoxComponent
        ingred={ingredient}
        removeIngredient={this.removeIngredient}
      />
    ));

    return (
      <div>
        <h2 className="category-title text-center font-weight-bold">
          Create A Recipe
        </h2>
        <form>
          <div className="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              placeholder="Title of your recipe..."
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label for="description">Description:</label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="2"
              placeholder="Short description of your recipe..."
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label for="image link">Image Links:</label>
            <input
              type="text"
              name="image"
              className="form-control"
              id="img-links"
              placeholder="Link to image..."
              onChange={this.onChange}
            />
          </div>
          {/* START OF STEP(S) */}
          {stepsList}
          {/* END OF STEP(S) */}
          <button type="button" className="create-recipe-btn btn align-middle p-1 mb-2" onClick={this.addStep}>
            <i className="fas fa-plus" /> Add A Step
          </button>
          <br />
          <div className="form-group">
            <label for="ingredients">Ingredients:</label>
            <div className="input-group create-recipe-25">
              <input
                type="text"
                name={"ingredients[" + this.state.ingredients.length + "]"}
                className="form-control"
                placeholder="Add an ingredient..."
                onChange={this.onIngredientChange}
              />
              <div className="input-group-append">
                <button
                  className="create-recipe-btn btn align-middle pl-2 pr-2 p-1"
                  type="button"
                  onClick={this.addIngredient}
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="row m-1">
          {/* START OF INGREDIENT BOXES */}
          {ingredientsList}
          {/* END OF INGREDIENT BOXES */}
        </div>
      </div>
    );
  }
}

/**
 * Functional component for steps.
 * It has a label (Step X:) and a textarea for adding steps to the recipe. 
 * @param {*} props 
 */
const StepComponent = (props) => {
  return (
    <div className="form-group" >
      <label for="step">Step {props.stepCount + 1}:</label>
      <textarea
        type="text"
        name={props.name}
        className="form-control"
        id="step"
        rows="1"
        placeholder="Describe this step of the recipe..."
        onChange={(event) => {
          props.onStepChange(props.stepCount, event.target.value);
        }}
      />
    </div>
  );
}

/**
 * Functional component for ingredients.
 * It will show the ingredient the user has listed as well as a remove button
 * TO-DO: Include search database functionality when ingredient box is clicked
 * @param {*} props 
 */
const IngredientBoxComponent = (props) => {
  return (
    <div className="col-md-1">
      <div className="btn-group create-recipe-ingredient-box m-0" role="group">
        <button type="button" className="btn">
          {props.ingred}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => props.removeIngredient(props.ingred)}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
};