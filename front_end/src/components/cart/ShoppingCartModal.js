import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import ShoppingCart from "./ShoppingCart";

export default class ShoppingCartModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Shopping Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShoppingCart />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={this.props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// const mapStateToProps = state => ({
//     cart: state.cart
//   });
//   // if this.props.query is empty we will not show the Search page

//   export default connect(
//     mapStateToProps,
//     {}
//   )(Search);
