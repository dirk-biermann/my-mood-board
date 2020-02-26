import React, { Component } from 'react'
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class AppAbout extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  closeAbout = () => {
    this.props.close();
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    if(!this.props.show){ return null; }
    return (
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.closeAbout}
        style={{color:"black"}}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <>
            <img alt="acb-logo" src="../../arts_craft_base_logo.svg" width="40" height="40" />
            <h3>My-Mood-Board</h3>
          </>
          <Button className="" size="sm" variant="red" onClick={this.closeAbout}><IconSvg ico="cancel" cls="svg-btn svg-cw90"/></Button>
        </Modal.Header>

        <Modal.Body>
          <Container>          
            <Row>
              <Col sm={4}>
                <img src="../../acb.png" alt="logo" width="100%"/>
                <p></p>
              </Col>
              <Col sm={8}>
                <p>This tool can administrate all materials as components for your craft projects and the projects themselves.</p>
                <p>Components can be created and configured by using generic templates, that also can be build by your own, to be more flexible!</p>
              </Col>
            </Row>
          </Container>
          <hr />
          <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a><IconSvg ico="freepik" cls="svg-nav svg-cb90"/>&nbsp;
             from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></div>
          <hr />
          <p className="abt-cr" >(c) 2020 by <em>Juliane Trapp</em> &amp; <em>Susanne Vogl</em> &amp; <em>Kai Zahn</em> &amp; <em>Dirk Biermann</em></p>
        </Modal.Body>
      </Modal>
    )
  }
}

/*
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>
            <span style={{fontSize: "2rem", fontVariant: "small-caps"}}>My-Mood-Board</span>
          </Modal.Title>
        </Modal.Header>

*/