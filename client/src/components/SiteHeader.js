import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class SiteHeader extends Component {
  render() {
    return (
      <Form>
        <Form.Row className="site-header">
          <IconSvg ico={this.props.ico} cls="svg-nav svg-sw10 svg-cw50 svg-mr"/>
          <h2 className="dib">{this.props.title}</h2>
        </Form.Row>
      </Form>
    )
  }
}
