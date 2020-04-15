import React, { Component } from 'react'
import { Form, InputGroup } from "react-bootstrap";
import { toInt, getElementData } from "../../services/init";

export default class InputTextNumeric extends Component {
  constructor(){
    super()
    this.state = {
      //dataValue: getElementData(props)
    }
  };

  handleNumericInputChange = (event) => {
    let {name,value} = event.target;
    let dataValue = getElementData(this.props);
    
    let validValue = toInt(value,10);

    if( dataValue.min !== "" ) { validValue = ( validValue >= toInt(dataValue.min,10) ) ? validValue : toInt(dataValue.props.value,10); }
    if( dataValue.max !== "" ) { validValue = ( validValue <= toInt(dataValue.max,10) ) ? validValue : toInt(dataValue.props.value,10); }
      
    //console.log( "E-CHG:", name, " value:", value, " orgValue:", dataValue.props.value, " min:", dataValue.min, " max:", dataValue.max, " validValue:", validValue );
    
    this.props.onChange( {target: {name: name, value: validValue, idx: this.props.idx }} );
  }

  render() {
    const dataValue = getElementData(this.props);
    return (
      <div className='myRow' style={dataValue.marginBottom}>
        <Form.Label className="myCol-33"><nobr>{dataValue.props.label}</nobr></Form.Label>
          {dataValue.hasUnit ? (
              <InputGroup>
                <Form.Control
                  as="input"
                  type="number"
                  min={dataValue.min}
                  max={dataValue.max}
                  step="1"
                  name={dataValue.props.name}
                  value={dataValue.props.value}
                  onChange={this.handleNumericInputChange}
                  placeholder={dataValue.props.placeholder}
                  autoFocus={dataValue.props.autoFocus}
                  readOnly={dataValue.props.readOnly}
                  aria-describedby="etype-addon"
                />
                <InputGroup.Append>
                  <InputGroup.Text id="etype-addon" style={{minWidth:"60px"}}>{dataValue.valUnit}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>    

            ):(
              <Form.Control
                as="input"
                type="number"
                min={dataValue.min}
                max={dataValue.max}
                name={dataValue.props.name}
                value={dataValue.props.value}
                onChange={this.handleNumericInputChange}
                placeholder={dataValue.props.placeholder}
                autoFocus={dataValue.autoFocus}
                readOnly={dataValue.readOnly}
              />
            )
          }
      </div>
    )
  }
}
