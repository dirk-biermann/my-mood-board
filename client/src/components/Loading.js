import React, { Component } from 'react'
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";

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
    const bkg = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' ];
    const bkgId = Math.max(bkg.indexOf( this.props.variant ),0);
    const bkgColor = bkg[bkgId];

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6} md={4} lg={4} style={{textAlign:"center"}}>
            <Card
              bg={bkgColor}
              text={bkgColor === 'light' ? 'dark' : 'white'}
            >            
              <Card.Body>
                <Spinner animation="border" role="status" variant={bkgColor === 'light' ? 'dark' : 'white'}>
                  <span className="sr-only">Loading...</span>
                </Spinner>
                <h2 style={{display: "inline-block", marginLeft:"30px"}}>Loading ...</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>        
    )
  }
}
