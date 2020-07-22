import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Pagination, Row, Col, Button, Table, Form } from "react-bootstrap";

import * as actions from "../../store/actions";

class ProductList extends Component {
  state = { pageNumber: 1, limit: 10 };

  constructor(props) {
    super(props);

    this.searchRef = createRef();

    this.addProductClickHandler = this.addProductClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.onProductsGet(
      this.state.limit,
      this.state.pageNumber,
      this.searchRef.value
    );
  }

  addProductClickHandler() {
    this.props.history.push("/product/add");
  }

  switchPages(pageNumber) {
    this.props.onProductsGet(
      this.state.limit,
      pageNumber,
      this.searchRef.value
    );
    this.setState({ pageNumber });
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    this.props.onProductsGet(this.state.limit, 1, this.searchRef.value);

    this.setState({ pageNumber: 1 });
  };

  render() {
    let paginationBasic = null;

    let tableBody = (
      <tr>
        <td colSpan="5" align="center">
          No Products
        </td>
      </tr>
    );

    if (this.props.filteredProducts && this.props.filteredProducts.length) {
      let items = [];
      for (
        let number = 1;
        number <=
        Math.ceil(this.props.filteredProducts.length / this.state.limit);
        number++
      ) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === this.state.pageNumber}
            onClick={() => this.switchPages(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      paginationBasic = <Pagination>{items}</Pagination>;

      tableBody = this.props.filteredProducts
        .slice(
          (this.state.pageNumber - 1) * this.state.limit,
          this.state.limit * this.state.pageNumber
        )
        .map((product, index) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.mfgDate}</td>
            <td>{product.type}</td>
          </tr>
        ));
    }

    return (
      <Row>
        <Col sm="12">
          <Button onClick={this.addProductClickHandler}>Add Product</Button>
        </Col>
        <br />
        <br />
        <Col sm="12">
          <h3>Product List here</h3>

          <Row className="justify-content-sm-end">
            <Col sm="auto">
              <Form onSubmit={this.submitFormHandler}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="search"
                    placeholder="search..."
                    maxLength="100"
                    ref={(ref) => (this.searchRef = ref)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Mfg Date</th>
                <th>Product Type</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
        </Col>
        <Col sm="12">{paginationBasic}</Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredProducts: state.product.filteredProducts,
  limit: state.product.limit,
  offset: state.product.offset,
});

const mapDispatchToProps = (dispatch) => ({
  onProductsGet: (limit, pageNumber, searchKeyword) =>
    dispatch(actions.getProducts(limit, pageNumber, searchKeyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
