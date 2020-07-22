import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";

import * as actions from "../../store/actions";

import { updateObject } from "../../shared/utility";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.product = {};

    this.nameRef = createRef();
    this.catRef = createRef();
    this.mfgDateRef = createRef();
    this.typeRef = createRef();

    this.cancelClickHandler = this.cancelClickHandler.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);
  }

  cancelClickHandler() {
    this.props.history.goBack();
  }

  submitFormHandler(event) {
    event.preventDefault();

    this.product = updateObject(this.product, {
      name: this.nameRef.value,
      category: this.catRef.value,
      mfgDate: this.mfgDateRef.value,
      type: this.typeRef.value,
    });

    this.props.onAddProduct(this.product);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.error) {
      this.props.history.goBack();
    }
  }

  componentWillUnmount() {
    this.props.onResetStore();
  }

  render() {
    return (
      <Form onSubmit={this.submitFormHandler}>
        {this.props.error && <Alert variant="danger">{this.props.error}</Alert>}
        <h3>Add Product Form</h3>
        <Form.Group as={Row} controlId="exampleForm.ControlInput1">
          <Form.Label column sm="2">
            Product Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="name..."
              maxLength="100"
              ref={(ref) => (this.nameRef = ref)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              multiple
              ref={(ref) => (this.catRef = ref)}
            >
              <option value="cat1">Category 1</option>
              <option value="cat2">Category 2</option>
              <option value="cat3">Category 3</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlInput3">
          <Form.Label column sm="2">
            Mfg Date
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" ref={(ref) => (this.mfgDateRef = ref)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlInput4">
          <Form.Label column sm="2">
            Product Type
          </Form.Label>
          <Col sm="10">
            <Form.Control as="select" ref={(ref) => (this.typeRef = ref)}>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button variant="secondary" onClick={this.cancelClickHandler}>
          Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  error: state.product.error,
});

const mapDispatchToProps = (dispatch) => ({
  onAddProduct: (product) => dispatch(actions.addProduct(product)),
  onResetStore: () => dispatch(actions.resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
