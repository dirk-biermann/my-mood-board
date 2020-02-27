import React, { Component } from 'react'
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
import ConfirmDelete from "./ConfirmDelete";
import ObjectCard from "./ObjectCard";
import IconSvg from "./Icons/IconSvg";
import { cloneObject, imageExists } from "../services/init";

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
          owner: this.props.user._id
        },
        editMode: false,
        createMode: false,
        isValidImage: true
    }
  }

  handleProjectDeleteConfirmation = () => {
    this.setState({ 
        showConfirm: true
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
        showConfirm: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeInput = (event) => {
    const { name, value } = event.target;

    if( name === "imageUrl" ) {
      imageExists( value, (exist) => {
        this.setState({
            isValidImage: exist
          });
        }
      );
    }
    console.log( "CHG", name, value );

    let tmpProject = cloneObject( this.state.project );
    tmpProject[name] = value;

    this.setState({
      project: tmpProject,
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
  handleSubmitProject = (event) => {
    if (event) { event.preventDefault(); }

    if( this.state.createMode && this.state.editMode ) {
      this.handleCreateNewProject();
    } else {
      if( this.state.editMode ) {
        this.handleUpdateProject();
      }
    }

  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleCreateNewProject = () => {
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
  handleUpdateProject = () => {
  
  /*
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
  */
  
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectGetOne = (idx) => {
    axios
      .get(`/api/projects/${idx}`)
      .then(response => {
        this.setState({
          project: response.data,
          editMode: true
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
          createMode: true
        })
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let projectImage = this.state.isValidImage ? ( this.state.project.imageUrl !== '' ? this.state.project.imageUrl : '/project.png' ) : '/project.png';
    let pageTitle = 'Project Detail';
    let btnList = [];

    if( this.state.editMode === true ) pageTitle = 'Project Update';
    if( this.state.createMode === true ) pageTitle = 'Project Create';

    if( this.state.createMode === true || this.state.editMode === true ) {
      btnList.push( <Button key={'project_detail_btn_01'} className="mr-2 mb-1" variant="blue" type="submit"><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Save</Button> );
    }
    if( this.state.createMode === false && this.state.editMode === true ) {
      btnList.push( <Button key={'project_detail_btn_02'} className="mr-2 mb-1" variant="red" onClick={this.handleProjectDeleteConfirmation}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button> );
    }
    
    const delProject = [ 'Project', this.state.project.name ];

    return (
      <>
        <Form onSubmit={this.handleSubmitProject}>
          <Form.Row>
            <Form.Group as={Col} sm="12">
              <h2>{pageTitle}</h2>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm="6" md="4" lg="2">
              <div className="card-single">
                <ObjectCard key={`project_card_${this.state.project._id}`} 
                            idx={this.state.project._id} 
                            typ={"pb"}
                            title={this.state.project.name}
                            imgUrl = {projectImage}
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
              />
              <Form.Label>Image Url:</Form.Label>
              <Form.Control 
                as="input"
                type="text"
                name="imageUrl"
                value={this.state.project.imageUrl || ''}
                onChange={this.handleChangeInput}
              />
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
            <Form.Group as={Col} sm="12" md="6" lg="3">
              <Form.Label>Description: </Form.Label>
              <Form.Control style={{ minHeight: "140px" }}
                rows="7"
                as="textarea"
                name="description"
                value={this.state.project.description || ''}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12" md="6" lg="3">
              <Form.Label>Notes: </Form.Label>
              <Form.Control style={{ minHeight: "140px" }}
                rows="7"
                as="textarea"
                name="notes"
                value={this.state.project.notes || ''}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm="12">
              <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/projectboard") }}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
              {btnList}
              <Button className="mr-2 mb-1" variant="green" onClick={this.modifyComponents}><IconSvg ico="plus" cls="svg-btn svg-cw90 svg-mr"/>Assign/Remove Component</Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <ConfirmDelete show={this.state.showConfirm} close={this.handleProjectDeleteConfirmationState} info={delProject} />
      </>
    )
  }
}
