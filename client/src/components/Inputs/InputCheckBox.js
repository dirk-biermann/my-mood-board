import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import { getElementData } from "../../services/init";

export default class InputCheckBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      curState: this.getCurState( props )
    }
  };

  getCurState = (props) => {
    let curState = false;
    
    if( props.elementData ) {
      if( props.elementData.value === null ) {
        curState = ( typeof props.elementData.opt.def === 'boolean' ) ? props.elementData.opt.def : false;
      } else {
        curState = ( typeof props.elementData.value === 'boolean' ) ? props.elementData.value : false;
      }
    } else {
      curState = ( typeof this.props.value === 'boolean' ) ? this.props.value : false;
    }
    return curState;
  }

  handleOnChange = (event) => {
    if( this.props.onChange ) {
      this.props.onChange( { target: { name: this.props.name, value: !this.state.curState } } );
    }
    this.setState( {curState: !this.state.curState } );
  }

  render() {
    const dataValue = getElementData(this.props);
  
    return (
      <div className='myRow' style={dataValue.marginBottom}>
        <Form.Label className="myCol-33 mr-2"><nobr>{dataValue.props.label}</nobr></Form.Label>
        { dataValue.props.isDisabled ? (
            <Form.Check className="myCol-66"
              disabled
              type="switch"
              id="custom-switch"
              label=""
              autoFocus={dataValue.props.autoFocus}
              readOnly={dataValue.props.readOnly}
              onChange={this.handleOnChange}
              checked={this.state.curState}
              name={dataValue.props.name}
            />
          ):(
            <Form.Check className="myCol-66"
              type="switch"
              id="custom-switch"
              label=""
              autoFocus={dataValue.props.autoFocus}
              readOnly={dataValue.props.readOnly}
              onChange={this.handleOnChange}
              checked={this.state.curState}
              name={dataValue.props.name}
            />
          )
        }
      </div>
    )
  }
}
