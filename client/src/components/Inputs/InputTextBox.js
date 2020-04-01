import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import { getElementData } from "../../services/init";

export default class InputTextBox extends Component {

  
  render() {
    const dataValue = getElementData(this.props);    
    return (
      <div className='myRow' style={dataValue.marginBottom}>
        <Form.Label className="myCol-33"><nobr>{dataValue.props.label}</nobr></Form.Label>
        <Form.Control
          as="input"
          type="text"
          name={dataValue.props.name}
          value={dataValue.props.value}
          onChange={this.props.onChange}
          placeholder={dataValue.props.placeholder}
          autoFocus={dataValue.props.autoFocus}
          readOnly={dataValue.props.readOnly}
          maxLength={dataValue.len}
        />
      </div>
    )
  }
}
