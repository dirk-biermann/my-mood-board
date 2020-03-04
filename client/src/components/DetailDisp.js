import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class DetailDisp extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  closeDetailDisp = () => {
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
        onHide={this.closeDetailDisp}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <h3>{this.props.dispInfo.name}</h3>
          <Button className="" size="sm" variant="red" onClick={this.closeDetailDisp}><IconSvg ico="close" cls="svg-btn svg-cw90"/></Button>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Name: </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="input"
                  type="text"
                  name="name"
                  readOnly
                  value={this.props.dispInfo.name || ''}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Image Url:</Form.Label>
              <Col sm="10">
                <Form.Control 
                  as="input"
                  type="text"
                  name="imageUrl"
                  readOnly
                  value={this.props.dispInfo.imageUrl || ''}
                />
              </Col>
            </Form.Group>
            { this.props.dispInfo.status && (
              <Form.Group as={Row}>
                <Form.Label column sm="2">Status:</Form.Label>
                <Col sm="10">
                  <Form.Control 
                    as="input"
                    type="text"
                    name="status"
                    readOnly
                    value={this.props.dispInfo.status || ''}
                  />
                </Col>
              </Form.Group>
            )}
            <Form.Group as={Row}>
              <Form.Label column sm="2">Description: </Form.Label>
              <Col sm="10">
                <Form.Control style={{ minHeight: "140px" }}
                  rows="7"
                  as="textarea"
                  name="description"
                  readOnly
                  value={this.props.dispInfo.description || ''}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Notes: </Form.Label>
              <Col sm="10">
                <Form.Control style={{ minHeight: "140px" }}
                  rows="7"
                  as="textarea"
                  name="notes"
                  readOnly
                  value={this.props.dispInfo.notes || ''}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}
