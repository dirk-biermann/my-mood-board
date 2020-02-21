import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class ProjectBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  handleProjectMoodBoard = (idx) =>{
    console.log( "MB-PRJ:", idx );
    this.props.history.push(`/moodboard/${idx}`);
  }

  handleProjectDetails = (idx) =>{
    console.log( "D-PRJ:", idx );
    this.props.history.push(`/projectdetail/${idx}`);
  }

  render() {
    let objList = [];
    for( let i=0; i<30; i++ ){
      objList.push( <ObjectCard key={`object_card_${i}`} 
                                idx={i} 
                                typ={"p"}
                                imgUrl = {"./project.png"}
                                handleObjectMoodBoard={this.handleProjectMoodBoard}
                                handleObjectDetails={this.handleProjectDetails}
                                {...this.props}/> )
    }
    
    return (
      <CardColumns>
        { objList }
      </CardColumns>
    )
  }
}
