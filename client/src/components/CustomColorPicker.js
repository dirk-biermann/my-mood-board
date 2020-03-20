import React, { Component } from 'react'
import { ButtonToolbar, Button, Card, Badge } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";
import { SketchPicker } from 'react-color';

export default class CustomColorPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
        showPicker: false,
        orgBackground: props.hex,
        curBackground: props.hex,
        endBackground: props.hex
    }
  }

  handleClickColor = () => {
    this.setState({ showPicker: !this.state.showPicker });
  };

  handleChangeColor = (color, event) => {
    this.setState({ curBackground: color.hex });
  };

  handleChangeCompleteColor = (color, event) => {
    this.setState({ endBackground: color.hex });
  };

  handleOnAcceptColor = () => {
    console.log( "Accept", this.state.endBackground );
    this.props.pickupColor( this.state.endBackground );
    this.setState({ showPicker: false });  
  } 

  handleOnCancelColor = (color,event) => {
    console.log( "Cancel" );
    this.props.pickupColor( this.state.orgBackground );
    this.setState({ showPicker: false });  
  } 

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '1000',
      top: '0px'
    }

    return (
      <>
        <nobr>
          <Button className="mmb-btn-s va-top w-100" variant="dark" onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button>
          { this.props.showDemo && (
              <Badge className="badge-color" style={{backgroundColor: this.state.curBackground}}></Badge>
            )
          }
        </nobr>
        { this.state.showPicker && (
            <div style={ popover }>
              <SketchPicker
                color={ this.state.curBackground }
                onChange={ this.handleChangeColor }
                disableAlpha={true}
                onChangeComplete={ this.handleChangeCompleteColor }
              />
              <Card style={{marginTop: "5px", padding: "2px"}}>
                <ButtonToolbar className="justify-content-between">                            
                  <Button className="mmb-btn-s mmb-50" variant="green" onClick={this.handleOnAcceptColor}><IconSvg ico="ok" cls="svg-btn svg-cw90 svg-mr"/>Ok</Button>
                  <Button className="mmb-btn-s mmb-50" variant="red" onClick={this.handleOnCancelColor}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
                </ButtonToolbar>
              </Card>
            </div>
          )
        }
      </>
    ) 
  }
}
