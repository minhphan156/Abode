import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ProductCard from "../product-tiles/ProductCard";

class categoryPage extends Component {
  render() {
    const category = this.props.category.productCategory;

    if (category != null) {
      const itemsList = category.map(item => {
        return (
          <div className="col-md-2" key={item._id}>
            <ProductCard
              productKey={item._id}
              productImage={item.image}
              productName={item.name}
              productPrice={item.price}
            />
          </div>
        );
      });

      return (
        <div className="container">
          <div className="row">{itemsList}</div>
        </div>
      );
    }

    return <div />;
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
