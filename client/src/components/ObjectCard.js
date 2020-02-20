import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class MoodCard extends Component {
  constructor(){
    super()
    this.state = {
    };
    this.imgUrl = "./democard.png";
  };
 
  handleThisExpand = () => {
    this.props.handleObjectExpand(this.props.idx);
  }

  handleThisSettings = () => {
    this.props.handleObjectSettings(this.props.idx);
  }

  render() {
    return (
      <Card border="dark">
        <Card.Img className="cardImage" src={this.imgUrl} alt="Image" />
        <Card.ImgOverlay>
          <Card.Title className="ico-row">
            <div className="f-item acb-a-svg" onClick={this.handleThisExpand}><IconSvg ico="expand" cls="svg-sw10 svg-cw25-h"/></div>
            <div className="f-item acb-a-svg" onClick={this.handleThisSettings}><IconSvg ico="menu" cls="svg-sw10 svg-cw25-h"/></div>
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
    )
  }
}
