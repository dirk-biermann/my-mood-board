import React, { Component } from 'react'
import { Button, Modal, Row, Col } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";
import InputTextBox from "./Inputs/InputTextBox";
import InputTextNumeric from "./Inputs/InputTextNumeric";
import InputTextArea from "./Inputs/InputTextArea";
import InputTextColor from "./Inputs/InputTextColor";
import InputCheckBox from "./Inputs/InputCheckBox";
import { cloneObject } from "../services/init";

export default class ElementExample extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.setState( { eData: cloneObject(this.props.option.element) } );
  }

  closeElementExample = () => {
    this.setState( { eData: undefined } );
    this.props.option.fktClose();
  }

  handleExampleOnChange = (event) => {
    const { value } = event.target;

    let tmpData = cloneObject( this.state.eData );

    tmpData.value = value;
    this.setState( { eData: tmpData } );
  }

  render() {
    //console.log( "MsgBox-RENDER", this.props.option );
    if(!this.props.option){ return null; }
    if(!this.props.option.fktClose){ return null; }
    if(this.props.option.showAction !== true ){ return null; }
    if( this.state.eData === undefined ){ return null; }
    
    //console.log( "ExBox-GO [0]" );
  	const mbCap = "Example";
    let objElement = null;
    const mbBtn = [ {btnText:"Ok", iconName:"ok", retVal:true, btnColor: "green" } ]; 

    //console.log( "EDATA", this.state.eData );

    switch (this.state.eData.type) {
      case 'TB': objElement = ( <InputTextBox elementData={this.state.eData} onChange={this.handleExampleOnChange} /> ); break;
      case 'TN': objElement = ( <InputTextNumeric elementData={this.state.eData} onChange={this.handleExampleOnChange} /> ); break;
      case 'TA': objElement = ( <InputTextArea elementData={this.state.eData} onChange={this.handleExampleOnChange} /> ); break;
      case 'TC': objElement = ( <InputTextColor elementData={this.state.eData} onChange={this.handleExampleOnChange} /> ); break;
      case 'CB': objElement = ( <InputCheckBox elementData={this.state.eData} onChange={this.handleExampleOnChange} /> ); break;
      default: break;
    }

    //console.log( "MsgBox-GO [2]" );
    const btnList = mbBtn.map( (btn, id) => {
        return (
            <Button key={`mb_btn_${id}`} size="sm" variant={btn.btnColor} onClick={this.closeElementExample}><IconSvg ico={btn.iconName} cls="svg-btn svg-cw90 svg-mr"/>{btn.btnText}</Button>
          )
      })

    //console.log( "MsgBox-GO [3]" );
    return (
      <Modal 
        size="md"
        centered
        show={this.props.option.showAction}
        style={{color:"black"}}
        onHide={() => {this.closeElementExample()}}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <img style={{marginRight: "20px"}} alt="mmb-logo" src="../../arts_craft_base_logo.svg" width="40" height="40" />
          <h3>{mbCap}</h3>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: "#C0C0C0"}}>
          <Row>
            <Col sm="3"><span><b>Element:</b></span></Col>
            <Col sm="9"><span>{this.state.eData.label}</span></Col>
          </Row>
          <Row>
            <Col sm="3"><span><b>Type:</b></span></Col>
            <Col sm="9"><span>{`${this.state.eData.tname} [${this.state.eData.type}]`}</span></Col>
          </Row>
        </Modal.Body>
        <Modal.Body style={{backgroundColor: "#A0A0A0"}}>
          {objElement}
        </Modal.Body>
        <Modal.Footer>
          {btnList}
        </Modal.Footer>
      </Modal>
    )
  }
}
