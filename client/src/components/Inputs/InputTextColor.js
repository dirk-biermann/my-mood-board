import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import CustomColorPicker from "./CustomColorPicker";
import { getElementData } from "../../services/init";

export default class InputTextColor extends Component {

  handleChangeColor = (name, color) => {
    //console.log( "PickUp Color: ", color );
    this.props.onChange( { target: { name: name, value: color, idx: this.props.idx } } );
  }

  handleOnChange = (event) => {
    const { value } = event.target;

    if( this.props.onChange ) {
      this.props.onChange( { target: { name: this.props.name, value: value, idx: this.props.idx } } );
    }
  }

  render() {
    const dataValue = getElementData(this.props);    
    return (
      <>
        <div className='myRow' style={dataValue.marginBottom}>
          <Form.Label className="myCol-33"><nobr>{dataValue.props.label}</nobr></Form.Label>
          <div style={{width:"100%", display:"flex", justifyContent: "space-between"}}>
            <Form.Control style={{marginRight: "5px"}}
                as="input"
                type="text"
                name={dataValue.props.name}
                value={dataValue.props.value}
                onChange={this.handleOnChange}
                placeholder={dataValue.props.placeholder}
                autoFocus={dataValue.props.autoFocus}
                readOnly={true}
              />
            <CustomColorPicker readOnly={dataValue.props.readOnly} name={dataValue.props.name} hex={dataValue.props.value} pickupColor={this.handleChangeColor} showDemo={true}/>
          </div>
        </div>
      </>
    )
  }
}
