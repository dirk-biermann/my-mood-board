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
  handleThisDelete = () => {
    this.props.handleObjectDelete(this.props.idx, this.props.typ);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleThisOverview = () => {
    if( this.props.handleObjectOverview ){
      this.props.handleObjectOverview(this.props.idx, this.props.typ);
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
    let hasOverviewBoard = this.props.handleObjectOverview ? true : false;
    let hasDetails = this.props.handleObjectDetails ? true : false;
    let hasDelete = this.props.handleObjectDelete ? true : false;

    let icoMain;
    let icoOverview;
    let txtOverview;
    let txtDelete;
    switch (this.props.typ) {
      case "pb":
          icoMain = "project";
          icoOverview = "moodboard";
          txtOverview = "Moodboard";
          txtDelete = "Project";
        break;

      case "pm":
          icoMain = "project";
          icoOverview = "project";
          txtOverview = "Projects";
          txtDelete = "Project";
        break;

      case "mm":
          icoMain = "material";
          icoOverview = "material";
          txtOverview = "Materials";
          txtDelete = "Material";
        break;

      default:
          icoMain = "template";
          icoOverview = "template";
          txtOverview = "Templates";
          txtDelete = "Template";
        break;
    }

    return (
      <>
        <Card border="dark">
          <Card.Img className="cardImage" src={this.props.imgUrl} alt="Image" />
          <Card.ImgOverlay>
            <Card.Title className="ico-row" style={{justifyContent: "space-between"}}>
              <div className="f-item"><IconSvg ico={icoMain} cls="svg-btn svg-sw-10 svg-cw25"/></div>
              <div>
                { hasOverviewBoard && (
                    <OverlayTrigger overlay={this.showTooltip(['Show',`${txtOverview}`])}>
                      <div className="f-item acb-a-svg" onClick={this.handleThisOverview}><IconSvg ico={icoOverview} cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasDetails && (
                    <OverlayTrigger overlay={this.showTooltip(['Show','Details'])}>
                      <div className="f-item acb-a-svg" onClick={this.handleThisDetails}><IconSvg ico="doc" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasDelete && (
                    <OverlayTrigger overlay={this.showTooltip(['Delete',`${txtDelete}`])}>
                      <div className="f-item acb-a-svg" onClick={this.handleThisDelete}><IconSvg ico="delete" cls="svg-crd svg-sw10 svg-cw50-h"/></div>
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
        <ImageDisp show={this.state.showImage} img={this.props.imgUrl} title={this.props.title} close={this.hideImageDisp} />
      </>
    )
  }
}
