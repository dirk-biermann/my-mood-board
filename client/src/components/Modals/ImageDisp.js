import React, { Component } from 'react'
import { Modal, Container, Image, Button } from "react-bootstrap";
import IconSvg from "../Icons/IconSvg";

export default class ImageDisp extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  closeImageDisp = () => {
    this.props.close();
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    if(!this.props.show){ return null; }
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.closeImageDisp}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <IconSvg ico={'picture'} cls="svg-btn svg-sw-10 svg-cw25 svg-mr"/>
          <h3>{this.props.title ? this.props.title : ""}</h3>
          {/* <div className="bg-danger mmb-a-svg" onClick={this.closeImageDisp}><IconSvg ico="cancel" cls="svg-cls svg-sw-10 svg-cw90"/></div> */}
          <Button className="" size="sm" variant="red" onClick={this.closeImageDisp}><IconSvg ico="minimize" cls="svg-btn svg-cw90"/></Button>
        </Modal.Header>
        <Modal.Body className="bg-dark" style={{padding: "0"}}>
          <Container style={{textAlign:"center", padding: "0", backgroundColor: "black"}}>  
            <Image src={this.props.img} fluid style={{backgroundColor: "darkgray"}}/>       
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}
