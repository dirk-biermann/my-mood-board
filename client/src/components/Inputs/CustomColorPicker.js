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
      //top: '50px',
      right: '20px',
      bottom: '-50px'
    }

    const colorCard = { marginLeft: "5px", height: "100%", padding: "2px", fontSize: "12px" };
    const orgColor = { border: "1px solid #ddd", height: "calc( 50% - 3px )", backgroundColor: this.state.orgBackground, width: "80px" };
    const newColor = { border: "1px solid #ddd", height: "calc( 50% - 2px )", backgroundColor: this.state.curBackground, width: "80px", marginTop: "5px" };
    const bkgHeader = { backgroundColor:"#343a40", color:"#f8f9fa", textAlign: "center", padding: "2px" };

    const isDisabled = this.props.readOnly ? this.props.readOnly : false;
    let btnPickUp = '';

    if( this.props.showDemo ) {
      if( isDisabled === true ) {
        btnPickUp = <><Button className="badge-color mmb-btn-s va-top xxx" disabled variant="dark" onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button></>
      } else {
        btnPickUp = <><Button className="badge-color mmb-btn-s va-top" variant="dark" onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button></>
      }
    } else {
      if( isDisabled === true ) {
        btnPickUp = <><Button className="mmb-btn-s va-top w-100 xxx" variant="dark" disabled onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button></>
      } else {
        btnPickUp = <><Button className="mmb-btn-s va-top w-100" variant="dark" onClick={this.handleClickColor}><IconSvg ico="palette" cls="svg-btn svg-cw90 svg-mr"/>Pick Color</Button></>
      }
    }

/*
    const presetColors = [
      '#4D4D4D','#999999','#FFFFFF','#F44E3B','#FE9200','#FCDC00','#DBDF00','#A4DD00',
      '#68CCCA','#73D8FF','#AEA1FF','#FDA1FF','#333333','#808080','#CCCCCC','#D33115',
      '#E27300','#FCC400','#B0BC00','#68BC00','#16A5A5','#009CE0','#7B64FF','#FA28FF',
      '#000000','#666666','#B3B3B3','#9F0500','#C45100','#FB9E00','#808900','#194D33',
      '#0C797D','#0062B1','#653294','#AB149E'
    ];
*/

    return (
      <Form.Row style={{marginRight: "0"}}>
        { this.props.showDemo ? (
            <nobr>
              <Badge className="badge-color" style={{border: "1px solid #ced4da", backgroundColor: this.state.curBackground}}></Badge>
              {btnPickUp}
            </nobr>
          ):(
            <nobr>
              {btnPickUp}
            </nobr>
          )
        }
        { this.state.showPicker && (
            <div style={ popover }>
              <Row style={{flexWrap: "nowrap", boxShadow: "0px 0px 30px 10px #000", backgroundColor: "rgba(0,0,0,0.75)"}}>
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
              <Row style={{flexWrap: "nowrap", boxShadow: "0px 0px 30px 10px #000", backgroundColor: "rgba(0,0,0,0.75)"}}>
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
