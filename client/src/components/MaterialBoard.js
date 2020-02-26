import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class MaterialBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDetails = (idx) =>{
    console.log( "D-MAT:", idx );
    this.props.history.push(`/materialdetail/${idx}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let objList = [];
    for( let i=0; i<30; i++ ){
      objList.push( <ObjectCard key={`material_card_${i}`} 
                                idx={i} 
                                typ={"mm"}
                                title={`Title M${i}`}
                                imgUrl = {"./material.png"}
                                handleObjectDetails={this.handleMaterialDetails}
                                {...this.props}/> )
    }

    return (
      <CardColumns>
        { objList }
      </CardColumns>
    )
  }
}
