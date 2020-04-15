import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import IconSvg from "../Icons/IconSvg";

export default class CustomButton extends Component {
  showTooltip = (info) => {
    return ( <Tooltip className="shw-acb" id={'tooltip-top'}>{info[0]} <strong>{info[1]}</strong></Tooltip> );
  }

  render() {
    let objIcon = "";

    const txt = this.props.txt ? this.props.txt : "";

    if( this.props.ico ) {
      const cls = this.props.ico.cls ? this.props.ico.cls : "";
      objIcon = <IconSvg ico={this.props.ico.name} cls={cls}/>
    }

    return (
      <>
        { this.props.disabled ? (
            <Button disabled={this.props.disabled} className={this.props.cls} variant={this.props.color} onClick={this.props.onClick}><nobr>{objIcon}{txt}</nobr></Button>
          ):(
            <OverlayTrigger placement="left" overlay={this.showTooltip(this.props.info)}>
              <Button disabled={this.props.disabled} className={this.props.cls} variant={this.props.color} onClick={this.props.onClick}><nobr>{objIcon}{txt}</nobr></Button>
            </OverlayTrigger>
          )
        }
      </>
    )
  }
}
