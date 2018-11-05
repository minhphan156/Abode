import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import RecipeBar from "./RecipeBar";

class recipePage extends Component {
  render() {
    const recipe = this.props.recipe.recipeQueue;
    {
      const itemsList = category.map(item => {
        return (
          <div className="row justify-content-center" key={item._id}>
            <div className="col-md-10">
              <RecipeBar
              {/*img = name = author = desc = */}
              />
            </div>
          </div>
        );
      });

      return (
        <div className="container">
          <div className="row">{itemsList}</div>
        </div>
      );
    }

    <div />;
  }
}

const mapStateToProps = state => ({
  category: state.category
});
// this.props.category = { productcategory : data}
// if this.props.category is empty we will not show the categoryPage page

export default connect(
  mapStateToProps,
  {}
)(categoryPage);
