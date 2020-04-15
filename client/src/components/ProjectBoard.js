import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Button } from "react-bootstrap";
import ObjectCard from "./Formats/ObjectCard";
import MessageBox from "./Modals/MessageBox";
import SiteHeader from "./Formats/SiteHeader";
import IconSvg from "./Icons/IconSvg";
import Loading from "./Formats/Loading";
import CustomButtonRow from "./Formats/CustomButtonRow";

export default class ProjectBoard extends Component {
  constructor(){
    super();
    this.state = {
      showDeleteAction: false,
      projects: [],
      loadProject: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectMoodboard = (idx) =>{
    if( this.props.prv ) {
      this.props.history.push(`/userboard/mb/${idx}`);
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
        this.setState({
            loadProject: true
          });

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
    const route = this.props.prv ? `/api/projects/usr/${this.props.match.params.id}` : '/api/projects';

    let [projectData] = await Promise.all([
        axios.get(route)
    ]);
  
    this.setState({
        projects: projectData.data,
        loadProject: false
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
    if( this.state.loadProject === true ) { return ( <Loading variant="warning"/> ) }

    if( this.props.prv ) {
      if( this.state.projects[0] ) {
        pageTitle = `Projects of user: '${this.state.projects[0].owner!==null?this.state.projects[0].owner.username:'<unknown>'}'`;
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
                          title: 'Delete Project',
                          message: `Do you want to delete project\n'${delProjectName}'`,
                          icon: 'question',
                          iconColor: "blue",
                          iconCW: true,
                          btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                                 { btnText: 'Delete', iconName: 'delete', retVal: true, btnColor: 'red' }
                               ]
                          };
    }

    const projectsCards = this.state.projects.map( (project, index) => {
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
                                   dispDetail = {project}
                                   {...this.props}
                       />
              }
          }); 
    if( ( !this.props.prv ) && ( this.props.user.role === 'user') ) {
      projectsCards.push(
          <ObjectCard key={`project_card_0`} 
                      idx={'0'} 
                      typ={"pb"}
                      title={'New Project'}
                      imgUrl = {'/newobject.png'}
                      handleObjectCreate={this.handleProjectCreate}
                      {...this.props}
          />
        );
    }

    if( projectsCards.length === 0 ) {
      projectsCards.push( 
          <ObjectCard key={`project_card_0`} 
                      typ={"pb"}
                      title={'No Project'}
                      imgUrl = {'/noobject.png'}
                      {...this.props}
          />
        );
    }
    
    const btnList = [<Button key="pb-0" className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/userboard") }}><IconSvg ico="follower" cls="svg-btn svg-cw90 svg-mr"/>User List</Button> ];

    return (
      <>
        { this.props.prv && ( <SiteHeader ico="project" title={pageTitle} /> ) }
        <CardColumns className="frm-mb-12">
          { projectsCards }
        </CardColumns>
        {(this.props.prv) && ( <CustomButtonRow btnList={btnList}/> ) }
        <MessageBox option={confirmActionInfo} />  
      </>
    )
  }
}
