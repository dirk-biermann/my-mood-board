import React, { Component } from 'react'
import axios from "axios";
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import ConfirmDelete from "./ConfirmDelete";

export default class ProjectBoard extends Component {
  constructor(){
    super();
    this.state = {
      showConfirm: false,
      projects: []
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectMoodboard = (idx) =>{
    console.log( "MB-PRJ:", idx );
    this.props.history.push(`/moodboard/${idx}`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDetails = (idx) =>{
    console.log( "D-PRJ:", idx );
    this.props.history.push(`/projectdetail/${idx}`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectCreate = (idx) =>{
    console.log( "C-PRJ:", idx );
    this.props.history.push(`/projectcreate`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDeleteConfirmation = (idx) => {
    this.setState({ 
        projectDeleteIdx: idx,
        showConfirm: true
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDeleteConfirmationState = (confirmDeleteState) => {
    if (confirmDeleteState === true) {
      this.handleProjectDelete( this.state.projectDeleteIdx );
    }
    this.setState({
        projectDeleteIdx: undefined, 
        showConfirm: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDelete = (idx) =>{
    console.log( "DEL-PRJ:", idx );
    axios
      .delete(`/api/projects/${idx}`)
      .then(() => {
        this.handleProjectGetAll();
      })
      .catch(err => {
        console.log(err);
      })
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectGetAll = () => {
    axios
      .get("/api/projects")
      .then(response => {
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.handleProjectGetAll();
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {   
    let delProject = '';
    if( this.state.projectDeleteIdx ){
      delProject = [ 'Project', this.state.projects.find( (project)=>{
                                    return project._id === this.state.projectDeleteIdx;
                                  }).name ];
    }
 
    return (
      <>
        <CardColumns>
          { this.state.projects.map( (project, index) => {
              let projectImage = project.imageUrl === "" ? "/project.png" : project.imageUrl;
              return <ObjectCard key={`project_card_${project._id}`} 
                                  idx={project._id} 
                                  typ={"pb"}
                                  title={project.name}
                                  imgUrl = {projectImage}
                                  handleObjectOverview={this.handleProjectMoodboard}
                                  handleObjectDetails={this.handleProjectDetails}
                                  handleObjectDelete={this.handleProjectDeleteConfirmation}
                                  {...this.props}/>
            }) 
          }
          <ObjectCard key={`project_card_0`} 
                      idx={'0'} 
                      typ={"pb"}
                      title={'New Project'}
                      imgUrl = {'/newobject.png'}
                      handleObjectCreate={this.handleProjectCreate}
                      info='Create new Project'
                      {...this.props}/>
        </CardColumns>
        <ConfirmDelete show={this.state.showConfirm} close={this.handleProjectDeleteConfirmationState} info={delProject} />
      </>
    )
  }
}
