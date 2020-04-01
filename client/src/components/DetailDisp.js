import React, { Component } from 'react'
import { Modal, Button, Form, Col } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";
import InputTextBox from "./Inputs/InputTextBox";
import InputTextArea from "./Inputs/InputTextArea";
//import InputTextNumeric from "./Inputs/InputTextNumeric";
import InputTextSelect from "./Inputs/InputTextSelect";
//import InputTextColor from "./Inputs/InputTextColor";

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
    const hasMaterial = this.props.dispInfo.materials ? ( this.props.dispInfo.materials.length > 0 ? true : false ) : false;
    const hasElements = this.props.dispInfo.elements ? ( this.props.dispInfo.elements.length > 0 ? true : false ) : false;
    let optionInfo = { list:[] };
    
    if( hasMaterial ) {
      optionInfo.list = this.props.dispInfo.materials.map( (material,i) => {
          return( [ i, material.name ] );
        });
      optionInfo.listTitle = 'Materials:';
      optionInfo.listName = 'materials';
    }
    if( hasElements ) {
      optionInfo.list = this.props.dispInfo.elements.map( (element,i) => {
          return( [ i, `${element.label} [${element.type}]` ] );
        });
      optionInfo.listTitle = 'Elements:';
      optionInfo.listName = 'elements';
    }

    //console.log( "DIDPINFO:", this.props.dispInfo );
    //console.log( "OPTINFO:", optionInfo );

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.closeDetailDisp}
      >
        <Modal.Header className="bg-dark text-light" style={{borderBottom: "none", justifyContent: "space-between"}}>
          <IconSvg ico={this.props.ico} cls="svg-btn svg-sw-10 svg-cw25 svg-mr"/>
          <h3>{this.props.title} Detail</h3>
          <Button className="" size="sm" variant="red" onClick={this.closeDetailDisp}><IconSvg ico="close" cls="svg-btn svg-cw90"/></Button>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">
          <Form>
            <Form.Row style={{width:"100%"}}>
              <Form.Group as={Col} sm="12">
                <InputTextBox
                  value={this.props.dispInfo.name || ''}
                  label={"Name:"}
                  name={"name"} 
                  readOnly={true}
                  margin={true}
                />
                <InputTextBox
                  value={this.props.dispInfo.imageUrl || ''}
                  label={"ImageUrl:"}
                  name={"imageUrl"} 
                  readOnly={true}
                  margin={true}
                />
                { this.props.dispInfo.status && (
                    <InputTextBox
                      value={this.props.dispInfo.status || ''}
                      label={"Status:"}
                      name={"status"} 
                      readOnly={true}
                      margin={true}
                    />
                  )                
                }
                <InputTextArea
                  value={this.props.dispInfo.description || ''}
                  label={"Description:"}
                  name={"description"} 
                  readOnly={true}
                  margin={true}
                  minHeight={"55px"}
                  rows={2}
                />
                { this.props.dispInfo.notes && (
                    <InputTextArea
                      value={this.props.dispInfo.notes || ''}
                      label={"Notes:"}
                      name={"notes"} 
                      readOnly={true}
                      margin={true}
                      minHeight={"55px"}
                      rows={2}
                    />
                  )
                }
                { optionInfo.listTitle && (
                  <InputTextSelect 
                      value={0}
                      label={optionInfo.listTitle}
                      name={optionInfo.listName}
                      options={optionInfo.list} 
                      readOnly={true}
                  />
                  
                  )
                }
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}
