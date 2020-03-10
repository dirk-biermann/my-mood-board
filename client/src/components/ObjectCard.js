import React, { Component } from 'react'
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";
import ImageDisp from "./ImageDisp";
import DetailDisp from "./DetailDisp";

export default class ObjectCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      showImage: false,
      showDetail: false,
      infoText: props.info,
      infoTextSik: props.info,
      dispImage: props.imgUrl,
      errLoadImg: false  
    };
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  showImageDisp = () => {
    this.setState({ showImage: true });
  };

  showDetailDisp = () => {
    this.setState({ showDetail: true });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  hideImageDisp = () => {
    this.setState({ showImage: false });
  };

  hideDetailDisp = () => {
    this.setState({ showDetail: false });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleThisAssign = () => {
    let assignState = true;
    if( this.props.assignCheck === true ) assignState = false; 
    this.props.handleObjectAssign(this.props.idx, assignState);
  }

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
  handleThisCreate = () => {
    if( this.props.handleObjectCreate ){
      this.props.handleObjectCreate(this.props.idx, this.props.typ);
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  showTooltip = (info) => {
    return ( <Tooltip className="shw-acb" id={'tooltip-top'}>{info[0]} <strong>{info[1]}</strong></Tooltip> );
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  onErrorImage = (event) => {
    //console.log( `[4] OC-onErrorImage [`, this.props.idx, '] img:', this.props.imgUrl );
    event.target.src = '/errobject.png';
    this.setState({ errLoadImg: true });
  }

  onLoadImage = (event) => {
    //console.log( `[4] OC-onLoadImage [`, this.props.idx, '] img:', this.props.imgUrl );
    this.setState({ 
        infoText: this.state.errLoadImg ? "Can't load Image" : this.state.infoTextSik,
        dispImage: this.state.errLoadImg ? "/errobject.png" : this.props.imgUrl,
        errLoadImg: false
      });
  }

  // -----------------------------------------
  // LIFE CYCLE
  // -----------------------------------------
  componentDidMount() {
    //console.log( "[2] OC-componentDidMount" );
  }
  
  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let hasOverviewBoard = this.props.handleObjectOverview ? true : false;
    let hasDetails = this.props.handleObjectDetails ? true : false;
    let hasDelete = this.props.handleObjectDelete ? true : false;
    let hasCreate = this.props.handleObjectCreate ? true : false;
    let hasAssign = this.props.handleObjectAssign ? true : false;
    let hasInfo = this.state.infoText ? true : false;
    let hasDisp = this.props.dispDetail ? true : false;
    if( this.props.user.role === "admin" ) {
      hasDelete = false;
      hasCreate = false;
      hasDetails = false;
    }

    let icoMain;
    let icoOverview;
    let txtOverview;
    let txtDelete;
    let imgFilename;
    let imgDispname;
    let imgInfo;

    //console.log( "[1] OC-render [", this.props.idx, ']' );    
    //console.log( "[1.1] Image [", this.props.idx, ']', this.props.imgUrl );    
    //console.log( "[1.2] infoText", this.state.infoText );

    switch (this.props.typ) {
      case "pb":
          icoMain = "project";
          icoOverview = "moodboard";
          txtOverview = "Moodboard";
          txtDelete = "Project";
          imgFilename = "/project.png";
        break;

      case "pm":
          icoMain = "moodboard";
          icoOverview = "project";
          txtOverview = "Projects";
          txtDelete = "Project";
          imgFilename = "/project.png";
        break;

      case "mb":
          icoMain = "material";
          icoOverview = "material";
          txtOverview = "Materials";
          txtDelete = "Material";
          imgFilename = "/material.png";
        break;

      case "mm":
          icoMain = "moodboard";
          icoOverview = "material";
          txtOverview = "Materials";
          txtDelete = "Material";
          imgFilename = "/material.png";
        break;

      default:
          icoMain = "template";
          icoOverview = "template";
          txtOverview = "Templates";
          txtDelete = "Template";
          imgFilename = "/template.png";
        break;
    }

    // -----------------------
    // check imageUrl
    // -----------------------
    imgInfo = this.state.infoText;
    if( this.props.imgUrl !== "" ) {
      imgFilename = this.props.imgUrl;
      imgDispname = this.state.dispImage;
      //console.log( "REG-IMG:", imgInfo, imgFilename, `[${this.props.imgUrl}]` );
    } else {
      imgDispname = imgFilename;  
      imgInfo = "Default Image";
      hasInfo = true;
      //console.log( "DEFIMG:", imgInfo, imgFilename, `[${this.props.imgUrl}]` );
    }
    // -----------------------

    let assignState = ( <></> ); 
    if( hasAssign ) {
      if( this.props.assignCheck === true ) {
        assignState = <IconSvg ico="checked" cls="svg-nav svg-sw10 svg-cw50-h svg-ml"/>
      } else {
        assignState = <IconSvg ico="unchecked" cls="svg-nav svg-sw10 svg-cw50-h svg-ml"/>
      }
    }

    return (
      <>
        <Card border="dark">
          <Card.Img onError={this.onErrorImage} onLoad={this.onLoadImage} className="cardImage" src={imgFilename} alt="Image"/>
          <Card.ImgOverlay>
            <Card.Title className="ico-row" style={{justifyContent: "space-between"}}>
              <div className="f-item"><IconSvg ico={icoMain} cls="svg-crd svg-sw-10 svg-cw25 svg-mr"/></div>
              <div>
                { hasOverviewBoard && (
                    <OverlayTrigger overlay={this.showTooltip(['Show',`${txtOverview}`])}>
                      <div className="f-item mmb-a-svg" onClick={this.handleThisOverview}><IconSvg ico={icoOverview} cls="svg-crd svg-sw10 svg-cw50-h svg-ml"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasDetails && (
                    <OverlayTrigger overlay={this.showTooltip(['Edit','Details'])}>
                      <div className="f-item mmb-a-svg" onClick={this.handleThisDetails}><IconSvg ico="edit" cls="svg-crd svg-sw10 svg-cw50-h svg-ml"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasDisp && (
                    <OverlayTrigger overlay={this.showTooltip(['Show','Details'])}>
                      <div className="f-item mmb-a-svg" onClick={this.showDetailDisp}><IconSvg ico="doc" cls="svg-crd svg-sw10 svg-cw50-h svg-ml"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasDelete && (
                    <OverlayTrigger overlay={this.showTooltip(['Delete',`${txtDelete}`])}>
                      <div className="f-item mmb-a-svg" onClick={this.handleThisDelete}><IconSvg ico="delete" cls="svg-crd svg-sw10 svg-cw50-h svg-ml"/></div>
                    </OverlayTrigger>
                  )
                }
                { hasAssign && false && (
                    <OverlayTrigger overlay={this.showTooltip(['Assign','Material'])}>
                      <div className="f-item mmb-a-svg" onClick={this.handleThisAssign}>
                        <span>Assign</span>
                        {assignState}
                      </div>
                    </OverlayTrigger>
                  )
                }
                { hasCreate && (
                    <OverlayTrigger overlay={this.showTooltip(['Create',`${txtDelete}`])}>
                      <div className="f-item mmb-a-svg" onClick={this.handleThisCreate}><IconSvg ico="new" cls="svg-crd svg-sw10 svg-cw50-h svg-ml"/></div>
                    </OverlayTrigger>
                  )
                }
                { !hasCreate && (
                    <OverlayTrigger overlay={this.showTooltip(['Expand','Image'])}>
                      <div className="f-item mmb-a-svg" onClick={this.showImageDisp}><IconSvg ico="expand" cls="svg-crd svg-sw10 svg-cw50-h svg-ml"/></div>
                    </OverlayTrigger>
                  )
                }
              </div>
            </Card.Title>
            { ( hasInfo || hasAssign ) && (
              <Card.Footer style={{textAlign: "right"}}>
                <>
                  { hasInfo && ( <span style={{textShadow: "2px 2px 5px black"}}>{imgInfo}</span> ) }
                  { hasAssign && (
                    <div className="f-item mmb-a-svg" onClick={this.handleThisAssign}>
                      <span style={{textShadow: "2px 2px 2px black"}}>Assigned</span>
                      {assignState}
                    </div>
                  )}
                </>
              </Card.Footer>
            )}
          </Card.ImgOverlay>
        </Card>
        { this.state.showDetail && ( <DetailDisp show={this.state.showDetail} dispInfo={this.props.dispDetail} close={this.hideDetailDisp} /> ) }
        { this.state.showImage && ( <ImageDisp show={this.state.showImage} img={imgDispname} title={this.props.title} close={this.hideImageDisp} /> ) }
      </>
    )
  }
}
