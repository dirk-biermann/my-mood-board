import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Alert, Container, Row, Col } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

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
    console.log( "O-MB:", idx );
    if( typ === "pm" ) { this.props.history.push(`/projectboard`); } 
    if( typ === "mb" ) { this.props.history.push(`/materialboard`); } 
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMoodBoardDetails = (idx,typ) =>{
    console.log( "D-MB:", idx );
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
    console.log( "[MOB] componentDidMount", projectId)
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
                let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
                return <ObjectCard key={`material_card_${material._id}`} 
                                    idx={material._id} 
                                    typ={"mm"}
                                    title={material.name}
                                    imgUrl = {materialImage}
                                    {...this.props}/>
              }); 
    }

    if( this.state.loadProject === true ) {
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
      return (
        <CardColumns>
          <ObjectCard key={`project_card_${this.state.project._id}`} 
                      idx={this.state.project._id} 
                      typ={"pm"}
                      title={this.state.project.name}
                      imgUrl = {this.state.project.imageUrl}
                      handleObjectOverview={this.handleMoodBoardOverview}
                      handleObjectDetails={this.handleMoodBoardDetails}
                      {...this.props}s
          />
          { objList }
        </CardColumns>
      )
    }
  }
}
