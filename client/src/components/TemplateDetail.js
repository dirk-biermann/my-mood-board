import React, { Component } from 'react'
import axios from "axios";
import { Form, Col, Button, Table, Badge } from "react-bootstrap";
import SiteHeader from "./SiteHeader";
import { cloneObject, moveElement } from "../services/init";
import CustomButton from "./CustomButton";
import CustomButtonRow from "./CustomButtonRow";
import ObjectCard from "./ObjectCard";
import IconSvg from "./Icons/IconSvg";
import InputTextBox from "./Inputs/InputTextBox";
import InputTextArea from "./Inputs/InputTextArea";
import InputTextNumeric from "./Inputs/InputTextNumeric";
import InputTextSelect from "./Inputs/InputTextSelect";
import InputTextColor from "./Inputs/InputTextColor";
import InputCheckBox from "./Inputs/InputCheckBox";
import MessageBox from "./MessageBox";
import ElementExample from "./ElementExample";
import Loading from "./Loading";

export default class TemplateDetail extends Component {
  constructor(props){
    super(props)
    this.typeList = [ ["TB","TextBox",''], ["TA","TextArea",''], ["TN","TextNumber",0], ["TC","TextColor",'#FFFFFF'], ["CB","CheckBox",false] ];

    this.state = {
        typeSelected: 'TB',

        template: {
          name: '',
          description: '',
          imageUrl: '',
          imagePublicID: '',
          owner: this.props.user._id,
          isPublic: false,
          elements: []
        },

        element: this.getEmptyElement('TB'),
        elementIdx: -1,

        isEditMode: false,
        loadTemplate: true,

        confirmActionInfo: { showAction: false },
        exampleActionInfo: { showAction: false }
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  getEmptyElement = (eType) => {
    const element = {
                      type:  eType,
                      tname: this.typeList.find( (t) => { return t[0]===eType; })[1],
                      name:  '',
                      label: '',
                      opt: { def: this.typeList.find( (t) => { return t[0]===eType; })[2] },
                      value: null
                    };
          
    switch (eType) {
      case 'TB':
          element.opt.len = 255;
          element.opt.unit = 'Char(s)';
        break;
    
      case 'TA':
          element.opt.len = 255;
          element.opt.unit = 'Char(s)';
          element.opt.row = 5;
        break;
    
      case 'TN':
          element.opt.min = 0;
          element.opt.max = 100;
          element.opt.unit = '';
        break;

      case 'TC':
        break;

      case 'CB':
        break;

      default:
        break;
    }

    return element;
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handlePickupColor = (hex) => {
    let tmpElement = cloneObject( this.state.element );
    tmpElement.opt.def = hex;
    this.setState({ element: tmpElement });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeInput = (event) => {
    let { name, value } = event.target;

    let tmpElement = cloneObject( this.state.element );
    let tmpTemplate = cloneObject( this.state.template );
    
    if( (['name','type','label']).find( (e) => { return e===name }) ) {
      tmpElement[name] = value;
    } else {
      if( (['t_name','t_description','t_imageUrl']).find( (e) => { return e===name }) ) {
        name = name.split('_')[1];
        tmpTemplate[name] = value;
      } else {
        tmpElement.opt[name] = value;
      }
    }
    this.setState({ template: tmpTemplate, element: tmpElement });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeSelect = (event) => {
    const { value } = event.target;
    let tmpElement = this.getEmptyElement( value );

    //console.log( "CS: ", tmpElement, "typeSelected:", value );
    this.setState({ element: tmpElement, typeSelected: value });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChangeCheckbox = (event) => {
    let tmpElement = cloneObject( this.state.element );
    tmpElement.opt.def = !this.state.element.opt.def;
    this.setState({ element: tmpElement });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleEditElement = (idx) => {
    //console.log( "ET: ", this.state.template.elements[idx].type, this.state.template.elements[idx] );
    this.setState({ element: this.state.template.elements[idx], elementIdx: idx, isEditMode: true, typeSelected: this.state.template.elements[idx].type });
  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleDeleteElement = (idx) => {
    const dispName = this.state.template.elements[idx].name === '' ? '<no name>' : this.state.template.elements[idx].name;
    const dispMsg = `Do you want to delete\nelement [${idx}]: '${dispName}' ?`;
    const tmpConfirmActionInfo  = { showAction: true,
                        fktConfirm: this.handleDeleteElementConfirm,
                        idx: idx,
                        title: 'Delete Element From List',
                        message: dispMsg,
                        icon: 'question',
                        iconColor: "blue",
                        iconCW: true,
                        btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                               { btnText: 'Delete', iconName: 'delete', retVal: true, btnColor: 'red' }
                             ]
                      };
    this.setState({ 
        confirmActionInfo: tmpConfirmActionInfo,
      });
  }

  handleDeleteElementConfirm = (confirm) => {
    if( confirm === true ) {
      const idx = this.state.confirmActionInfo.idx;
      let tmpTemplate = cloneObject( this.state.template );
      tmpTemplate.elements.splice( idx, 1 );

      this.setState({ template: tmpTemplate, element: this.getEmptyElement('TB'), typeSelected: 'TB', elementIdx: -1 });
    }
    this.setState({ confirmActionInfo: { showAction: false } });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleCancelEditElement = () => {
    this.setState({ isEditMode: false, element: this.getEmptyElement('TB'), typeSelected: 'TB', elementIdx: -1 });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUpdateEditElement = () => {
    let tmpTemplate = cloneObject( this.state.template );
    tmpTemplate.elements[this.state.elementIdx] = cloneObject( this.state.element );

    this.setState({ isEditMode: false, template: tmpTemplate, element: this.getEmptyElement('TB'), typeSelected: 'TB', elementIdx: -1 });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleCloneEditElement = () => {
    let tmpTemplate = cloneObject( this.state.template );
    tmpTemplate.elements.push( cloneObject(this.state.element ) );

    this.setState({ isEditMode: false, template: tmpTemplate, element: this.getEmptyElement('TB'), typeSelected: 'TB', elementIdx: -1 });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleAddElement = () => {
    let tmpTemplate = cloneObject( this.state.template );
    tmpTemplate.elements.push( cloneObject(this.state.element ) );

    this.setState({ template: tmpTemplate });
  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleCancelTemplate = () => {
    this.props.history.push("/templateboard");
  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleSaveTemplate = () => {
    axios
      .post("/api/templates/create", {
          info: "Create Template",
          data: this.state.template
      })
      .then(response => {
        this.props.history.push("/templateboard");
      })
      .catch(err => {
        //console.log(err);
      });

  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleUpdateTemplate = () => {
    axios
      .put(`/api/templates/${this.state.template._id}`, {
          info: "Update Template",
          data: this.state.template  
      })
      .then(response => {
        this.props.history.push("/templateboard")
      })
      .catch(err => {
        //console.log(err);
      });  
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleElementExample = (idx) => {
    const tmpExampleActionInfo  = { showAction: true,
                        fktClose: this.handleElementExampleConfirm,
                        element: this.state.template.elements[idx]
                      };
    this.setState({ 
        exampleActionInfo: tmpExampleActionInfo,
        elementIdx: idx
      });
  };

  handleElementExampleConfirm = (confirm) => {
    this.setState({ exampleActionInfo: { showAction: false }, elementIdx: undefined });
  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleElementMoveUp = (idx) => {
    let tmpTemplate = cloneObject( this.state.template );
    tmpTemplate.elements = moveElement( tmpTemplate.elements, idx, idx-1 );

    this.setState({ template: tmpTemplate });
  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleElementMoveDown = (idx) => {
    let tmpTemplate = cloneObject( this.state.template );
    tmpTemplate.elements = moveElement( tmpTemplate.elements, idx, idx+1 );

    this.setState({ template: tmpTemplate });
  };


  // -----------------------------------------
  //
  // -----------------------------------------
  handleTemplateGetOne = (idx) => {
    //console.log( "[PD] handleTemplateGetOne", idx)
    axios
      .get(`/api/templates/${idx}`)
      .then(response => {
        this.setState({
            template: response.data,
            createMode: false,
            loadTemplate: false
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
    const templateId = this.props.match.params.id;
    //console.log( "[PD] componentDidMount", templateId)
    if( templateId ) {
      this.handleTemplateGetOne(templateId);
    } else { 
      this.setState({
          createMode: true,
          loadTemplate: false
        })
    }
  }


  render() {
    let pageTitle = this.state.createMode ? 'Template Create' : 'Template Update';
    let btnListEdit = [];
    let btnListSave = [];
  	let formColumnGroups = [ (<></>), (<></>), (<></>) ];

    if( this.state.loadTemplate === true ) { return ( <Loading variant="warning"/> ) }

    if( this.state.isEditMode===true ) {
      btnListEdit.push( <Button key={'btn_edit_01'} className="mr-2 mb-1" variant="dark" onClick={this.handleCancelEditElement}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button> );
      btnListEdit.push( <Button key={'btn_edit_02'} className="mr-2 mb-1" variant="blue" onClick={this.handleUpdateEditElement}><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Update</Button> ); 
      btnListEdit.push( <Button key={'btn_edit_03'} className="mr-2 mb-1" variant="green" onClick={this.handleCloneEditElement}><IconSvg ico="copy" cls="svg-btn svg-cw90 svg-mr"/>Clone</Button> ); 
    } else {
      btnListEdit.push( <Button key={'btn_edit_01'} disabled={this.state.element.type===''} className="mr-2 mb-1" variant="green" onClick={this.handleAddElement}><IconSvg ico="plus" cls="svg-btn svg-cw90 svg-mr"/>Add Element</Button> );
    }

    btnListSave.push( <Button key={'btn_edit_01'} className="mr-2 mb-1" variant="dark" onClick={this.handleCancelTemplate}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button> );
    if( this.state.createMode===true ) {
      btnListSave.push( <Button key={'btn_save_01'} disabled={this.state.isEditMode===true} className="mr-2 mb-1" variant="blue" onClick={this.handleSaveTemplate}><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Save</Button> );
    } else {
      btnListSave.push( <Button key={'btn_save_01'} disabled={this.state.isEditMode===true} className="mr-2 mb-1" variant="blue" onClick={this.handleUpdateTemplate}><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>Update</Button> );
    }

    formColumnGroups[0] = (
      <Form.Group as={Col} sm="6" md="4" lg="3">
        <InputTextBox
          value={this.state.element.label}
          placeholder={"Enter label text"}
          label={"Label:"}
          name={"label"} 
          onChange={this.handleChangeInput}
          margin={true}
        />
        <InputTextBox
          value={this.state.element.name}
          placeholder={"Enter name qualifier"}
          label={"Name:"}
          name={"name"} 
          onChange={this.handleChangeInput}
        />
      </Form.Group>
    );

    switch (this.state.element.type) {
      case 'TC':
          formColumnGroups[1] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextColor
                value={this.state.element.opt.def}
                placeholder={"No Color"}
                label={"Default:"}
                name={"def"} 
                onChange={this.handleChangeInput}
                margin={true}
                readOnly={true}
              />
            </Form.Group>
          );
        break;

      case 'TA':
          formColumnGroups[1] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextArea
                value={this.state.element.opt.def}
                placeholder={"Enter default text value"}
                label={"Default:"}
                name={"def"} 
                onChange={this.handleChangeInput}
                row={"3"}
              />
            </Form.Group>
          );
        break;

      case 'TN':
          formColumnGroups[1] = (
            <>
              <Form.Group as={Col} sm="6" md="4" lg="3">
                <InputTextNumeric
                  value={this.state.element.opt.def}
                  placeholder={"Enter default numeric value"}
                  label={"Default:"}
                  name={"def"} 
                  min={"0"}
                  unit={this.state.element.opt.unit}
                  onChange={this.handleChangeInput}
                  margin={true}
                />
                <InputTextBox
                  value={this.state.element.opt.unit}
                  placeholder={"Enter unit value"}
                  label={"Unit:"}
                  name={"unit"} 
                  onChange={this.handleChangeInput}
                />
              </Form.Group>
            </>
          );
        break;     

      case 'CB':
          formColumnGroups[1] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputCheckBox
                value={this.state.element.opt.def}
                label={"Default:"}
                name={"def"} 
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          );
        break;
        
      default:
          formColumnGroups[1] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextBox
                value={this.state.element.opt.def}
                placeholder={"Enter default text value"}
                label={"Default:"}
                name={"def"} 
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          );
        break;
    }

    switch (this.state.element.type) {
      case 'TN':
          formColumnGroups[2] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextNumeric
                value={this.state.element.opt.min}
                placeholder={"Enter min numeric value"}
                label={"Min Value:"}
                name={"min"} 
                min={"0"}
                unit={this.state.element.opt.unit}
                onChange={this.handleChangeInput}
                margin={true}
              />
              <InputTextNumeric
                value={this.state.element.opt.max}
                placeholder={"Enter max numeric value"}
                label={"Max Value:"}
                name={"max"} 
                min={"0"}
                unit={this.state.element.opt.unit}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          );
        break;
          
      case 'TB':
          formColumnGroups[2] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextNumeric
                value={this.state.element.opt.len}
                placeholder={"Enter max text length"}
                label={"Text Len:"}
                name={"len"} 
                min={"0"}
                unit={this.state.element.opt.unit}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          );      
        break;

      case 'TA':
          formColumnGroups[2] = (
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextNumeric
                value={this.state.element.opt.len}
                placeholder={"Enter max text length"}
                label={"Text Len:"}
                name={"len"} 
                min={"0"}
                unit={this.state.element.opt.unit}
                onChange={this.handleChangeInput}
                margin={true}
              />
              <InputTextNumeric
                value={this.state.element.opt.row}
                placeholder={"Enter min rows"}
                label={"Rows:"}
                name={"row"} 
                min={"0"}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          );      
        break;

      default:
        break;
    }

    //console.log("RT: ",this.state.element.type, this.state.typeSelected );

    return (
      <>
        <SiteHeader ico="template" title={pageTitle} bkg={this.state.endBackground}/>
        <Form>
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="6" md="3" lg="2">
              <div className="card-small">
                <ObjectCard key={`template_card_0815`} 
                            typ={"tb"}
                            title={this.state.template.name}
                            imgUrl = {this.state.template.imageUrl}
                            {...this.props}/>
              </div>
            </Form.Group>
            <Form.Group as={Col} sm="6" md="3" lg="3">
              <InputTextBox
                value={this.state.template.name}
                placeholder={"Enter template name"}
                label={"Name:"}
                name={"t_name"} 
                onChange={this.handleChangeInput}
                autoFocus={true}
                margin={true}
              />
            </Form.Group>
            <Form.Group as={Col} sm="6" md="6" lg="7">
              <InputTextBox
                value={this.state.template.description}
                placeholder={"Enter description text"}
                label={"Description:"}
                name={"t_description"} 
                onChange={this.handleChangeInput}
                margin={true}
              />
              <InputTextBox
                value={this.state.template.imageUrl}
                placeholder={"Enter image URL"}
                label={"Image:"}
                name={"t_imageUrl"} 
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="6" md="4" lg="3">
              <InputTextSelect 
                  value={this.state.typeSelected}
                  placeholder={"Select element type"}
                  label={"Element:"}
                  name={"type"}
                  options={this.typeList} 
                  onChange={this.handleChangeSelect}
                  isDisabled={this.state.isEditMode}
                  margin={true}
                  showValue={true}
                  style={{marginBottom: "1rem"}}
              />
            </Form.Group>
            {formColumnGroups[0]}
            {formColumnGroups[1]}
            {formColumnGroups[2]}
          </Form.Row>

          <CustomButtonRow btnList={btnListEdit} />
          
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="12">
              <Table responsive striped hover variant="dark" className="tab-vcenter" style={{marginBottom: "0"}}>
                <thead style={{backgroundColor: "#303030"}}>
                  <tr>
                    <th>#</th>
                    <th colSpan="2">Type</th>
                    <th className="brd-left">Label</th>
                    <th className="brd-left">Name</th>
                    <th className="brd-left">Default</th>
                    <th colSpan="6" className="brd-left">Options</th>
                    <th colSpan="2" className="brd-left">Maintenance</th>
                    <th className="brd-left">Move</th>
                  </tr>
                </thead>
                <tbody style={{fontSize: "1rem"}}>
                {
                  this.state.template.elements.map( (element, id, arr) => {
                    const rowStyle = id===this.state.elementIdx ? { backgroundColor: "rgb(64,128,0,0.25)" } : {};

                    return (
                      <tr key={`element_row_${id}`} style={rowStyle}>
                        <td><Badge variant="light-l">{id+1}</Badge></td>
                        <td>{this.typeList.find( (t) => { return t[0]===element.type; })[1]}</td>
                        <td className="brd-left-dash">[ {element.type} ]</td>
                        <td className="brd-left">{element.label}</td>
                        <td className="brd-left">{element.name}</td>
                        <td className="brd-left">{element.opt.def.toString()}</td>
                        { (element.type==='TC') && (
                            <>
                              <td className="brd-left label">Example:</td>
                              <td><Badge className="badge-color-td" style={{backgroundColor: element.opt.def}}><span></span></Badge></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </>
                          )
                        }
                        { (element.type==='TB') && (
                            <>
                              <td className="brd-left label">Text Len:</td>
                              <td>{element.opt.len}</td>
                              <td></td>
                              <td></td>
                              <td className="brd-left-dash label">Unit:</td>
                              <td>{element.opt.unit}</td>
                            </>
                          )
                        }
                        { (element.type==='TA') && (
                            <>
                              <td className="brd-left label">Text Len:</td>
                              <td>{element.opt.len}</td>
                              <td className="brd-left-dash label">Rows:</td>
                              <td>{element.opt.row}</td>
                              <td className="brd-left-dash label">Unit:</td>
                              <td>{element.opt.unit}</td>
                            </>
                          )
                        }
                        { (element.type==='TN') && (
                            <>
                              <td className="brd-left label">Min:</td>
                              <td>{element.opt.min}</td>
                              <td className="brd-left-dash label">Max:</td>
                              <td>{element.opt.max}</td>
                              <td className="brd-left-dash label">Unit:</td>
                              <td>{element.opt.unit}</td>
                            </>
                          )
                        }
                        { (element.type==='CB') && (
                            <>
                              <td className="brd-left"></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </>
                          )
                        }
                        <td className="brd-left cell-center">
                          <nobr>
                            <CustomButton disabled={this.state.isEditMode} cls="mmb-btn-s mr-1" color="blue" onClick={ () => { this.handleEditElement(id) } } ico={{ name:"edit", cls:"svg-btn svg-cw90"}} info={['Edit','Element']} />
                            <CustomButton disabled={this.state.isEditMode} cls="mmb-btn-s mr-1" color="yellow" onClick={ () => { this.handleElementExample(id) } } ico={{ name:"expand", cls:"svg-btn svg-cw90"}} info={['Show','Element Sample']} />
                          </nobr>
                        </td>
                        <td className="brd-left-dash cell-center">
                          <nobr>
                            <CustomButton disabled={this.state.isEditMode} cls="mmb-btn-s mr-1" color="red" onClick={ () => { this.handleDeleteElement(id) } } ico={{ name:"delete", cls:"svg-btn svg-cw90"}} info={['Delete','Element']} />
                          </nobr>
                        </td>
                        <td className="brd-left cell-center">
                          <nobr>
                            <CustomButton disabled={this.state.isEditMode || id===0} cls="mmb-btn-s mmb-move mr-1" color="green" onClick={ () => { this.handleElementMoveUp(id) } } ico={{ name:"up", cls:"svg-btn svg-cw90"}} info={['Move','Up']} />
                            <CustomButton disabled={this.state.isEditMode || id===(arr.length-1)} cls="mmb-btn-s mmb-move mr-2" color="green" onClick={ () => { this.handleElementMoveDown(id) } } ico={{ name:"down", cls:"svg-btn svg-cw90"}} info={['Move','Down']} />
                          </nobr>
                        </td>
                      </tr>
                    )
                  })
                }

                {this.state.template.elements.length===0 && (
                    <tr>
                      <td></td>
                      <td colSpan="13">No Elements ...</td>
                    </tr>
                  )
                }

                </tbody>
              </Table>
            </Form.Group>
          </Form.Row>

          <CustomButtonRow btnList={btnListSave} />

        </Form>
        <MessageBox option={this.state.confirmActionInfo} />
        {this.state.exampleActionInfo.showAction===true && (
            <ElementExample option={this.state.exampleActionInfo} />
          )
        }
      </>
    )
  }
}
