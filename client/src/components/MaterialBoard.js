import React, { Component } from 'react'
import axios from "axios";
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import ConfirmDelete from "./ConfirmDelete";

export default class MaterialBoard extends Component {
  constructor(){
    super();
    this.state = {
      showConfirm: false,
      materials: []
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDetails = (idx) =>{
    console.log( "D-MAT:", idx );
    this.props.history.push(`/materialdetail/${idx}`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialCreate = (idx) =>{
    console.log( "C-MAT:", idx );
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
    console.log( "DEL-MAT:", idx );
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
  handleMaterialGetAll = () => {
    axios
      .get("/api/materials")
      .then(response => {
        this.setState({
          materials: response.data
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
 
    return (
      <>
        <CardColumns>
          { this.state.materials.map( (material, index) => {
              let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
              return <ObjectCard key={`material_card_${material._id}`} 
                                  idx={material._id} 
                                  typ={"mm"}
                                  title={material.name}
                                  imgUrl = {materialImage}
                                  handleObjectOverview={this.handleMaterialMoodboard}
                                  handleObjectDetails={this.handleMaterialDetails}
                                  handleObjectDelete={this.handleMaterialDeleteConfirmation}
                                  {...this.props}/>
            }) 
          }
          <ObjectCard key={`material_card_0`} 
                      idx={'0'} 
                      typ={"mm"}
                      title={'New Material'}
                      imgUrl = {'/newobject.png'}
                      handleObjectCreate={this.handleMaterialCreate}
                      info='New Material'
                      {...this.props}/>
        </CardColumns>
        <ConfirmDelete show={this.state.showConfirm} close={this.handleMaterialDeleteConfirmationState} info={delMaterial} />
      </>
    )
  }
}


















/*
import React, { Component } from 'react'
import { CardColumns } from "react-bootstrap";
import ObjectCard from "./ObjectCard";

export default class MaterialBoard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDetails = (idx) =>{
    console.log( "D-MAT:", idx );
    this.props.history.push(`/materialdetail/${idx}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let objList = [];
    for( let i=0; i<30; i++ ){
      objList.push( <ObjectCard key={`material_card_${i}`} 
                                idx={i} 
                                typ={"mm"}
                                title={`Title M${i}`}
                                imgUrl = {"./material.png"}
                                handleObjectDetails={this.handleMaterialDetails}
                                {...this.props}/> )
    }

    return (
      <CardColumns>
        { objList }
      </CardColumns>
    )
  }
}
*/