import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
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
    const { profile, loading } = this.props.profile;
    let listItem;
    if (profile === null || loading) {
      listItem = <Spinner />; // show the spinner while loading
    } else {
      listItem = this.state.recipes.map((item, index) => {
        const date = item.date;
        const dateOnly = date.substring(0, 10);
        const time = date.substring(11, 16);
        return (
          <tbody key={item.title}>
            <tr>
              <td>
                {dateOnly}, {time}
              </td>
              <td>{item.title}</td>
              <td>
                {" "}
                <Link
                  to={`/recipe/edit/${item.title}`}
                  className="btn btn-info"
                >
                  Edit Recipe
                </Link>
              </td>
              <td>
                {" "}
                <button
                  value="Delete Recipe"
                  className="btn btn-info"
                  onClick={event => {
                    event.preventDefault();
                    const { user } = this.props.auth;
                    const recipeData = {
                      index: index,
                      title: item.title
                    };
                    this.props.deleteRecipe(recipeData, this.props.history);
                  }}
                >
                  Delete Recipe
                </button>
              </td>
            </tr>
          </tbody>
        );
      });
    }
    return (
      <div>
        <div className="container">
          <h2>Your Recipes</h2>
          <table className="table table-striped">
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
          <Link to="/recipe/create" className="btn btn-info">
            Create New Recipe
          </Link>
        </div>
      </div>
    );
  }
}
MyRecipe.PropTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteRecipe }
)(MyRecipe);
