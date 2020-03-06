import React, { Component } from 'react'
import { Alert, Container, Row, Col } from "react-bootstrap";

export default class Loading extends Component {
  constructor() {
    super();
    this.state = {
    };
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center" style={{textAlign:"center"}}>
          <Col xs={12} md={8} lg={4}>
            <Alert variant={'warning'}>
              <h2>Loading ...</h2>
            </Alert>
          </Col>
        </Row>
      </Container>        
    )
  }
}
