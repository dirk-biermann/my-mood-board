import React, { Component } from 'react'
import { Button, Modal, Container, Image } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class ImageDisp extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  closeImageDisp = () => {
    this.props.close();
  }

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
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "flex-end"}}>
            <div className="acb-a-svg" onClick={this.closeImageDisp}><IconSvg ico="cancel" cls="svg-btn svg-sw-10 svg-cw50-h"/></div>
        </Modal.Header>
        <Modal.Body className="bg-dark" style={{padding: "0"}}>
          <Container style={{padding: "0"}}>  
            <Image src={this.props.img} fluid />       
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}
