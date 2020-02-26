import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class MoodBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMoodBoardOverview = (idx,typ) =>{
    console.log( "O-MB:", idx );
    if( typ === "pm" ) { this.props.history.push(`/projectboard`); } 
    if( typ === "mm" ) { this.props.history.push(`/materialboard`); } 
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMoodBoardDetails = (idx,typ) =>{
    console.log( "D-MB:", idx );
    if( typ === "pm" ) { this.props.history.push(`/projectdetail/${idx}`); }
    if( typ === "mm" ) { this.props.history.push(`/materialdetail/${idx}`); }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let objList = [];
    for( let i=0; i<10; i++ ){
      objList.push( <ObjectCard key={`moodboard_card_${i}`} 
                                idx={i} 
                                typ={ i===0 ? "pm" : "mm"}
                                title={ i===0 ? `Title P${i}` : `Title M${i}`}
                                imgUrl={ i===0 ? "../project.png" : "../material.png"}
                                handleObjectOverview={this.handleMoodBoardOverview}
                                handleObjectDetails={this.handleMoodBoardDetails}
                                {...this.props}/> )
    }
    
    return (
      <CardColumns>
        { objList }
      </CardColumns>
    )
  }
}
