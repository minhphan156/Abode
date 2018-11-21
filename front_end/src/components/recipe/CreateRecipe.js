import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addRecipe } from "../../actions/recipeActions";
import { withRouter } from "react-router-dom";

/**
 * Main component for the 'Create Recipe' page.
 * It uses 2 functional components (StepComponent & IngredientsBoxComponent) for each new step/ingredient
 */
class CreateRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      image: "",
      steps: [],
      ingredients: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    console.log(this.props.auth);
    const recipeData = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      steps: this.state.steps,
      ingredients: this.state.ingredients,
      author: user.name
    };

    this.props.addRecipe(recipeData, this.props.history);
    this.setState({
      title: "",
      description: "",
      image: "",
      steps: [],
      ingredients: []
    });
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
  addStep(event) {
    event.preventDefault();

    let mutate = this.state.steps.slice();
    mutate.push("");
    this.setState({
      steps: mutate
    });
  }

  /**
   * Adds a new ingredient to the ingredients[] state
   */
  addIngredient(event) {
    event.preventDefault();
    if (this.newIngredient !== "") {
      let mutate = this.state.ingredients.slice();
      mutate.push(this.newIngredient);
      this.setState({
        ingredients: mutate
      });
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

    let stepCounter = 0; // This variable is needed to keep track of the order of steps
    const stepsList = this.state.steps.map(step => (
      <StepComponent
        name={"steps[" + this.state.steps + "].text"}
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
          Post Your Recipe
        </h2>
        <hr className="shadow" />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              placeholder="Title of your recipe..."
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="2"
              placeholder="Short description of your recipe..."
              onChange={this.onChange}
              value={this.state.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image link">Image Links:</label>
            <input
              type="text"
              name="image"
              className="form-control"
              id="img-links"
              placeholder="Link to image..."
              onChange={this.onChange}
              value={this.state.image}
            />
          </div>
          {/* START OF STEP(S) */}
          {stepsList}
          {/* END OF STEP(S) */}
          <button
            type="button"
            className="create-recipe-btn btn align-middle p-1 mb-2"
            onClick={this.addStep}
          >
            <i className="fas fa-plus" /> Add A Step
          </button>
          <br />
          <div className="form-group inline">
            <label htmlFor="ingredients">Ingredients:</label>
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

          {this.state.ingredients.length != 0 ? (
            <div className="d-flex flex-wrap border justify-content-center p-1">
              {/* START OF INGREDIENT BOXES */}
              {ingredientsList}
              {/* END OF INGREDIENT BOXES */}
            </div>
          ) : null}
          <br />
          <input type="submit" value="Submit" className="btn btn-success" />
        </form>
        <br />
      </div>
    );
  }
}

/**
 * Functional component for steps.
 * It has a label (Step X:) and a textarea for adding steps to the recipe.
 * @param {*} props
 */
const StepComponent = props => {
  return (
    <div className="form-group">
      <label htmlFor="step">Step {props.stepCount + 1}:</label>
      <textarea
        type="text"
        name={props.name}
        className="form-control"
        id="step"
        rows="2"
        placeholder="Describe this step of the recipe..."
        onChange={event => {
          props.onStepChange(props.stepCount, event.target.value);
        }}
      />
    </div>
  );
};

/**
 * Functional component for ingredients.
 * It will show the ingredient the user has listed as well as a remove button
 * TO-DO: Include search database functionality when ingredient box is clicked
 * @param {*} props
 */
const IngredientBoxComponent = props => {
  return (
    <div className="btn-group d-flex m-1" role="group">
      <button type="button" className="btn border-right">
        {props.ingred}
      </button>
      <button
        type="button"
        className="btn border-left"
        onClick={event => {
          event.preventDefault();
          props.removeIngredient(props.ingred);
        }}
      >
        <i className="fas fa-times" />
      </button>
    </div>
  );
};

CreateRecipe.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRecipe }
)(withRouter(CreateRecipe));
