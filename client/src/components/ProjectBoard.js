import React, { Component } from 'react'
import axios from "axios";
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import MessageBox from "./MessageBox";
import SiteHeader from "./SiteHeader";

export default class ProjectBoard extends Component {
  constructor(){
    super();
    this.state = {
      showDeleteAction: false,
      projects: []
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectMoodboard = (idx) =>{
    if( this.props.prv ) {
      this.props.history.push(`/userlist/mb/${idx}`);
    } else {
      this.props.history.push(`/moodboard/${idx}`);     
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDetails = (idx) =>{
    this.props.history.push(`/projectdetail/${idx}`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectCreate = (idx) =>{
    this.props.history.push(`/projectcreate`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDeleteConfirmation = (idx) => {
    this.setState({ 
        projectDeleteIdx: idx,
        showDeleteAction: true
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
        showDeleteAction: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDelete = (idx) =>{
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
  handleProjectGetAll = async () => {
    console.log( "PB-PRV", this.props.prv );
    const route = this.props.prv ? `/api/projects/usr/${this.props.match.params.id}` : '/api/projects';

    let [projectData] = await Promise.all([
        axios.get(route)
    ]);
  
    this.setState({
        projects: projectData.data
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.handleProjectGetAll()
        .catch(err => { 
          this.props.history.push(`/`);
        });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {       
    let pageTitle = "";
    if( this.props.prv ) {
      if( this.state.projects[0] ) {
        pageTitle = `Projects of user: '${this.state.projects[0].owner.username}'`;
      }
    }

    let delProjectName = "";
    let confirmActionInfo = { showAction: false };

    if( this.state.projectDeleteIdx ){
      delProjectName = this.state.projects.find( (project)=>{ return project._id === this.state.projectDeleteIdx; }).name;
    }

    if( this.state.showDeleteAction ){
      confirmActionInfo = { showAction: true,
                          fktConfirm: this.handleProjectDeleteConfirmationState,
                          info: { title: 'Delete Project',
                                  message: `Do you want to delete project\n'${delProjectName}'`,
                                  icon: 'question',
                                  btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                                        { btnText: 'Delete', iconName: 'delete', retVal: true, btnColor: 'red' }
                                      ]
                                }
                        };
    }

    return (
      <>
        { this.props.prv && ( <SiteHeader ico="project" title={pageTitle} /> ) }
        <CardColumns>
          { this.state.projects.map( (project, index) => {
              //let projectImage = project.imageUrl === "" ? "/project.png" : project.imageUrl;
              if( this.props.prv ) {
                return <ObjectCard key={`project_card_${project._id}`} 
                                  idx={project._id} 
                                  typ={"pb"}
                                  title={project.name}
                                  imgUrl = {project.imageUrl}
                                  handleObjectOverview={this.handleProjectMoodboard}
                                  dispDetail = {project}
                                  {...this.props}/>
              } else {
                return <ObjectCard key={`project_card_${project._id}`} 
                                  idx={project._id} 
                                  typ={"pb"}
                                  title={project.name}
                                  imgUrl = {project.imageUrl}
                                  handleObjectOverview={this.handleProjectMoodboard}
                                  handleObjectDetails={this.handleProjectDetails}
                                  handleObjectDelete={this.handleProjectDeleteConfirmation}
                                  {...this.props}/>
              }
            }) 
          }
          { !this.props.prv && (
            <ObjectCard key={`project_card_0`} 
                        idx={'0'} 
                        typ={"pb"}
                        title={'New Project'}
                        imgUrl = {'/newobject.png'}
                        handleObjectCreate={this.handleProjectCreate}
                        info='New Project'
                        {...this.props}/>

            )
          }
        </CardColumns>
        <MessageBox show={confirmActionInfo.showAction} close={confirmActionInfo.fktConfirm} info={confirmActionInfo.info} />  
      </>
    )
  }
}
