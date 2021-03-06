import React, { Component } from 'react'
import { Button, Modal } from "react-bootstrap";
import IconSvg from "../Icons/IconSvg";

export default class MessageBox extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  closeMessageBox = (returnValue) => {
    this.props.option.fktConfirm(returnValue);
  }

  render() {
    //console.log( "MsgBox-RENDER", this.props.option );
    if(!this.props.option){ return null; }
    if(!this.props.option.fktConfirm){ return null; }
    if(this.props.option.showAction !== true ){ return null; }
    //console.log( "MsgBox-GO [0]" );

  	const mbCap = this.props.option.title ? this.props.option.title : "";
    let mbMsg = this.props.option.message ? this.props.option.message.split("\n") : [];
    const mbIco = this.props.option.icon ? this.props.option.icon : ""; 
    const mbIcoColor = this.props.option.iconColor ? this.props.option.iconColor : "#f6f6d5"; 
    const mbIcoTC = this.props.option.iconCW ? "svg-cw90" : "svg-cd90";
    const mbBtn = this.props.option.btn ? this.props.option.btn : [ {btnText:"Ok", iconName:"ok", retVal:true, btnColor: "dark" }]; 
    const icoStyle = { padding: "10px", margin: "5px 5px 5px 0px", backgroundColor: mbIcoColor }; //, boxShadow: "2px 2px 5px black" };

    //console.log( "MsgBox-GO [1]" );
    let mbMsgOut = mbMsg.map( (msg,id) => {
        return <p key={`p_${id}`} style={{marginBottom: "0.25rem"}}>{msg}</p>
      });

    //console.log( "MsgBox-GO [2]" );
    const btnList = mbBtn.map( (btn, id) => {
        return (
            <Button key={`mb_btn_${id}`} size="sm" variant={btn.btnColor} onClick={() => {this.closeMessageBox(btn.retVal)}}><IconSvg ico={btn.iconName} cls="svg-btn svg-cw90 svg-mr"/>{btn.btnText}</Button>
          )
      })

    //console.log( "MsgBox-GO [3]" );

    return (
      <Modal 
        size="md"
        centered
        show={this.props.option.showAction}
        style={{color:"black"}}
        onHide={() => {this.closeMessageBox(false)}}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <img style={{marginRight: "20px"}} alt="mmb-logo" src="../../arts_craft_base_logo.svg" width="40" height="40" />
          <h3>{mbCap}</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="f-row fj-spa xfa-cen"> 
            <div className="f-col xfa-cen" style={{flexGrow: "1"}}>         
              <div style={icoStyle}>
                <IconSvg ico={mbIco} cls={`svg-big ${mbIcoTC}`} />
              </div>
            </div>
            <div className="f-col" style={{flexGrow: "4"}}>                
              {mbMsgOut}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {btnList}
        </Modal.Footer>
      </Modal>
    )
  }
}
