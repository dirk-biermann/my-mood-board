import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class ProjectBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  handleObjectExpandCB = (idx) =>{
    console.log( "EXP:", idx );
  }

  handleObjectSettingsCB = (idx) =>{
    console.log( "SET:", idx );
  }

  render() {
    let objList = [];
    for( let i=0; i<30; i++ ){
      objList.push( <ObjectCard key={`object_card_${i}`} 
                                idx={i} 
                                handleObjectExpand={this.handleObjectExpandCB}
                                handleObjectSettings={this.handleObjectSettingsCB}
                                {...this.props}/> )
    }
    
    return (
      <CardColumns>
        { objList }
      </CardColumns>
    )
  }
}
