import React, { Component } from 'react'
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
import ConfirmDelete from "./ConfirmDelete";
import ObjectCard from "./ObjectCard";
import IconSvg from "./Icons/IconSvg";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showConfirm: false,
        project: {
          name: '',
          description: '',
          notes: '',
          status: '',
          imageUrl: '',
          owner: this.props.user._id
        },
        editMode: false
    }
  }

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
      //this.handleProjectDelete( this.state.projectDeleteIdx );
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
  handleSubmitx = event => {};

  handleSubmit = event => {
    if (event) { event.preventDefault(); }

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
    // set a flag that the project got submitted
    this.setState({
      submitted: true
    })
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectGetOne = (idx) => {
    axios
      .get(`/api/projects/${idx}`)
      .then(response => {
        this.setState({
          project: response.data
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
    this.handleProjectGetOne(projectId);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let projectImage = this.state.project.imageUrl ? ( this.state.project.imageUrl === "" ? "/project.png" : this.state.project.imageUrl ) : ( "/project.png" );
    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col} sm="12">
              <h2>Project Detail</h2>
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
                onChange={this.handleChange}
              />
              <Form.Label>Image Url:</Form.Label>
              <Form.Control 
                as="input"
                type="text"
                name="imageUrl"
                value={this.state.project.imageUrl || ''}
                onChange={this.handleChange}
              />
              <Form.Label>Status:</Form.Label>
              <Form.Control
                  as="select"
                  name="status"
                  id="status"
                  default={this.state.project.status || 'New'}
                  onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12" md="6" lg="3">
              <Form.Label>Notes: </Form.Label>
              <Form.Control style={{ minHeight: "140px" }}
                rows="7"
                as="textarea"
                name="notes"
                value={this.state.project.notes || ''}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm="12">
              <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/projectboard") }}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
              <Button className="mr-2 mb-1" variant="blue" onClick={this.handleSave}><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Save</Button>
              <Button className="mr-2 mb-1" variant="red" onClick={this.showConfirmDelete}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>
              <Button className="mr-2 mb-1" variant="green" onClick={this.modifyComponents}><IconSvg ico="plus" cls="svg-btn svg-cw90 svg-mr"/>Assign/Remove Component</Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <ConfirmDelete show={this.state.showConfirm} close={this.handleProjectDeleteConfirmationState} title={"delProject"} />
      </>
    )
  }
}
