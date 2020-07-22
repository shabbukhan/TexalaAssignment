import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Auxilliary from "../Auxilliary/Auxilliary";

class Layout extends Component {
  render() {
    return (
      <Auxilliary>
        <Container fluid>
          <Row className="justify-content-sm-center">
            <Col sm="6">{this.props.children}</Col>
          </Row>
        </Container>
      </Auxilliary>
    );
  }
}

export default Layout;
