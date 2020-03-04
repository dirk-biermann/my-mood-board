import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import ConfirmDelete from "./ConfirmDelete";
import SiteHeader from "./SiteHeader";
import ObjectCard from "./ObjectCard";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showConfirm: false,
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
        editMode: false,
        createMode: false,
        loadProject: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectModifyComponents = () => {
    this.props.history.push(`/materialboard/${this.state.project._id}`);
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
        showConfirm: true,
        loadProject: false
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDeleteConfirmationState = (confirmDeleteState) => {
    if (confirmDeleteState === true) {
      this.handleProjectDeletet( this.state.project._id );
    }
    this.setState({
        showConfirm: false,
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
      this.handleProjectCreate();
    } else {
      if( this.state.editMode ) {
        this.handleProjectUpdate(this.state.project._id);
      }
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectCreate = () => {
    axios
      .post("/api/projects/create", {
          info: "Create Project",
          data: this.state.project
      })
      .then(response => {
        this.props.history.push("/projectboard");
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
        this.props.history.push("/projectboard")
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
            loadProject: false
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
    //console.log( "[PD] componentDidMount", projectId)
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

    if( this.state.createMode === true || this.state.editMode === true ) {
      let btnText = 'Update';
      if( this.state.createMode === true ) btnText = 'Save';

      btnList.push( <Button key={'project_detail_btn_01'} className="mr-2 mb-1" variant="blue" type="submit"><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>{btnText}</Button> );
    }
    if( this.state.createMode === false && this.state.editMode === true ) {
      btnList.push( <Button key={'project_detail_btn_02'} className="mr-2 mb-1" variant="red" onClick={this.handleProjectDeleteConfirmation}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button> );
    }
    
    const delProject = [ 'Project', this.state.project.name ];
    //console.log( "[PD] REN img:", this.state.project.imageUrl );

    if( this.state.loadProject === true ) {
      //console.log( "[PD] Alert" );
      //console.log( "===========================================================================" );
      return (
        <Container>
          <Row className="justify-content-md-center" style={{textAlign:"center"}}>
            <Col xs={12} md={8} lg={4}>
              <Alert variant={'warning'}>
                <h2>Loading ...</h2>
              </Alert>
            </Col>
          </Row>
        </Container>        
      )
    } else {
      let materialCards = [];
      this.state.project.materials.forEach( (material, index) => {
          let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
          materialCards.push( 
              <ObjectCard key={`project_m_card_${material._id}`} 
                          idx={material._id}
                          typ={"mb"}
                          title={material.name}
                          imgUrl = {materialImage}
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
                <Form.Label>Status:</Form.Label>
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
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm="12">
                <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/projectboard") }}><IconSvg ico="project" cls="svg-btn svg-cw90 svg-mr"/>Overview</Button>
                {btnList}
                <Button className="mr-2 mb-1" variant="green" onClick={this.handleProjectModifyComponents}><IconSvg ico="change" cls="svg-btn svg-cw90 svg-mr"/>Assign/Remove Material</Button>
              </Form.Group>
            </Form.Row>
          </Form>
          <CardColumns>
            {materialCards}
          </CardColumns>  
          <ConfirmDelete show={this.state.showConfirm} close={this.handleProjectDeleteConfirmationState} info={delProject} />
        </>
      )
    }
  }
}
