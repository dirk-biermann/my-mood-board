import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Button } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import SiteHeader from "./SiteHeader";
import Loading from "./Loading";
import IconSvg from "./Icons/IconSvg";

export default class MoodBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      project: {},
      loadProject: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMoodBoardOverview = (idx,typ) =>{
    if( typ === "pm" ) { this.props.history.push(`/projectboard`); } 
    if( typ === "mb" ) { this.props.history.push(`/materialboard`); } 
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMoodBoardDetails = (idx,typ) =>{
    if( typ === "pm" ) { this.props.history.push(`/projectdetail/${idx}`); }
    if( typ === "mb" ) { this.props.history.push(`/materialdetail/${idx}`); }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectGetOne = (idx) => {
    //console.log( "[PD] handleProjectGetOne", idx)
    axios
      .get(`/api/projects/pop/${idx}`)
      .then(response => {
        this.setState({
            project: response.data,
            loadProject: false
          });
      })
      .catch(err => {
        //console.log(err);
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    const projectId = this.props.match.params.id;
    if( projectId ) {
      this.handleProjectGetOne(projectId);
    } else { 
      this.setState({
          //editMode: true,
          //createMode: true,
          loadProject: false
        })
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let objList = [];
    if( this.state.project.materials ) {
      objList = this.state.project.materials.map( (material) => {
                //let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
                return <ObjectCard key={`material_card_${material._id}`} 
                                    idx={material._id} 
                                    typ={"mm"}
                                    title={material.name}
                                    imgUrl = {material.imageUrl}
                                    dispDetail = {material}
                                    {...this.props}
                        />
              }); 
    }

    if( this.state.loadProject === true ) { return ( <Loading variant="warning"/> ) }

    let pageTitle = "";
    if( this.props.prv ) {
      if( this.state.project ) {
        pageTitle = `MoodBoard '${this.state.project.name}' [${this.state.project.owner.username}]`;
      }
    }

    return (
      <>
        { this.props.prv && ( <SiteHeader ico="moodboard" title={pageTitle} /> ) }
        <CardColumns className="frm-mb-12">
          { this.props.prv ? (
              <ObjectCard key={`project_card_${this.state.project._id}`} 
                          idx={this.state.project._id} 
                          typ={"pm"}
                          title={this.state.project.name}
                          imgUrl = {this.state.project.imageUrl}
                          dispDetail = {this.state.project}
                          {...this.props}
              />
            ):(
              <ObjectCard key={`project_card_${this.state.project._id}`} 
                          idx={this.state.project._id} 
                          typ={"pm"}
                          title={this.state.project.name}
                          imgUrl = {this.state.project.imageUrl}
                          handleObjectOverview={this.handleMoodBoardOverview}
                          dispDetail = {this.state.project}
                          {...this.props}
              />
            )          
          }
          { objList }
        </CardColumns>
        { this.props.prv && (
            <>
              <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push(`/userboard/prj/${this.state.project.owner._id}`) }}><IconSvg ico="project" cls="svg-btn svg-cw90 svg-mr"/>Overview</Button>
              <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/userboard") }}><IconSvg ico="follower" cls="svg-btn svg-cw90 svg-mr"/>User List</Button>
            </>
          )
        }
      </>
    )
  }
}
//                      handleObjectDetails={this.handleMoodBoardDetails}
