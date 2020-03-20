import React, { Component } from 'react'
import { Form, Row, Col, Button, InputGroup, Table, Badge } from "react-bootstrap";
import SiteHeader from "./SiteHeader";
import { cloneObject } from "../services/init";
import IconSvg from "./Icons/IconSvg";
import CustomColorPicker from "./CustomColorPicker";

export default class ElementBoard extends Component {
  constructor(){
    super();
    this.state = {
        element: {
                  e_type: 'TB',
                  e_label: '',
                  e_name: '',
                  e_default: '',
                  e_dcolor: '#FFFFFF',
                  e_phold: '',
                  e_min: '',
                  e_max: '',
                  e_len: '',
                  e_val: ''
               },
       elements: []
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handlePickupColor = (hex) => {
    let tmpElement = cloneObject( this.state.element );

    tmpElement.e_dcolor = hex;

    this.setState({
        element: tmpElement
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeInput = (event) => {
    const { name, value } = event.target;
    let tmpElement = cloneObject( this.state.element );

    tmpElement[name] = value;

    this.setState({
        element: tmpElement
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleAddElement = () => {
    let tmpElements = this.state.elements.slice();
    tmpElements.push( cloneObject(this.state.element ) );

    this.setState({
        elements: tmpElements
      });
  };

  render() {
    let pageTitle = 'Element Board';
    let btnList = [];

    btnList.push( <Button key={'ele_01'} className="mr-2 mb-1" variant="green" onClick={this.handleAddElement}><IconSvg ico="plus" cls="svg-btn svg-cw90 svg-mr"/>Add Element</Button> );

    return (
      <>
        <SiteHeader ico="layout" title={pageTitle} bkg={this.state.endBackground}/>
        <Form>
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="6" md="3" lg="2">
              <Row>
                <Col sm="3">
                  <Form.Label>Type:</Form.Label>
                </Col>
                <Col sm="9">
                  <InputGroup>
                    <Form.Control
                        as="select"
                        name="e_type"
                        id="e_type"
                        default={'TB'}
                        onChange={this.handleChangeInput}
                        aria-describedby="etype-addon"
                      >
                      <option value="TB">TextBox</option>
                      <option value="TA">TextArea</option>
                      <option value="TN">TextNumeric</option>
                      <option value="TC">TextColor</option>
                      <option value="CB">CheckBox</option>
                    </Form.Control>              
                    <InputGroup.Append>
                      <InputGroup.Text id="etype-addon">{this.state.element.e_type}</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>    
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} sm="6" md="4" lg="2">
              <Row style={{marginBottom: "1rem"}}>
                <Col sm="3">
                  <Form.Label>Label:</Form.Label>
                </Col>
                <Col sm="9">
                  <Form.Control
                    as="input"
                    type="text"
                    name="e_label"
                    value={this.state.element.e_label}
                    onChange={this.handleChangeInput}
                    placeholder="Enter Label Text"
                    autoFocus={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="3">
                  <Form.Label>Name:</Form.Label>
                </Col>
                <Col sm="9">
                  <Form.Control
                    as="input"
                    type="text"
                    name="e_name"
                    value={this.state.element.e_name}
                    onChange={this.handleChangeInput}
                    placeholder="Enter Name Qualifier"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} sm="6" md="3" lg="3">
              { this.state.element.e_type==='TC' ? (
                  <Row style={{marginBottom: "1rem"}}>
                    <Col sm="3">
                      <Form.Label>Default:</Form.Label>
                    </Col>
                    <Col sm="5">
                      <InputGroup>
                        <Form.Control
                          readOnly={true}
                          as="input"
                          type="text"
                          name="e_dcolor"
                          value={this.state.element.e_dcolor}
                          onChange={this.handleChangeInput}
                          placeholder="No Color"
                          aria-describedby="ecolor-addon"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text style={{backgroundColor: this.state.element.e_dcolor, width:"40px"}} id="ecolor-addon"></InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col sm="4">
                      <CustomColorPicker hex={this.state.element.e_dcolor} pickupColor={this.handlePickupColor} showDemo={false}/>
                    </Col>
                  </Row>
                ) : (
                  <Row style={{marginBottom: "1rem"}}>
                    <Col sm="3">
                      <Form.Label>Default:</Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Control
                        as="input"
                        type="text"
                        name="e_default"
                        value={this.state.element.e_default}
                        onChange={this.handleChangeInput}
                        placeholder="Enter Default Value"
                      />
                    </Col>
                  </Row>
                )
              }
            </Form.Group>
            <Form.Group as={Col} sm="6" md="3" lg="3">
              {this.state.element.e_type==='TN' && (
                  <>
                    <Row style={{marginBottom: "1rem"}}>
                      <Col sm="3">
                        <Form.Label>Min:</Form.Label>
                      </Col>
                      <Col sm="5">
                        <Form.Control
                          as="input"
                          type="number"
                          name="e_min"
                          min="0"
                          value={this.state.element.e_min}
                          onChange={this.handleChangeInput}
                          placeholder="Min Value"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <Form.Label>Max:</Form.Label>
                      </Col>
                      <Col sm="5">
                        <Form.Control
                          as="input"
                          type="number"
                          name="e_max"
                          min="0"
                          value={this.state.element.e_max}
                          onChange={this.handleChangeInput}
                          placeholder="Max Value"
                        />
                      </Col>
                    </Row>
                  </>
                )
              }
              { ( this.state.element.e_type==='TB' || this.state.element.e_type==='TA' ) && (
                <Row>
                  <Col sm="3">
                    <Form.Label>Text Len:</Form.Label>
                  </Col>
                  <Col sm="5">
                    <Form.Control
                      as="input"
                      type="number"
                      name="e_len"
                      min="0"
                      value={this.state.element.e_len}
                      onChange={this.handleChangeInput}
                      placeholder="Max Text Length"
                    />
                  </Col>
                </Row>
              )}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm="12">
              {btnList}
            </Form.Group>
          </Form.Row>
          
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="12">
              <Table responsive striped hover variant="dark" className="tab-vcenter" style={{marginBottom: "0"}}>
                <thead style={{backgroundColor: "#303030"}}>
                  <tr>
                    <th>Type</th>
                    <th>Label</th>
                    <th>Name</th>
                    <th>Default</th>
                    <th className="brd-left">Options</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="brd-left">Action</th>
                  </tr>
                </thead>
                <tbody style={{fontSize: "1rem"}}>
                {
                  this.state.elements.map( (element, id) => {
                    return (
                      <tr key={`element_row_${id}`}>
                        <td>{element.e_type}</td>
                        <td>{element.e_label}</td>
                        <td>{element.e_name}</td>
                        { element.e_type==='TC' ? (
                            <td>{element.e_dcolor}<Badge className="badge-color-td" style={{backgroundColor: element.e_dcolor}}><span></span></Badge></td>
                          ):(
                            <td>{element.e_default}</td>
                          )
                        }
                        { (element.e_type==='TB'||element.e_type==='TA') && (
                            <>
                              <td className="brd-left">Text Len:</td>
                              <td>{element.e_len}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </>
                          )
                        }
                        { (element.e_type==='TN') && (
                            <>
                              <td className="brd-left">Min:</td>
                              <td>{element.e_min}</td>
                              <td>Max:</td>
                              <td>{element.e_max}</td>
                              <td></td>
                              <td></td>
                            </>
                          )
                        }
                        { (element.e_type==='TC'||element.e_type==='CB') && (
                            <>
                              <td className="brd-left"></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </>
                          )
                        }
                        <td className="brd-left">
                          <nobr>
                            <Button className="mmb-btn-s mr-2" variant="blue" onClick={ ()=>{} }><IconSvg ico="edit" cls="svg-btn svg-cw90 svg-mr"/>Edit</Button>
                            <Button className="mmb-btn-s" variant="red" onClick={ ()=>{} }><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>
                          </nobr>
                        </td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            </Form.Group>
          </Form.Row>
        </Form>
      </>
    )
  }
}
