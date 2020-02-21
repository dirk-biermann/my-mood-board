import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class MoodBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  handleMoodBoardDetails = (idx,typ) =>{
    console.log( "D-MB:", idx );
    if( typ === "p" ) {
      this.props.history.push(`/projectdetail/${idx}`);
    } else {
      this.props.history.push(`/materialdetail/${idx}`);
    }
  }

  render() {
    let objList = [];
    for( let i=0; i<10; i++ ){
      objList.push( <ObjectCard key={`moodboard_card_${i}`} 
                                idx={i} 
                                typ={ i===0 ? "p" : "m"}
                                imgUrl={ i===0 ? "../project.png" : "../material.png"}
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
