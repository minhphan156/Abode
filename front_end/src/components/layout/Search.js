import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../product-tiles/ProductCard";

class Search extends Component {
  render() {
    const query = this.props.query.productQuery;

    if (query != null) {
      const itemsList = query.map(item => {
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
  query: state.query
});
// this.props.query = { productQuery : data}
// if this.props.query is empty we will not show the Search page

export default connect(
  mapStateToProps,
  {}
)(Search);
