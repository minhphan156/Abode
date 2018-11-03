import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ShoppingCart from "./ShoppingCart";
import { Redirect } from "react-router";

export default class ShoppingCartModal extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  render() {
    if (this.state.redirect) {
      this.state.redirect = false;
      return <Redirect push to="/checkout" />;
    }
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
          <button className="btn" onClick={this.props.onHide}>
            Close
          </button>
          <button
            onClick={() => this.setState({ redirect: true })}
            className="btn btn-light"
          >
            <i className="fas fa-credit-card text-info mr-1" />
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
