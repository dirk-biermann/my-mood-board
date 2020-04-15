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
      this.props.onChange( { target: { name: this.props.name, value: !this.state.curState, idx: this.props.idx } } );
    }
    this.setState( {curState: !this.state.curState } );
  }

  render() {
    const dataValue = getElementData(this.props);
  
    return (
      <div className='myRow' style={dataValue.marginBottom}>
        <Form.Label className="myCol-33"><nobr>{dataValue.props.label}</nobr></Form.Label>
        { ( (dataValue.props.isDisabled) || (dataValue.props.readOnly) ) ? (
          <div className="form-control" readOnly={true} style={{width: "100%"}}>
            <Form.Check
              disabled
              type="switch"
              id="disabled-custom-switch"
              label=""
              autoFocus={dataValue.props.autoFocus}
              onChange={this.handleOnChange}
              checked={this.state.curState}
              name={dataValue.props.name}
            />
          </div>
          ):(
          <div className="form-control" style={{width: "100%"}}>
            <Form.Check
              type="switch"
              id="custom-switch"
              label=""
              autoFocus={dataValue.props.autoFocus}
              onChange={this.handleOnChange}
              checked={this.state.curState}
              name={dataValue.props.name}
            />
          </div>
          )
        }
      </div>
    )
  }
}
