import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

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

    let newIngredient = "";

    this.onChange = this.onChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onStepChange(key, value) {
    let mutate = this.state.steps.slice();
    mutate[key] = value;
    this.setState({
      steps: mutate
    });
  }

  onIngredientChange(event) {
    this.newIngredient = event.target.value;
  }

  addStep(event) {
    let mutate = this.state.steps.slice();
    mutate.push("");
    this.setState({
      steps: mutate
    })
  }

  addIngredient() {
    let mutate = this.state.ingredients.slice();
    mutate.push(this.newIngredient);
    this.setState({
      ingredients: mutate
    })
    this.newIngredient = "";
  }

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
    let stepCounter = 0;
    const stepsList = this.state.steps.map(step => (
      <StepComponent
        name={"steps[" + (stepCounter) + "].text"}
        stepCount={++stepCounter}
        onStepChange={this.onStepChange}
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
          Create Recipe
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
          {/* START OF STEPS */}
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
                placeholder="Ingredient..."
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

class StepComponent extends Component {
  constructor(props) {
    super(props);

    this.getKey = this.getKey.bind(this);
  }

  getKey(event) {
    this.props.onStepChange(this.props.stepCount - 1, event.target.value);
  }

  render() {
    return (
      <div className="form-group" >
        <label for="step">Step {this.props.stepCount}:</label>
        <textarea
          type="text"
          name={this.props.name}
          className="form-control"
          id="step"
          rows="1"
          placeholder="Describe this step of the recipe..."
          onChange={this.getKey}
        />
      </div>
    );
  }
};

const IngredientBoxComponent = (props) => {
  return (
    <div className="col-md-1">
      <div className="btn-group m-0" role="group">
        <button type="button" className="btn">
          {props.ingred}
        </button>
        <button
          type="button"
          className="btn"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
};