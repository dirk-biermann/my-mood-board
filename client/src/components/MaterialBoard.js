import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Button } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import SiteHeader from "./SiteHeader";
import MessageBox from "./MessageBox";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";
import Loading from "./Loading";
import CustomButtonRow from "./CustomButtonRow";

export default class MaterialBoard extends Component {
  constructor(){
    super();
    this.state = {
      showDeleteAction: false,
      materials: [],
      assignStatus:[],
      loadMaterial: true
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
        showDeleteAction: true
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
        showDeleteAction: false
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
    if( this.props.assignMode && !this.props.prv ) {
      const projectId = this.props.match.params.id;
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
        idxPrj: projectId,
        loadMaterial: false
      });
    } else {
      const route = this.props.prv ? `/api/materials/usr/${this.props.match.params.id}` : '/api/materials';

      let [materialData] = await Promise.all([
          axios.get(route)
      ]);
      this.setState({
        materials: materialData.data,
        idxPrj: 0,
        loadMaterial: false
      });
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.handleMaterialGetAll().catch(err => { console.log('handleMaterialGetAll failed!', err ); });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {   
    let delMaterialName = '';
    let confirmActionInfo = { showAction: false };

    if( this.state.loadMaterial === true ) { return ( <Loading variant="warning"/> ) }

    if( this.state.materialDeleteIdx ){
      delMaterialName = this.state.materials.find( (material)=>{ return material._id === this.state.materialDeleteIdx; }).name;
      confirmActionInfo = { showAction: true,
                          fktConfirm: this.handleMaterialDeleteConfirmationState,
                          title: 'Delete Material',
                          message: `Do you want to delete material \n'${delMaterialName}'`,
                          icon: 'question',
                          iconColor: "blue",
                          iconCW: true,
                          btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                                 { btnText: 'Delete', iconName: 'delete', retVal: true, btnColor: 'red' }
                               ]
                        };
    }

    const materialCards = this.state.materials.map( (material, index) => {
                         // let materialImage = material.imageUrl === "" ? "/material.png" : material.imageUrl;
                          if( this.props.assignMode === undefined ) {
                            if( this.props.prv ) {
                              return <ObjectCard key={`material_card_${material._id}`} 
                                                  idx={material._id} 
                                                  typ={"mb"}
                                                  title={material.name}
                                                  imgUrl = {material.imageUrl}
                                                  dispDetail = {material}
                                                  {...this.props}/>
                            } else {
                              return <ObjectCard key={`material_card_${material._id}`} 
                                                  idx={material._id} 
                                                  typ={"mb"}
                                                  title={material.name}
                                                  imgUrl = {material.imageUrl}
                                                  handleObjectDetails={this.handleMaterialDetails}
                                                  handleObjectDelete={this.handleMaterialDeleteConfirmation}
                                                  dispDetail = {material}
                                                  {...this.props}/>
                            }
                          } else {
                            return <ObjectCard key={`material_card_${material._id}`} 
                                                idx={material._id} 
                                                typ={"mb"}
                                                title={material.name}
                                                imgUrl = {material.imageUrl}
                                                handleObjectAssign = {this.handleMaterialAssign}
                                                assignCheck = {this.state.assignStatus[index]} 
                                                dispDetail = {material}
                                                {...this.props}/>                            
                          }
                        }); 
    if( ( this.props.assignMode === undefined ) && ( !this.props.prv ) && ( this.props.user.role === 'user')  ) {
      materialCards.push( 
          <ObjectCard key={`material_card_0`} 
                      idx={'0'} 
                      typ={"mb"}
                      title={'New Material'}
                      imgUrl = {'/newobject.png'}
                      handleObjectCreate={this.handleMaterialCreate}
                      {...this.props}
          />
        )
    }
    let pageTitle = "";
    if( this.props.prv ) {
      if( this.state.materials[0] ) {
        pageTitle = `Materials of user: '${this.state.materials[0].owner!==null?this.state.materials[0].owner.username:'<unknown>'}'`;
      }
    }
    
    let btnList = [];

    if( this.props.assignMode ) {
      btnList.push( <Button className="mr-2 mb-1" variant="dark" onClick={this.handleProjectDetails}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button> );
      btnList.push( <Button className="mr-2 mb-1" variant="blue" onClick={this.handleProjectUpdate}><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Save</Button> );
    } else {
      if( this.props.prv ) {
        btnList.push( <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/userboard") }}><IconSvg ico="follower" cls="svg-btn svg-cw90 svg-mr"/>User List</Button> );      
      }
    }
    
    return (
      <>   
        {this.props.assignMode && ( <SiteHeader ico="checked" title={'Material Assign'} /> )} 
        {this.props.prv && ( <SiteHeader ico="project" title={pageTitle} /> )}  

        <CardColumns className="frm-mb-12">
          { materialCards }
        </CardColumns>
        {(this.props.assignMode || this.props.prv) && ( <CustomButtonRow btnList={btnList}/> ) }
        <MessageBox option={confirmActionInfo} />  
      </>
    )
  }
}
