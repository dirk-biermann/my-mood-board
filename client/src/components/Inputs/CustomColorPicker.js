import React, { Component } from 'react'
import { ButtonToolbar, Button, Card, Badge, Form, Row } from "react-bootstrap";
import IconSvg from "../Icons/IconSvg";
import { SketchPicker } from 'react-color';

export default class CustomColorPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
        showPicker: false
    }
  }

  handleClickColor = () => {
    this.setState({ showPicker: !this.state.showPicker });
  };

  handleChangeColor = (color, event) => {
    this.setState({ curBackground: color.hex.toUpperCase() });
  };

  handleChangeCompleteColor = (color, event) => {
    this.setState({ endBackground: color.hex.toUpperCase() });
  };

  handleOnAcceptColor = () => {
    this.setState({ showPicker: false, orgBackground: this.state.endBackground });  
    this.props.pickupColor( this.props.name, this.state.endBackground );
  } 

  handleOnCancelColor = (color,event) => {
    this.setState({ showPicker: false, curBackground: this.state.orgBackground });  
    this.props.pickupColor( this.props.name, this.state.orgBackground );
  } 

  componentDidMount() {
    this.setState({
        orgBackground: this.props.hex,
        curBackground: this.props.hex,
        endBackground: this.props.hex });
  }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '1000',
      top: '0px'
    }

    const colorCard = { marginLeft: "5px", height: "100%", padding: "2px", fontSize: "12px" };
    const orgColor = { border: "0px", height: "calc( 50% - 3px )", backgroundColor: this.state.orgBackground, width: "80px" };
    const newColor = { border: "0px", height: "calc( 50% - 2px )", backgroundColor: this.state.curBackground, width: "80px", marginTop: "5px" };
    const bkgHeader = { backgroundColor:"#343a40", color:"#f8f9fa", textAlign: "center", padding: "2px" };

    return (
      <Form.Row style={{marginRight: "0"}}>
        { this.props.showDemo ? (
            <nobr>
              <Button className="badge-color mmb-btn-s va-top" variant="dark" onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button>
              <Badge className="badge-color" style={{backgroundColor: this.state.curBackground}}></Badge>
            </nobr>
          ):(
            <nobr>
              <Button className="mmb-btn-s va-top w-100" variant="dark" onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button>
            </nobr>
          )
        }
        { this.state.showPicker && (
            <div style={ popover }>
              <Row style={{flexWrap: "nowrap"}}>
                <div>
                  <SketchPicker
                    color={ this.state.curBackground }
                    onChange={ this.handleChangeColor }
                    disableAlpha={true}
                    onChangeComplete={ this.handleChangeCompleteColor }
                    presetColors={[]}
                  />
                </div>
                <div>
                  <Card style={colorCard}>
                    <Card style={orgColor}>
                      <Card.Header style={bkgHeader}><nobr>Old Color</nobr></Card.Header>
                    </Card>
                    <Card style={newColor}>
                      <Card.Header style={bkgHeader}><nobr>New Color</nobr></Card.Header>
                    </Card>
                  </Card>
                </div>
              </Row>
              <Row style={{flexWrap: "nowrap"}}>
                <div style={{width: "100%"}}>
                  <Card style={{marginTop: "5px", padding: "2px"}}>
                    <ButtonToolbar className="justify-content-between">                            
                      <Button className="mmb-btn-s mmb-50" variant="green" onClick={this.handleOnAcceptColor}><IconSvg ico="ok" cls="svg-btn svg-cw90 svg-mr"/>Ok</Button>
                      <Button className="mmb-btn-s mmb-50" variant="red" onClick={this.handleOnCancelColor}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
                    </ButtonToolbar>
                  </Card>
                </div>
              </Row>
            </div>
          )
        }
      </Form.Row>
    ) 
  }
}
