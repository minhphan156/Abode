import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyRecipe extends Component {
  render() {
    return (
      <div>
        <Link to="/CreateRecipe" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" />
          Create Recipe
        </Link>
      </div>
    );
  }
}

export default MyRecipe;
