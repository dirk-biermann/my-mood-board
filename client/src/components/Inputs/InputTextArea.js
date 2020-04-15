import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import { getElementData } from "../../services/init";

export default class InputTextArea extends Component {

  handleOnChange = (event) => {
    const { name, value } = event.target;

    if( this.props.onChange ) {
      this.props.onChange( { target: { name: name, value: value, idx: this.props.idx } } );
    }
  }

  render() {
    const dataValue = getElementData(this.props);    
    return (
      <div className='myRow' style={dataValue.marginBottom}>
        <Form.Label className="myCol-33"><nobr>{dataValue.props.label}</nobr></Form.Label>
        <Form.Control style={dataValue.minHeight}
          as="textarea"
          type="text"
          rows={dataValue.rowCnt}
          name={dataValue.props.name}
          value={dataValue.props.value}
          onChange={this.handleOnChange}
          placeholder={dataValue.props.placeholder}
          autoFocus={dataValue.props.autoFocus}
          maxLength={dataValue.len}
          readOnly={dataValue.props.readOnly}
        />
      </div>
    )
  }
}
