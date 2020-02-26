import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class TemplateBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleTemplateDetails = (idx) =>{
    console.log( "D-PRJ:", idx );
    this.props.history.push(`/templatedetail/${idx}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let objList = [];
    for( let i=0; i<14; i++ ){
      objList.push( <ObjectCard key={`template_card_${i}`} 
                                idx={i} 
                                typ={"tm"}
                                title={`Title T${i}`}
                                imgUrl = {"./template.png"}
                                handleObjectDetails={this.handleTemplateDetails}
                                {...this.props}/> )
    }
    
    return (
      <CardColumns>
        { objList }
      </CardColumns>
    )
  }
}
