import React, { Component } from 'react'
import { Card } from "react-bootstrap";

export default class MoodCard extends Component {
  constructor(){
    super()
    this.state = {
    };
    this.imgUrl = "./democard.png";
  };
 
  render() {
    return (
      <Card border="dark">
        <Card.Img className="cardImage" src={this.imgUrl} alt="Image" />
      </Card>
    )
  }
}
