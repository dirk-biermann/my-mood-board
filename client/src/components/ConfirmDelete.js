import React, { Component } from 'react'
import { Button, Modal } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class ConfirmDelete extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  closeConfirmDelete = (confirmState) => {
    this.props.close( confirmState );
  }

  render() {
    if(!this.props.show){ return null; }
    return (
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={() => {this.closeConfirmDelete(false)}}
        style={{color:"black"}}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <>
            <img alt="acb-logo" src="../../arts_craft_base_logo.svg" width="40" height="40" />
            <h3>Delete Confirmation</h3>
          </>
          <Button className="" size="sm" variant="red" onClick={() => {this.closeConfirmDelete(false)}}><IconSvg ico="cancel" cls="svg-btn svg-cw90"/></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="f-row fj-spa fa-cen"> 
            <div className="f-col fa-cen" style={{flexGrow: "1"}}>         
              <IconSvg ico="delete" cls="svg-big svg-cb90" />
            </div>
            <div className="f-col" style={{flexGrow: "3"}}>
              <div className="f-row fa-cen">
                <h4>Do you want to delete</h4>
                <h3 className="trunkText">&nbsp;"<span className="fc-b">{this.props.info[0]}"</span></h3>
              </div>
              <h2 className="trunkText fc-r">{this.props.info[1]}</h2>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="" size="sm" variant="dark" onClick={() => {this.closeConfirmDelete(false)}}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
          <Button className="" size="sm" variant="red" onClick={() => {this.closeConfirmDelete(true)}}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
