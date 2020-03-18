import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Form, Button, Row, Col } from "react-bootstrap";
import MessageBox from "./MessageBox";
import SiteHeader from "./SiteHeader";
import Loading from "./Loading";
import ObjectCard from "./ObjectCard";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showDeleteAction: false,
        showSaveAction: false,
        project: {
          name: '',
          description: '',
          notes: '',
          status: 'New',
          imageUrl: '',
          imagePublicID: '',
          materials: [],
          owner: this.props.user._id
        },
        newProject: true,
        editMode: false,
        createMode: false,
        loadProject: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectModifyComponents = () => {
    if( this.state.newProject === true ) {
      this.setState( { showSaveAction: true } );
    } else {
      this.props.history.push(`/materialboard/${this.state.project._id}`);
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectMoodboard = () => {
    this.props.history.push(`/moodboard/${this.state.project._id}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDeleteConfirmation = () => {
    this.setState({ 
        showDeleteAction: true,
        loadProject: false
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDeleteConfirmationState = (confirmDeleteState) => {
    if (confirmDeleteState === true) {
      this.handleProjectDelete( this.state.project._id );
    }
    this.setState({
        showDeleteAction: false,
        loadProject: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectSaveConfirmationState = (confirmActionState) => {
    let prjState = this.state.newProject;
    
    if (confirmActionState === true) {
      this.handleProjectCreate( false );
      prjState = false;
    }
    this.setState({
        newProject: prjState,
        showSaveAction: false,
        loadProject: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeInput = (event) => {
    const { name, value } = event.target;
    let tmpProject = cloneObject( this.state.project );

    tmpProject[name] = value;

    this.setState({
        project: tmpProject,
        loadProject: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectSubmit = (event) => {
    if (event) { event.preventDefault(); }
    if( this.state.createMode && this.state.editMode ) {
      this.handleProjectCreate( true );
    } else {
      if( this.state.editMode ) {
        this.handleProjectUpdate(this.state.project._id);
      }
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectCreate = ( routeProjectBoard ) => {
    axios
      .post("/api/projects/create", {
          info: "Create Project",
          data: this.state.project
      })
      .then(response => {
        if( routeProjectBoard === true ){ this.props.history.push("/projectboard"); }
        this.props.history.push(`/materialboard/${response.data._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectUpdate = (idx) => {
    axios
      .put(`/api/projects/${idx}`, {
          info: "Update Project",
          data: this.state.project  
      })
      .then(response => {
        if( this.state.newProject !== true ){ this.props.history.push("/projectboard"); }
      })
      .catch(err => {
        console.log(err);
      });  
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDelete = (idx) =>{
    axios
      .delete(`/api/projects/${idx}`)
      .then(() => {
        this.props.history.push("/projectboard");
      })
      .catch(err => {
        console.log(err);
      })
  };

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
            editMode: true,
            loadProject: false,
            newProject: false
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
    const projectId = this.props.match.params.id;
    if( projectId ) {
      this.handleProjectGetOne(projectId);
    } else { 
      this.setState({
          editMode: true,
          createMode: true,
          loadProject: false
        })
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let pageTitle = '';
    let btnList = [];

    if( this.state.editMode === true ) pageTitle = 'Project Update';
    if( this.state.createMode === true ) pageTitle = 'Project Create';
    
    let confirmActionInfo = { showAction: false };
    let btnEnable = false;
    if( this.state.project.name.length > 0 ) {
      btnEnable = true;
      if( this.state.showDeleteAction && (this.state.project.name.length > 0) ) {
        //console.log( "PJD", this.state.showDeleteAction );
        confirmActionInfo = { showAction: true,
                              fktConfirm: this.handleProjectDeleteConfirmationState,
                              title: 'Delete Project',
                              message: `Do you want to delete project \n'${this.state.project.name}'`,
                              icon: 'question',
                              btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                                     { btnText: 'Delete', iconName: 'delete', retVal: true, btnColor: 'red' }
                                   ]
                            };
      }
      if( this.state.showSaveAction ) {
        //console.log( "PJS", this.state.showDeleteAction );
        confirmActionInfo = { showAction: true,
                              fktConfirm: this.handleProjectSaveConfirmationState,
                              title: 'Save Project',
                              message: `Do you want to save project \n'${this.state.project.name}'`,
                              icon: 'question',
                              btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                                     { btnText: 'Save', iconName: 'save', retVal: true, btnColor: 'blue' }
                                   ]
                            };
      }
    }


    btnList.push( <Button key={'project_detail_btn_00'} className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/projectboard") }}><IconSvg ico="project" cls="svg-btn svg-cw90 svg-mr"/>Overview</Button> );
    if( this.state.createMode === true || this.state.editMode === true ) {
      let btnText = 'Update';
      if( this.state.createMode === true ) btnText = 'Save';
      btnList.push( <Button key={'project_detail_btn_01'} className="mr-2 mb-1" disabled={!btnEnable} variant="blue" type="submit"><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>{btnText}</Button> );
    }
    btnList.push( <Button key={'project_detail_btn_02'} className="mr-2 mb-1" disabled={!btnEnable} variant="green" onClick={this.handleProjectModifyComponents}><IconSvg ico="pin" cls="svg-btn svg-cw90 svg-mr"/>Assign Material</Button> );
    if( this.state.createMode === false && this.state.editMode === true ) {
      btnList.push( <Button key={'project_detail_btn_03'} className="mr-2 mb-1" variant="red" onClick={this.handleProjectDeleteConfirmation}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button> );
    }

    //console.log( "[PD] REN img:", this.state.project.imageUrl );

    if( this.state.loadProject === true ) {
      return ( <Loading /> )
    } else {
      let materialCards = [];
      this.state.project.materials.forEach( (material, index) => {
          //let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
          materialCards.push( 
              <ObjectCard key={`project_m_card_${material._id}`} 
                          idx={material._id}
                          typ={"mb"}
                          title={material.name}
                          imgUrl = {material.imageUrl}
                          dispDetail = {material}
                          info='Assigned Material'
                          {...this.props}
              />
            )
        });

      //console.log( "===========================================================================" );
      return (
        <>
          <SiteHeader ico="project" title={pageTitle} />
          <Form onSubmit={this.handleProjectSubmit}>
            <Form.Row className="frm-alpha-w10">
              <Form.Group as={Col} sm="6" md="4" lg="2">
                <div className="card-single">
                  <ObjectCard key={`project_card_${this.state.project._id}`} 
                              idx={this.state.project._id} 
                              typ={"pb"}
                              title={this.state.project.name}
                              imgUrl = {this.state.project.imageUrl}
                              handleObjectOverview={this.handleProjectMoodboard}
                              {...this.props}/>
                </div>
              </Form.Group>
              <Form.Group as={Col} sm="12" md="8" lg="4">
                <Form.Label>Project Name: </Form.Label>
                <Form.Control
                  as="input"
                  type="text"
                  name="name"
                  value={this.state.project.name || ''}
                  onChange={this.handleChangeInput}
                  autoFocus={true}
                />
                <Form.Label>Image Url:</Form.Label>
                <Form.Control 
                  as="input"
                  type="text"
                  name="imageUrl"
                  value={this.state.project.imageUrl || ''}
                  onChange={this.handleChangeInput}
                />
                { this.props.user.role==='admin' && (
                    <Row style={{marginTop: "15px"}}>
                      <Col sm="3">
                        <Form.Label>Owner:</Form.Label>
                      </Col>
                      <Col sm="9">
                        <Form.Control
                          as="input"
                          type="text"
                          name="owner"
                          readOnly
                          value={this.state.project.owner.username || ''}
                        />
                      </Col>
                    </Row>
                  )
                }
              </Form.Group>
              <Form.Group as={Col} sm="12" md="6" lg="3">
                <Form.Label>Description: </Form.Label>
                <Form.Control style={{ minHeight: "160px" }}
                  rows="6"
                  as="textarea"
                  name="description"
                  value={this.state.project.description || ''}
                  onChange={this.handleChangeInput}
                />
              </Form.Group>
              <Form.Group as={Col} sm="12" md="6" lg="3">
                <Form.Label>Notes: </Form.Label>
                <Form.Control style={{ minHeight: "160px" }}
                  rows="6"
                  as="textarea"
                  name="notes"
                  value={this.state.project.notes || ''}
                  onChange={this.handleChangeInput}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="frm-alpha-w10">
              <Form.Group as={Col} sm="12" md="6" lg="3">
                <Row>
                  <Col sm="3">
                    <Form.Label>Status:</Form.Label>
                  </Col>
                  <Col sm="9">
                    <Form.Control
                        as="select"
                        name="status"
                        id="status"
                        default={this.state.project.status || 'New'}
                        onChange={this.handleChangeInput}
                      >
                      <option value="New">New</option>
                      <option value="Completed">Completed</option>
                      <option value="Planned">Planned</option>
                    </Form.Control>              
                  </Col>
                </Row>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm="12">
                {btnList}
              </Form.Group>
            </Form.Row>
          </Form>
          <CardColumns>
            {materialCards}
          </CardColumns>
          <MessageBox option={confirmActionInfo} />  
        </>
      )
    }
  }
}
