import React, { Component } from 'react'
import { Form, Col } from "react-bootstrap";
import SiteHeader from "./SiteHeader";

export default class ElementBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    let pageTitle = 'Element Board';

    return (
      <>
        <SiteHeader ico="layout" title={pageTitle} />
        <Form>
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="12">
            AAA
            </Form.Group>
          </Form.Row>
        </Form>
      </>
    )
  }
}
