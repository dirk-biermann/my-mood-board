import React, { Component } from 'react'
import { ButtonToolbar } from "react-bootstrap";

export default class CustomButtonRow extends Component {
  render() {
    return (
      <>
        <ButtonToolbar className="cust-btn-toolbar"> 
            {this.props.btnList}
        </ButtonToolbar>
      </>
    )
  }
}
/*
        <hr style={{borderColor: "white"}} />
        <Form.Row className="frm-btn-row">
          <Form.Group as={Col} sm="12" >
            {this.props.btnList}
          </Form.Group>
        </Form.Row>
*/