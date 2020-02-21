import React, { Component } from 'react'
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";
import ImageDisp from "./ImageDisp";

export default class MoodCard extends Component {
  constructor(){
    super()
    this.state = {
      showImage: false
    };
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
  handleThisDetails = () => {
    this.props.handleObjectDetails(this.props.idx, this.props.typ);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleThisMoodBoard = () => {
    if( this.props.handleObjectMoodBoard ){
      this.props.handleObjectMoodBoard(this.props.idx);
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  showTooltip = (info) => {
    return ( <Tooltip id={'tooltip-top'}>{info[0]} <strong>{info[1]}</strong></Tooltip> );
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let hasMoodBoard = this.props.handleObjectMoodBoard ? true : false;
    let hasDetails = this.props.handleObjectDetails ? true : false;
    let ico = this.props.typ === "p" ? "project" : ( this.props.typ === "m" ? "material" : "template" ); 
    return (
      <>
        <Card border="dark">
          <Card.Img className="cardImage" src={this.props.imgUrl} alt="Image" />
          <Card.ImgOverlay>
            <Card.Title className="ico-row" style={{justifyContent: "space-between"}}>
              <div className="f-item"><IconSvg ico={ico} cls="svg-btn svg-sw-10 svg-cw25"/></div>
              <div>
                { hasMoodBoard && (
                    <OverlayTrigger overlay={this.showTooltip(['Show','MoodBoard'])}>
                      <div className="f-item acb-a-svg" onClick={this.handleThisMoodBoard}><IconSvg ico="moodboard" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasDetails && (
                    <OverlayTrigger overlay={this.showTooltip(['Show','Details'])}>
                      <div className="f-item acb-a-svg" onClick={this.handleThisDetails}><IconSvg ico="doc" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                    </OverlayTrigger>
                  )
                }
                <OverlayTrigger overlay={this.showTooltip(['Expand','Image'])}>
                  <div className="f-item acb-a-svg" onClick={this.showImageDisp}><IconSvg ico="expand" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                </OverlayTrigger>
              </div>
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
        <ImageDisp show={this.state.showImage} img={this.props.imgUrl} close={this.hideImageDisp} />
      </>
    )
  }
}
