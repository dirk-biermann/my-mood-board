import React, { Component } from 'react'
import { Form, InputGroup } from "react-bootstrap";

export default class InputTextSelect extends Component {
  constructor(){
    super()
    this.state = {
    }
  };

  handleOnChange = (event) => {
    if( this.props.onChange ) {
      this.props.onChange( event )
    }
  }

  render() {
    const marginBottom = this.props.margin ? {marginBottom: "0.5rem"} : {};
    const autoFocus = this.props.autoFocus ? true : false;
    const readOnly = this.props.readOnly ? true : false;
    const isDisabled = this.props.isDisabled ? true : false;
    const showValue = this.props.showValue ? true : false;

    return (
      <div className='myRow' style={marginBottom}>
        <Form.Label className="myCol-33"><nobr>{this.props.label}</nobr></Form.Label>
        <InputGroup>
          <Form.Control
              as="select"
              name={this.props.name}
              id={this.props.name}
              value={this.props.value}
              onChange={this.handleOnChange}
              placeholder={this.props.placeholder}
              autoFocus={autoFocus}
              readOnly={readOnly}
              disabled={isDisabled}
              aria-describedby="etype-addon"
            >
            { this.props.options.map( (option, id) => {
                  return( <option key={`opt_key_${id}`} value={option[0]}>{option[1]}</option> )
                }
              )
            }
          </Form.Control>
          { showValue && (
              <InputGroup.Append>
                <InputGroup.Text id="etype-addon" style={{minWidth:"50px"}}>{this.props.value}</InputGroup.Text>
              </InputGroup.Append>
            )
          }
        </InputGroup>    
      </div>
    )

  }
}

/*
    return (
      <div className="myRow" style={marginBottom}>




              <Form.Group as={Col} sm="6" md="4" lg="3">
                <Row style={{marginBottom: "1rem"}}>
                  <Col sm="3" style={{paddingRight: "5px", textAlign: "right"}}>
                    <Form.Label>Element:</Form.Label>
                  </Col>
                  <Col sm="9">
                    <InputGroup>
                      <Form.Control
                          as="select"
                          name="type"
                          disabled={this.state.isEditMode}
                          id="type"
                          value={this.state.typeSelected}
                          onChange={this.handleChangeSelect}
                          aria-describedby="etype-addon"
                        >
                        { this.state.typeList.map( (element, id) => {
                              return( <option key={`opt_key_${id}`} value={element[0]}>{element[1]}</option> )
                            }
                          )
                        }
                      </Form.Control>              
                      <InputGroup.Append>
                        <InputGroup.Text id="etype-addon" style={{width:"50px"}}>{this.state.typeSelected}</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>    
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    {btnListEdit}
                  </Col>
                </Row>
              </Form.Group>

*/
