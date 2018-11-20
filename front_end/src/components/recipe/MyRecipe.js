import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyRecipe extends Component {
  render() {
    return (
      <div>
        <Link to="/CreateRecipe" className="btn btn-light">
          Create Recipe
        </Link>
      </div>
    );
  }
}

export default MyRecipe;
