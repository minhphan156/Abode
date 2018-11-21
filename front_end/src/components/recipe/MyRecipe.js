import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { deleteRecipe } from "../../actions/recipeActions";

class MyRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        recipes: profile.recipe
      });
    }
  }

  render() {
    const listItem = this.state.recipes.map(item => {
      const date = item.date;
      const dateOnly = date.substring(0, 10);
      const time = date.substring(11, 16);
      return (
        <tbody key={item.id}>
          <tr>
            <td>
              <Link to={`/history/${date}`}>
                {dateOnly}, {time}
              </Link>
            </td>
            <td>{item.title}</td>
            <td>
              {" "}
              <Link to="/EditRecipe" className="btn btn-info">
                Edit Recipe
              </Link>
            </td>
            <td>
              {" "}
              <button
                value="Delete Recipe"
                className="btn btn-info"
                onClick={event => {
                  event.preventDefault()
                  const { user } = this.props.auth;
                  const recipeData = {
                    title: this.state.title,
                    description: this.state.description,
                    image: this.state.image,
                    steps: this.state.steps,
                    ingredients: this.state.ingredients,
                    author: user.name
                  };
                  this.props.deleteRecipe(recipeData, this.props.history)
                }}
              >
              Delete Recipe
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
    return (
      <div>
        <div class="container">
          <h2>Your Recipes</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Edit Recipe</th>
                <th>Delete Recipe</th>
              </tr>
            </thead>
            {listItem}
          </table>
          <Link to="/CreateRecipe" className="btn btn-info">
            Create New Recipe
          </Link>
        </div>
      </div>
    );
  }
}
MyRecipe.PropTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteRecipe }
)(MyRecipe);
