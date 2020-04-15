import React, { Component } from 'react'
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import InputTextBox from "./Inputs/InputTextBox";
import InputTextNumeric from "./Inputs/InputTextNumeric";
import InputTextArea from "./Inputs/InputTextArea";
import InputTextColor from "./Inputs/InputTextColor";
import InputCheckBox from "./Inputs/InputCheckBox";
import InputTextSelect from "./Inputs/InputTextSelect";
import MessageBox from "./Modals/MessageBox";
import SiteHeader from "./Formats/SiteHeader";
import ObjectCard from "./Formats/ObjectCard";
import Loading from "./Formats/Loading";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";
import CustomButtonRow from "./Formats/CustomButtonRow";

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
        templateId: -1,
        templates: [],
        editMode: false,
        createMode: false,
        loadMaterial: true
    }
  }

  getInputObjectFromElement = (elem, idx) => {
    let objElement = (<></>);

    switch (elem.type) {
      case 'TB': objElement = ( <InputTextBox idx={idx} elementData={elem} onChange={this.handleExampleOnChange} /> ); break;
      case 'TN': objElement = ( <InputTextNumeric idx={idx} elementData={elem} onChange={this.handleExampleOnChange} /> ); break;
      case 'TA': objElement = ( <InputTextArea idx={idx} elementData={elem} onChange={this.handleExampleOnChange} /> ); break;
      case 'TC': objElement = ( <InputTextColor idx={idx} elementData={elem} onChange={this.handleExampleOnChange} /> ); break;
      case 'CB': objElement = ( <InputCheckBox idx={idx} elementData={elem} onChange={this.handleExampleOnChange} /> ); break;
      default: break;
    }

    return objElement;
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleExampleOnChange = (event) => {
    const { value, idx } = event.target;

    //console.log( "OCHG", name, idx, value );

    let tmpMaterial = cloneObject( this.state.material );
    tmpMaterial.template.elements[idx].value = value;

    //console.log( "TM", tmpMaterial.template.elements[idx] );

    this.setState( { material: tmpMaterial } );
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
      this.handleMaterialDelete( this.state.material._id );
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
    console.log( "TMPCHG", value );

    let tmpMaterial = cloneObject( this.state.material );
    if( value >= 0 ) {
      tmpMaterial.template = this.state.templates[value];    
    } else {
      tmpMaterial.template = null;    
    }
  
    this.setState({
        templateId: value, 
        material: tmpMaterial,
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
  handleMaterialGetOneOrNew = async (idx) => {
    //console.log( "[PD] handleMaterialGetOne", idx)

    if( idx ) {
      let [materialData, templateData] = await Promise.all([
          axios.get(`/api/materials/${idx}`),
          axios.get('/api/templates')
      ]);
      this.setState({
          material: materialData.data,
          templates: templateData.data,
          templateId: -2,
          editMode: true,
          loadMaterial: false
        });
    } else {
      let [templateData] = await Promise.all([
          axios.get('/api/templates')
      ]);
      this.setState({
          templates: templateData.data,
          templateId: -1,
          editMode: true,
          createMode: true,
          loadMaterial: false
        })
    }
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    const materialId = this.props.match.params.id;
    //console.log( "[PD] componentDidMount", materialId)
    this.handleMaterialGetOneOrNew(materialId)
      .catch(err => { 
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let pageTitle = '';
    let btnList = [];

    if( this.state.editMode === true ) pageTitle = 'Material Update';
    if( this.state.createMode === true ) pageTitle = 'Material Create';

    if( this.state.loadMaterial === true ) { return ( <Loading variant="warning"/> ) }

    const disableSaveUpdate = this.state.material.name.length > 0 ? false : true;

    btnList.push( <Button key={'material_detail_btn_00'} className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/materialboard") }}><IconSvg ico="material" cls="svg-btn svg-cw90 svg-mr"/>Overview</Button> );
    if( this.state.createMode === true || this.state.editMode === true ) {
      let btnText = 'Update';
      if( this.state.createMode === true ) btnText = 'Save';

      btnList.push( <Button key={'material_detail_btn_01'} disabled={disableSaveUpdate} className="mr-2 mb-1" variant="blue" type="submit"><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>{btnText}</Button> );
    }
    if( this.state.createMode === false && this.state.editMode === true ) {
      btnList.push( <Button key={'material_detail_btn_02'} className="mr-2 mb-1" variant="red" onClick={this.handleMaterialDeleteConfirmation}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button> );
    }
    
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

    let tmpList = [];
    if( this.state.createMode ) { // create new material - template field is selection list
      //console.log( "TMPLIST", this.state.templates );
      tmpList = this.state.templates.map( (template, id) => { return [ id, template.name ]; } )
      tmpList.unshift( [ -1, '<no template assigned>' ] );
    }

    let templateName = '';
    let hasTemplate = false;

    if( this.state.templateId === -2 ) {
      if( this.state.material.template === null ) {
        templateName = "<no template assigned>"; 
      } else {
        templateName = this.state.material.template.name;
        hasTemplate = true;
      }
    } else {
      if( this.state.templateId < 0 ) {
        templateName = "<no template assigned>"; 
      } else {
        templateName = this.state.material.template.name;
        hasTemplate = true;
      }
    }
    
    let inputList = [];
    if( hasTemplate === true ) {
      inputList = this.state.material.template.elements.map( (elem, id) => {
          const inp = this.getInputObjectFromElement( elem, id );
          return (
              <Form.Group key={`te_${id}`} as={Col} sm="12" md="4" lg="3">
                {inp}
              </Form.Group>
            );
        }
      )
    }
    
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
              { this.state.createMode === true ? (
                  <InputTextSelect
                    value={this.state.templateId || ''}
                    label={"Template:"}
                    name={"templateId"} 
                    options={tmpList}
                    onChange={this.handleChangeTemplate}
                    margin={true}              
                  />
                ):(
                  <InputTextBox
                    value={templateName}
                    label={"Template:"}
                    name={"templateName"} 
                    readOnly={true}
                  />
                ) 
              }
              
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

          { hasTemplate === true && (
              <Form.Row className="frm-alpha-w10">
                {inputList}
              </Form.Row>
            )
          }

          <CustomButtonRow btnList={btnList}/>
        </Form>
        <MessageBox option={confirmActionInfo} />  
      </>
    )
  }
}
