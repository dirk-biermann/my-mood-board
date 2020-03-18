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
          <img style={{marginRight: "20px"}} alt="mmb-logo" src="../../arts_craft_base_logo.svg" width="34" height="34" />
          <h3>My-Mood-Board</h3>
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
                <p>This tool can administrate all components as materials for your craft projects and the projects themselves.</p>
                <p>Materials can be created and configured by using generic templates, that also can be build by your own, to be more flexible!</p>
              </Col>
            </Row>
          </Container>
          <hr />
          <div style={{fontSize: "1.2rem"}}>Icons made by&nbsp;
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> <IconSvg ico="freepik" cls="svg-nav svg-big svg-cb90"/> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a> and <a href="https://www.dirk-biermann.de/" title="Flaticon" target="_blank" rel="noopener noreferrer">d.w.b</a><IconSvg ico="piranha" cls="svg-nav svg-big svg-cb90"/>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light" style={{justifyContent: "flex-start"}}>
          <IconSvg ico={'copyright'} cls="svg-btn svg-sw-10 svg-cw90 svg-mr"/>
          <p className="abt-cr" >2020 by <img src="/crw.png" alt="crw" height="25px"/></p>
        </Modal.Footer>
      </Modal>
    )
  }
}

/*
          <p className="abt-cr" >(c) 2020 by <em>Susanne Vogl</em> &amp; <em>Juliane Trapp</em> &amp; <em>Dirk Biermann</em> &amp; <em>Kai Zahn</em></p>
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>
            <span style={{fontSize: "2rem", fontVariant: "small-caps"}}>My-Mood-Board</span>
          </Modal.Title>
        </Modal.Header>

*/