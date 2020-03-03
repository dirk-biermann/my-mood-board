import React, { Component } from 'react'
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import ConfirmDelete from "./ConfirmDelete";
import SiteHeader from "./SiteHeader";
import ObjectCard from "./ObjectCard";
import IconSvg from "./Icons/IconSvg";
import { cloneObject } from "../services/init";

export default class MaterialDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showConfirm: false,
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
        showConfirm: true,
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
        showConfirm: false,
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

    if( this.state.createMode === true || this.state.editMode === true ) {
      let btnText = 'Update';
      if( this.state.createMode === true ) btnText = 'Save';

      btnList.push( <Button key={'material_detail_btn_01'} className="mr-2 mb-1" variant="blue" type="submit"><IconSvg ico="save" cls="svg-btn svg-cw90 svg-mr"/>{btnText}</Button> );
    }
    if( this.state.createMode === false && this.state.editMode === true ) {
      btnList.push( <Button key={'material_detail_btn_02'} className="mr-2 mb-1" variant="red" onClick={this.handleMaterialDeleteConfirmation}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button> );
    }
    
    const delMaterial = [ 'Material', this.state.material.name ];
    //console.log( "[PD] REN img:", this.state.material.imageUrl );

    if( this.state.loadMaterial === true ) {
      //console.log( "[PD] Alert" );
      //console.log( "===========================================================================" );
      return (
        <Container>
          <Row className="justify-content-md-center" style={{textAlign:"center"}}>
            <Col xs={12} md={8} lg={4}>
              <Alert variant={'warning'}>
                <h3>Loading ...</h3>
              </Alert>
            </Col>
          </Row>
        </Container>        
      )
    } else {
      //console.log( "===========================================================================" );
      return (
        <>
          <SiteHeader ico="material" title={pageTitle} />
          <Form onSubmit={this.handleMaterialSubmit}>
            <Form.Row className="frm-alpha-w10">
              <Form.Group as={Col} sm="6" md="4" lg="2">
                <div className="card-single">
                  <ObjectCard key={`material_card_${this.state.material._id}`} 
                              idx={this.state.material._id} 
                              typ={"mb"}
                              title={this.state.material.name}
                              imgUrl = {this.state.material.imageUrl}
                              {...this.props}/>
                </div>
              </Form.Group>
              <Form.Group as={Col} sm="12" md="8" lg="4">
                <Form.Label>Material Name: </Form.Label>
                <Form.Control
                  as="input"
                  type="text"
                  name="name"
                  value={this.state.material.name || ''}
                  onChange={this.handleChangeInput}
                />
                <Form.Label>Image Url:</Form.Label>
                <Form.Control 
                  as="input"
                  type="text"
                  name="imageUrl"
                  value={this.state.material.imageUrl || ''}
                  onChange={this.handleChangeInput}
                />
              </Form.Group>
              <Form.Group as={Col} sm="12" md="6" lg="3">
                <Form.Label>Description: </Form.Label>
                <Form.Control style={{ minHeight: "140px" }}
                  rows="7"
                  as="textarea"
                  name="description"
                  value={this.state.material.description || ''}
                  onChange={this.handleChangeInput}
                />
              </Form.Group>
              <Form.Group as={Col} sm="12" md="6" lg="3">
                <Form.Label>Notes: </Form.Label>
                <Form.Control style={{ minHeight: "140px" }}
                  rows="7"
                  as="textarea"
                  name="notes"
                  value={this.state.material.notes || ''}
                  onChange={this.handleChangeInput}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm="12">
                <Button className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/materialboard") }}><IconSvg ico="material" cls="svg-btn svg-cw90 svg-mr"/>Overview</Button>
                {btnList}
              </Form.Group>
            </Form.Row>
          </Form>
          <ConfirmDelete show={this.state.showConfirm} close={this.handleMaterialDeleteConfirmationState} info={delMaterial} />
        </>
      )
    }
  }
}




/*
import React, { Component } from 'react'

export default class MaterialDetail extends Component {
  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    return (
      <div>
        Material Detail
      </div>
    )
  }
}
*/