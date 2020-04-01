import React, { Component } from 'react'
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import InputTextBox from "./Inputs/InputTextBox";
import InputTextArea from "./Inputs/InputTextArea";
import MessageBox from "./MessageBox";
import SiteHeader from "./SiteHeader";
import ObjectCard from "./ObjectCard";
import Loading from "./Loading";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";
import CustomButtonRow from "./CustomButtonRow";

export default class MaterialDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showDeleteAction: false,
        material: {
          name: '',
          description: '',
          notes: '',
          imageUrl: '',
          imagePublicID: '',
          template: null,
          projects: [],
          owner: this.props.user._id
        },
        tmp: '',
        templates: [],
        editMode: false,
        createMode: false,
        loadMaterial: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDeleteConfirmation = () => {
    this.setState({ 
        showDeleteAction: true,
        loadMaterial: false
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDeleteConfirmationState = (confirmDeleteState) => {
    if (confirmDeleteState === true) {
      this.handleMaterialDeletet( this.state.material._id );
    }
    this.setState({
        showDeleteAction: false,
        loadMaterial: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeInput = (event) => {
    const { name, value } = event.target;
    let tmpMaterial = cloneObject( this.state.material );

    tmpMaterial[name] = value;

    this.setState({
        material: tmpMaterial,
        loadMaterial: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeTemplate = (event) => {
    const { value } = event.target;
    
    this.setState({
        tmp: value,
        loadMaterial: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialSubmit = (event) => {
    if (event) { event.preventDefault(); }
    if( this.state.createMode && this.state.editMode ) {
      this.handleMaterialCreate();
    } else {
      if( this.state.editMode ) {
        this.handleMaterialUpdate(this.state.material._id);
      }
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialCreate = () => {
    axios
      .post("/api/materials/create", {
          info: "Create Material",
          data: this.state.material
      })
      .then(response => {
        this.props.history.push("/materialboard");
      })
      .catch(err => {
        //console.log(err);
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialUpdate = (idx) => {
    axios
      .put(`/api/materials/${idx}`, {
          info: "Update Material",
          data: this.state.material  
      })
      .then(response => {
        this.props.history.push("/materialboard")
      })
      .catch(err => {
        //console.log(err);
      });  
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialDelete = (idx) =>{
    axios
      .delete(`/api/materials/${idx}`)
      .then(() => {
        this.props.history.push("/materialboard");
      })
      .catch(err => {
        //console.log(err);
      })
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleMaterialGetOne = (idx) => {
    //console.log( "[PD] handleMaterialGetOne", idx)
    axios
      .get(`/api/materials/${idx}`)
      .then(response => {
        this.setState({
            material: response.data,
            editMode: true,
            loadMaterial: false
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
    const materialId = this.props.match.params.id;
    //console.log( "[PD] componentDidMount", materialId)
    if( materialId ) {
      this.handleMaterialGetOne(materialId);
    } else { 
      this.setState({
          editMode: true,
          createMode: true,
          loadMaterial: false
        })
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let pageTitle = '';
    let btnList = [];

    if( this.state.editMode === true ) pageTitle = 'Material Update';
    if( this.state.createMode === true ) pageTitle = 'Material Create';

    btnList.push( <Button key={'material_detail_btn_00'} className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/materialboard") }}><IconSvg ico="material" cls="svg-btn svg-cw90 svg-mr"/>Overview</Button> );
    if( this.state.createMode === true || this.state.editMode === true ) {
      let btnText = 'Update';
      if( this.state.createMode === true ) btnText = 'Save';

      btnList.push( <Button key={'material_detail_btn_01'} className="mr-2 mb-1" variant="blue" type="submit"><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>{btnText}</Button> );
    }
    if( this.state.createMode === false && this.state.editMode === true ) {
      btnList.push( <Button key={'material_detail_btn_02'} className="mr-2 mb-1" variant="red" onClick={this.handleMaterialDeleteConfirmation}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button> );
    }
    
    const templateReadOnly = this.state.editMode;

    //console.log( "[PD] REN img:", this.state.material.imageUrl );

    const delMaterialName = this.state.material.name;
    let confirmActionInfo = { showAction: false };

    if( this.state.showDeleteAction ){
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

    if( this.state.loadMaterial === true ) { return ( <Loading variant="warning"/> ) }
    
    return (
      <>
        <SiteHeader ico="material" title={pageTitle} />
        <Form onSubmit={this.handleMaterialSubmit}>

          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="12" md="3" lg="2">
              <div className="card-middle">
                <ObjectCard key={`material_card_${this.state.material._id}`} 
                            idx={this.state.material._id} 
                            typ={"mb"}
                            title={this.state.material.name}
                            imgUrl = {this.state.material.imageUrl}
                            {...this.props}/>
              </div>
            </Form.Group>
            <Form.Group as={Col} sm="12" md="3" lg="4">
              <InputTextBox
                value={this.state.material.name || ''}
                placeholder={"Enter material name"}
                label={"Name:"}
                name={"name"} 
                onChange={this.handleChangeInput}
                autoFocus={true}
                margin={true}
              />
              <InputTextBox
                value={this.state.material.imageUrl || ''}
                placeholder={"Enter image URL"}
                label={"Image:"}
                name={"imageUrl"} 
                onChange={this.handleChangeInput}
                margin={true}
              />
              <InputTextBox
                value={this.state.tmp || ''}
                placeholder={"Enter template name"}
                label={"Template:"}
                name={"tmp"} 
                readOnly={templateReadOnly}
                onChange={this.handleChangeTemplate}
              />
            </Form.Group>

            <Form.Group as={Col} sm="12" md="6" lg="3">
              <InputTextArea
                value={this.state.material.description || ''}
                placeholder={"Enter material description"}
                label={"Description:"}
                name={"description"} 
                minHeight={"140px"}
                rows={5}
                onChange={this.handleChangeInput}
              />
            </Form.Group>

            <Form.Group as={Col} sm="12" md="6" lg="3">
              <InputTextArea
                value={this.state.material.notes || ''}
                placeholder={"Enter material notes"}
                label={"Notes:"}
                name={"notes"} 
                minHeight={"140px"}
                rows={5}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="12">
              <span>Template Fields</span>
            </Form.Group>
          </Form.Row>
          <CustomButtonRow btnList={btnList}/>
        </Form>
        <MessageBox option={confirmActionInfo} />  
      </>
    )
  }
}
