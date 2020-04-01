import React, { Component } from 'react'
import { Form, Col } from "react-bootstrap";

export default class CustomButtonRow extends Component {
  render() {
    return (
      <Form.Row className="frm-btn-row">
        <Form.Group as={Col} sm="12" >
          {this.props.btnList}
        </Form.Group>
      </Form.Row>
    )
  }
}
