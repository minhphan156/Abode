import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import RecipeBar from "./RecipeBar";

class BrowseRecipe extends Component {
  render() {
    // const recipe = this.props.recipe.recipeQueue;
    // {
    //   const itemsList = recipe.map(item => {
    //     return (
    //       <div className="row justify-content-center" key={item._id}>
    //         <div className="col-md-10">
    //           <RecipeBar />
    //         </div>
    //       </div>
    //     );
    //   });

    //   return (
    //     <div className="container">
    //       <div className="row">{itemsList}</div>
    //     </div>
    //   );
    // }

    // <div />;
    return <div>BrowseRecipeBrowseRecipe</div>;
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe
});
// this.props.category = { productcategory : data}
// if this.props.category is empty we will not show the categoryPage page

export default connect(
  mapStateToProps,
  {}
)(BrowseRecipe);
