import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

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
        <tbody key={item.title}>
          <tr>
            <td>
              {dateOnly}, {time}
            </td>
            <td>{item.title}</td>
            <td>
              {" "}
              <Link to={`/recipe/edit/${item.title}`} className="btn btn-info">
                Edit Recipe
              </Link>
            </td>
            <td>
              {" "}
              <Link to="/EditRecipe" className="btn btn-info">
                Delete Recipe
              </Link>
            </td>
          </tr>
        </tbody>
      );
    });
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
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyRecipe);
