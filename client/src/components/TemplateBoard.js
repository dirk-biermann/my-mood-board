import React, { Component } from 'react'
import { Alert, Col } from "react-bootstrap";
import SiteHeader from "./SiteHeader";

export default class TemplateBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleTemplateDetails = (idx) =>{
    this.props.history.push(`/templatedetail/${idx}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {  
    let pageTitle = 'Template Board';
  
    return (
      <>
        <SiteHeader ico="template" title={pageTitle} />
        <Col sm="3">
          <Alert variant="info">
            <Alert.Heading>Information</Alert.Heading>
            <p><i>This functionality is currently not implemented!</i></p>
            <hr />
            <p className="mb-0">
              The main functionality of <b>My-Mood-Board</b> is not not affected.
              Projects and Materials can be created, assigned and maintained.
            </p>
          </Alert>
        </Col>
      </>      
    )
  }
}
