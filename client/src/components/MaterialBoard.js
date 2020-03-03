import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Form, Col, Button } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import SiteHeader from "./SiteHeader";
import ConfirmDelete from "./ConfirmDelete";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";

export default class MaterialBoard extends Component {
  constructor(){
    super();
    this.state = {
      showConfirm: false,
      materials: [],
      assignStatus:[]
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleProjectDetails = () => {
    this.props.history.push(`/projectdetail/${this.state.idxPrj}`);
  };

  handleProjectUpdate = () => {
    // --- update material assignment
    let newMaterials = [];
    this.state.materials.forEach( (material, index) => {
        if( this.state.assignStatus[index] === true ) { newMaterials.push( material._id ); };
      })

    let tmpProject = cloneObject( this.state.project );
    tmpProject.materials = newMaterials;

    axios
      .put(`/api/projects/${tmpProject._id}`, {
          info: "Update Project Assign Material",
          data: tmpProject  
      })
      .then(response => {
        this.handleProjectDetails();
      })
      .catch(err => {
        console.log(err);
      });  

    this.handleProjectDetails();
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialAssign = (idx, assigned) => {
    let statusId = this.state.materials.findIndex( (material) => {
        return material._id.toString() === idx.toString();
      });    
    let tmpAssignStatus = this.state.assignStatus.slice();
    tmpAssignStatus[statusId] = assigned;
    this.setState({assignStatus: tmpAssignStatus });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDetails = (idx) =>{
    this.props.history.push(`/materialdetail/${idx}`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialCreate = (idx) =>{
    this.props.history.push(`/materialcreate`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDeleteConfirmation = (idx) => {
    this.setState({ 
        materialDeleteIdx: idx,
        showConfirm: true
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDeleteConfirmationState = (confirmDeleteState) => {
    if (confirmDeleteState === true) {
      this.handleMaterialDelete( this.state.materialDeleteIdx );
    }
    this.setState({
        materialDeleteIdx: undefined, 
        showConfirm: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDelete = (idx) =>{
    axios
      .delete(`/api/materials/${idx}`)
      .then(() => {
        this.handleMaterialGetAll();
      })
      .catch(err => {
        console.log(err);
      })
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialGetAll = async () => {
    const projectId = this.props.match.params.id;

    if( this.props.assignMode ) {
      let [projectData, materialData] = await Promise.all([
          axios.get(`/api/projects/${projectId}`),
          axios.get("/api/materials")
      ]);

      const curAssignStatus = [];
      materialData.data.forEach( (material, i) => {
          curAssignStatus[i] = projectData.data.materials.includes( (material._id).toString() );
      });

      this.setState({
        materials: materialData.data,
        project: projectData.data,
        assignStatus: curAssignStatus,
        idxPrj: projectId
      });
    } else {
      axios
        .get("/api/materials")
        .then(response => {
          this.setState({
            materials: response.data,
            idxPrj: projectId
          });
        })
        .catch(err => {
          console.log(err);
        });
      }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.handleMaterialGetAll();
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {   
    let delMaterial = '';
    if( this.state.materialDeleteIdx ){
      delMaterial = [ 'Material', this.state.materials.find( (material)=>{
                                    return material._id === this.state.materialDeleteIdx;
                                  }).name ];
    }
 
    const materialCards = this.state.materials.map( (material, index) => {
                          let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
                          if( this.props.assignMode === undefined ) {
                            return <ObjectCard key={`material_card_${material._id}`} 
                                                idx={material._id} 
                                                typ={"mb"}
                                                title={material.name}
                                                imgUrl = {materialImage}
                                                handleObjectDetails={this.handleMaterialDetails}
                                                handleObjectDelete={this.handleMaterialDeleteConfirmation}
                                                {...this.props}/>
                          } else {
                            return <ObjectCard key={`material_card_${material._id}`} 
                                                idx={material._id} 
                                                typ={"mb"}
                                                title={material.name}
                                                imgUrl = {materialImage}
                                                handleObjectAssign = {this.handleMaterialAssign}
                                                assignCheck = {this.state.assignStatus[index]} 
                                                {...this.props}/>                            
                          }
                        }); 

    if( this.props.assignMode === undefined ) {
      materialCards.push( 
          <ObjectCard key={`material_card_0`} 
                      idx={'0'} 
                      typ={"mb"}
                      title={'New Material'}
                      imgUrl = {'/newobject.png'}
                      handleObjectCreate={this.handleMaterialCreate}
                      info='New Material'
                      {...this.props}
          />
        )
    }
    return (
      <>   
        {this.props.assignMode && (
          <SiteHeader ico="checked" title={'Material Assign'} />
        )}     
        <CardColumns style={{marginBottom: "1rem"}}>
          { materialCards }
        </CardColumns>
        {this.props.assignMode && (
          <Form>
            <Form.Row>
              <Form.Group as={Col} sm="12">
                <Button className="mr-2 mb-1" variant="dark" onClick={this.handleProjectDetails}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
                <Button className="mr-2 mb-1" variant="blue" onClick={this.handleProjectUpdate}><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Save</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        )}     
        <ConfirmDelete show={this.state.showConfirm} close={this.handleMaterialDeleteConfirmationState} info={delMaterial} />
      </>
    )
  }
}
/*
                                                handleObjectDetails={this.handleProjectDetails}

*/