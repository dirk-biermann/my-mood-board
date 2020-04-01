import React, { Component } from 'react'
import axios from "axios";
import { CardColumns, Button } from "react-bootstrap";
import ObjectCard from "./ObjectCard";
import SiteHeader from "./SiteHeader";
import MessageBox from "./MessageBox";
import IconSvg from "./Icons/IconSvg";
import Loading from "./Loading";
import CustomButtonRow from "./CustomButtonRow";

export default class TemplateBoard extends Component {
  constructor(){
    super();
    this.state = {
      templates: [],
      confirmActionInfo: { showAction: false },
      loadTemplate: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleTemplateCreate = (idx) =>{
    this.props.history.push(`/templatedetail`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleTemplateDetails = (idx) =>{
    this.props.history.push(`/templatedetail/${idx}`);
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleTemplateGetAll = async () => { 
    const route = this.props.prv ? `/api/templates/usr/${this.props.match.params.id}` : '/api/templates';

    let [templateData] = await Promise.all([
        axios.get(route)
    ]);
    this.setState({
      templates: templateData.data,
      loadTemplate: false
    });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.handleTemplateGetAll().catch(err => { console.log('handleTemplateGetAll failed!', err ); });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {  
    if( this.state.loadTemplate === true ) { return ( <Loading variant="warning"/> ) }

    const templateCards = this.state.templates.map( (template, index) => {
                            return <ObjectCard key={`template_card_${template._id}`} 
                                                idx={template._id} 
                                                typ={"tb"}
                                                title={template.name}
                                                imgUrl = {template.imageUrl}
                                                handleObjectDetails={this.handleTemplateDetails}
                                                dispDetail = {template}
                                                {...this.props}/>                            
                        }); 
    if( (!this.props.prv) && ( this.props.user.role === 'user') ) {
      templateCards.push( 
          <ObjectCard key={`template_card_0`} 
                      idx={'0'} 
                      typ={"tb"}
                      title={'New Template'}
                      imgUrl = {'/newobject.png'}
                      handleObjectCreate={this.handleTemplateCreate}
                      {...this.props}
          />
        );
    }

    if( templateCards.length === 0 ) {
      templateCards.push( 
          <ObjectCard key={`template_card_0`} 
                      typ={"tb"}
                      title={'No Template'}
                      imgUrl = {'/noobject.png'}
                      {...this.props}
          />
        );
    }

    let pageTitle = "";
    if( this.props.prv ) {
      if( this.state.templates[0] ) {
        pageTitle = `Templates of user: '${this.state.templates[0].owner!==null?this.state.templates[0].owner.username:'<unknown>'}'`;
      }
    }
        
    const btnList = [<Button key="tb-0" className="mr-2 mb-1" variant="dark" onClick={() => { this.props.history.push("/userboard") }}><IconSvg ico="follower" cls="svg-btn svg-cw90 svg-mr"/>User List</Button> ];

    return( 
      <>
        { this.props.prv && ( <SiteHeader ico="template" title={pageTitle} /> ) }    
        <CardColumns className="frm-mb-12">
          { templateCards }
        </CardColumns>
        <MessageBox option={this.state.confirmActionInfo} />  
        {(this.props.prv) && ( <CustomButtonRow btnList={btnList}/> ) }
      </>
    )
  }
}
/*
    return (
      <>
        <SiteHeader ico="template" title={pageTitle} />
        <Col sm="3">
          <Alert variant="info">
            <Alert.Heading>Information</Alert.Heading>
            <p><i>This functionality is currently not implemented!</i></p>
            <hr />
            <p className="mb-0">
              The main functionality of <b>My-Mood-Board</b> is not affected.
              Projects and Materials can be created, assigned and maintained.
            </p>
          </Alert>
        </Col>
      </>      
    )
*/
