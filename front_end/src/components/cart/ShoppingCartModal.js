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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <ShoppingCart />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onHide}>Close</button>
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
