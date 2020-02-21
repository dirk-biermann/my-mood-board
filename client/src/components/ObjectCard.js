import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";
import ImageDisp from "./ImageDisp";

export default class MoodCard extends Component {
  constructor(){
    super()
    this.state = {
      showImage: false
    };
    this.imgUrl = "./democard.png";
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  showImageDisp = () => {
    this.setState({ showImage: true });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  hideImageDisp = () => {
    this.setState({ showImage: false });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleThisSettings = () => {
    this.props.handleObjectSettings(this.props.idx);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    return (
      <>
        <Card border="dark">
          <Card.Img className="cardImage" src={this.imgUrl} alt="Image" />
          <Card.ImgOverlay>
            <Card.Title className="ico-row" style={{justifyContent: "space-between"}}>
              <div className="f-item"><IconSvg ico="project" cls="svg-btn svg-sw-10 svg-cw25"/></div>
              <div>
                <div className="f-item acb-a-svg" onClick={this.handleThisMoodboard}><IconSvg ico="moodboard" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                <div className="f-item acb-a-svg" onClick={this.handleThisSettings}><IconSvg ico="doc" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                <div className="f-item acb-a-svg" onClick={this.showImageDisp}><IconSvg ico="expand" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
              </div>
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
        <ImageDisp show={this.state.showImage} img={this.imgUrl} close={this.hideImageDisp} />
      </>
    )
  }
}
