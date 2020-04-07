import React, { Component } from 'react'
import axios from "axios";
import { Form, Col, Table, Button, CardColumns, Badge } from "react-bootstrap";
import SiteHeader from "./SiteHeader";
import Loading from "./Loading";
import IconSvg from "./Icons/IconSvg";
import ObjectCard from "./ObjectCard";
import MessageBox from "./MessageBox";
import CustomButton from "./CustomButton";
import CustomButtonRow from "./CustomButtonRow";

export default class UserBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        users: [],
        loadUser: true,
        confirmActionInfo: { showAction: false }
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserTemplateBoard = (idx) => {
    this.props.history.push(`/userboard/tmp/${(idx===""?"0":idx)}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserMaterialBoard = (idx) => {
    this.props.history.push(`/userboard/mat/${(idx===""?"0":idx)}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserProjectBoard = (idx) => {
    this.props.history.push(`/userboard/prj/${(idx===""?"0":idx)}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserTransferConfirmation = () => {
    let lcWord = '';
    let ucWord = '';
    let dispMsg = '';
    let dispTitle = '';
    let trState = this.state.transferState.toLowerCase();

    switch (trState) {
      case 'move':
      case 'copy':
          lcWord = trState;
          ucWord = trState.charAt(0).toUpperCase() + trState.substring(1); 
          dispTitle = `${ucWord} All Data`;
          dispMsg = `Do you want to ${lcWord} all data\nfrom '${this.state.fromUser.data.username}'\nto '${this.state.isValidUserName}?'`;
        break;
    
      case 'delete-object':
          trState = (trState.split('-'))[0]
          lcWord = trState;
          ucWord = trState.charAt(0).toUpperCase() + trState.substring(1); 
          dispTitle = `${ucWord} All Data`;
          dispMsg = `Do you want to ${lcWord} all data\nfrom '${this.state.fromUser.data.username}?'`;
        break;

      case 'delete-user':
          trState = (trState.split('-'))[0]
          lcWord = trState;
          ucWord = trState.charAt(0).toUpperCase() + trState.substring(1); 
          dispTitle = `${ucWord} User`;
          dispMsg = `Do you want to ${lcWord}\nuser '${this.state.fromUser.data.username}'?`;
        break;

      default:
        break;
    }

    const tmpConfirmActionInfo  = { showAction: true,
                        fktConfirm: this.handleUserTransferConfirmationState,
                        title: dispTitle,
                        message: dispMsg,
                        icon: 'question',
                        iconColor: "blue",
                        iconCW: true,
                        btn: [ { btnText: 'Cancel', iconName: 'cancel', retVal: false, btnColor: 'dark' },
                               { btnText: ucWord, iconName: lcWord, retVal: true, btnColor: 'red' }
                             ]
                      };
    this.setState({ 
        confirmActionInfo: tmpConfirmActionInfo,
        loadUser: false
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserAllDeleteUser = (idx) => {
    this.handleUserAllTransfer( 'delete-user', idx, true );
  }

  handleUserAllDeleteObject = (idx) => {
    this.handleUserAllTransfer( 'delete-object', idx, true );
  }

  handleUserAllMove = (idx) => {
    this.handleUserAllTransfer( 'move', idx, false );
  }

  handleUserAllCopy = (idx) => {
    this.handleUserAllTransfer( 'copy', idx, false );
  }
  
  // -----------------------------------------

  handleUserAllTransfer = async ( transferType, idx, confirm ) => {
    let tmpFromUser = this.state.users.find( (user) => { return (user._id.toString() === idx.toString() ); });
    const tmpToUserList = this.state.users.filter( (user) => { return (user._id.toString()!=="") && (user._id.toString() !== idx.toString() ); });

    if( idx===""){ tmpFromUser = { username: '<unknown>', role: 'temp', _id: "0" }; }

    //console.log( "IDX: ",`'${tmpFromUser._id}'`);
    const routeProject = `/api/projects/usr/${tmpFromUser._id}`;
    const routeMaterial = `/api/materials/usr/${tmpFromUser._id}`;
    const routeTemplate = `/api/templates/usr/${tmpFromUser._id}`;

    let [projectDataUser, materialDataUser, templateDataUser] = await Promise.all([
        axios.get(routeProject),
        axios.get(routeMaterial),
        axios.get(routeTemplate)
      ]);

    
    this.setState({
        transferState: transferType,
        fromUser: { data: tmpFromUser,
                    projects: projectDataUser.data,
                    materials: materialDataUser.data,
                    templates: templateDataUser.data },
        toUserList: tmpToUserList,
        loadUser: false
      });

    if( confirm ) {
      this.handleUserTransferConfirmation();
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserTransferConfirmationState = (confirmTransferState) => {
    //console.log( "Confirm", confirmTransferState );
    if( confirmTransferState === true ) {
      this.handleExecuteTransfer();
    } else {
      this.handleCancelTransfer();
    }
  }

  handleExecuteTransfer = async () => {
    //console.log("handleExecuteTransfer:", this.state.transferState);

    switch (this.state.transferState) {
      case 'move':
          //console.log( "MOVE TRANSFER" );
          await Promise.all([
              axios.put('/api/projects/move', { info: 'copy projects', data: { src_id: this.state.fromUser.data._id, dst_id: this.state.isValidUser } } ),
              axios.put('/api/materials/move', { info: 'copy materials', data: { src_id: this.state.fromUser.data._id, dst_id: this.state.isValidUser } } ),
              axios.put('/api/templates/move', { info: 'copy templates', data: { src_id: this.state.fromUser.data._id, dst_id: this.state.isValidUser } } )
            ]);
          //console.log( "MOVE TRANSFER DONE" );
          this.handleCancelTransfer();
          this.handleUserGetAll().catch(err => { this.props.history.push(`/`); });
        break;

      case 'copy':
          //console.log( "COPY TRANSFER" );
          await Promise.all([
              axios.post('/api/projects/copy', { info: 'copy projects', data: this.state.fromUser.projects, dst_id: this.state.isValidUser } ),
              axios.post('/api/materials/copy', { info: 'copy materials', data: this.state.fromUser.materials, dst_id: this.state.isValidUser } ),
              axios.post('/api/templates/copy', { info: 'copy templates', data: this.state.fromUser.templates, dst_id: this.state.isValidUser } )
            ]);
          //console.log( "COPY TRANSFER DONE" );
          this.handleCancelTransfer();
          this.handleUserGetAll().catch(err => { this.props.history.push(`/`); });
        break;
    
      case 'delete-object':
          //console.log( "DELETE PROJECTS & MATERIALS" );
          await Promise.all([
              axios.delete(`/api/projects/owner/${this.state.fromUser.data._id }`),
              axios.delete(`/api/materials/owner/${this.state.fromUser.data._id }`),
              axios.delete(`/api/templates/owner/${this.state.fromUser.data._id }`)
            ]);
          //console.log( "DELETE PROJECTS & MATERIALS DONE" );
          this.handleCancelTransfer();
          this.handleUserGetAll().catch(err => { this.props.history.push(`/`); });
        break;

      case 'delete-user':
          //console.log( "DELETE USER" );
          await Promise.all([
              axios
                .delete(`/api/users/${this.state.fromUser.data._id}`)
            ]);
          //console.log( "DELETE USER DONE" );
          this.handleCancelTransfer();
          this.handleUserGetAll().catch(err => { this.props.history.push(`/`); });
        break;

      default:
          this.handleCancelTransfer();
        break;
    }
  }

  handleCancelTransfer = () => {
    //console.log("handleCancelTransfer");
    this.setState({
        transferState: undefined,
        fromUser: undefined,
        toUserList: undefined,
        isValidUser: undefined,
        isValidUserName: undefined,
        confirmActionInfo: { showAction: false },
        loadUser: false
      });
  }

  handleChangeTransferUser = (event) => {
    const listId = event.target.value;
    //console.log( "USERLISTID: ", listId, typeof( listId ) );
    switch (listId) {
      case "0":
          this.setState( {isValidUser: undefined, isValidUserName: undefined });
        break;
    
      case "-99":
          this.setState( {isValidUser: "0", isValidUserName: 'unknown' });
        break;

      default:
          this.setState( {isValidUser: this.state.toUserList[listId-1]._id,
                          isValidUserName: this.state.toUserList[listId-1].username });
        break;
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserGetAll = async () => {
    //console.log( "GETALL [0]:", this.state.transferState);
    let [userData] = await Promise.all([
        axios.get('/api/users')
    ]);
    
    //console.log( "GETALL [1]");
    let objCnt;
    let newUsers = userData.data.allUser.map( (user,id) => {
        objCnt = userData.data.objCount.find( (obj) => { return( obj.id.toString() === user._id.toString() ); });
        //console.log( "GETALL [2]", id, objCnt );
        user.pCnt = objCnt ? objCnt.pCnt : 0;
        user.mCnt = objCnt ? objCnt.mCnt : 0;
        user.tCnt = objCnt ? objCnt.tCnt : 0;
        return( user );
      });
    //console.log( "GETALL [3]", userData.data.objCount.length );

    objCnt = userData.data.objCount[userData.data.objCount.length-1];
    newUsers.push( { username: '<unknown>', role: 'temp', _id: "", pCnt: objCnt.pCnt, mCnt: objCnt.mCnt, tCnt: objCnt.tCnt });

    //console.log( "GETALL [4]");
    
    this.setState({
        users: newUsers,
        loadUser: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  componentDidMount() {
    this.handleUserGetAll()
        .catch(err => { 
          this.props.history.push(`/`);
        });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let pageTitle = 'User List';
    if( this.state.loadUser === true ) { return ( <Loading variant="warning"/> ) }

    // ---------------------------------------------------------------------
    // -- to user option 
    let optList = [];
    if( this.state.transferState !== undefined ) {
      optList = this.state.toUserList.map( (user,id) => {
          return ( <option key={`usr_opt_${id+1}`} value={id+1}>{user.username}</option> )
        });
      optList.unshift( ( <option key={`usr_opt_${0}`} value={0}>select user ...</option> ) );
      optList.push( ( <option key={`usr_opt_${'unknown'}`} value={-99}>&lt;unknown&gt;</option> ) );
    }

    // ---------------------------------------------------------------------
    // -- from user object cards 

    let projectList = [];
    let materialList = [];
    let templateList = [];
    let transferTitle = '';
    
    if( this.state.transferState !== undefined ) {
      const trState = (this.state.transferState.split('-'))[0]
      transferTitle = trState.charAt(0).toUpperCase() + trState.substring(1).toLowerCase();

      if( this.state.fromUser.projects ) {
        projectList = this.state.fromUser.projects.map( (project,id) => {
            return (
              <ObjectCard key={`project_card_${id}`} 
                          idx={project._id} 
                          typ={"pb"}
                          title={project.name}
                          imgUrl = {project.imageUrl}
                          dispDetail = {project}
                          {...this.props}/>
            )
          });
      }
      if( this.state.fromUser.materials ) {
        materialList = this.state.fromUser.materials.map( (material,id) => {
            return (
              <ObjectCard key={`material_card_${id}`} 
                          idx={material._id} 
                          typ={"mb"}
                          title={material.name}
                          imgUrl = {material.imageUrl}
                          dispDetail = {material}
                          {...this.props}/>
            )
          });         
      }
      if( this.state.fromUser.templates ) {
        templateList = this.state.fromUser.templates.map( (template,id) => {
            return (
              <ObjectCard key={`template_card_${id}`} 
                          idx={template._id} 
                          typ={"tb"}
                          title={template.name}
                          imgUrl = {template.imageUrl}
                          dispDetail = {template}
                          {...this.props}/>
            )
          });         
      }
    }

    const btnList = [ <Button key="ub_01" className="mmb-btn-xs mr-2" variant="blue" onClick={this.handleUserGetAll}><IconSvg ico="refresh" cls="svg-btn svg-cw90 svg-mr"/>Refresh</Button> ];

    // ---------------------------------------------------------------------
    //console.log( "UsrBoard-RENDER", this.state.confirmActionInfo );
    // ---------------------------------------------------------------------

    return (
      <>
        <SiteHeader ico="follower" title={pageTitle} />
        <Form>
          <Form.Row className="frm-alpha-w10">
            <Form.Group as={Col} sm="12">
              <Table responsive striped hover size="sm" variant="dark" className="tab-vcenter" style={{marginBottom: "0"}}>
                <thead style={{backgroundColor: "#303030"}}>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Id</th>
                    <th>Role</th>
                    <th>Created at</th>
                    <th className="brd-vert cell-center">User</th>
                    <th className="cell-right">#</th>
                    <th className="cell-center">Projects</th>
                    <th className="brd-left-dash cell-right">#</th>
                    <th className="cell-center">Materials</th>
                    <th className="brd-left-dash cell-right">#</th>
                    <th className="cell-center">Templates</th>
                    <th colSpan="2" className="brd-left cell-center">All Objects</th>
                  </tr>
                </thead>
                <tbody style={{fontSize: "1rem"}}>
                {
                  this.state.users.map( (user, id) => {
                    return (
                      <tr key={`user_row_${id}`}>
                        <td><Badge variant="light-l">{id}</Badge></td>
                        <td>{user.username}</td>
                        <td>{user._id}</td>
                        <td>{user.role}</td>
                        <td>{user.createdAt}</td>
                        <td className="brd-vert cell-center">
                          <CustomButton disabled={(user.pCnt>0)||(user.mCnt>0)||(user.role!=='user')||(this.state.transferState !== undefined)} cls="mmb-btn-s" color="red" onClick={()=>{this.handleUserAllDeleteUser(user._id)}} ico={{ name:"del_user", cls:"svg-btn svg-cw90"}} info={['Delete','User']} />
                        </td>
                        <td className="cell-right">{user.pCnt}</td>
                        <td className="cell-center">
                          <CustomButton disabled={(user.pCnt===0)||(this.state.transferState !== undefined)} cls="mmb-btn-s mr-2" color="green" onClick={()=>{this.handleUserProjectBoard(user._id)}} ico={{ name:"project", cls:"svg-btn svg-cw90"}} info={['Show','Projects']} />
                        </td>
                        <td className="brd-left-dash cell-right">{user.mCnt}</td>
                        <td className="cell-center">
                          <CustomButton disabled={(user.mCnt===0)||(this.state.transferState !== undefined)} cls="mmb-btn-s mr-2" color="green" onClick={()=>{this.handleUserMaterialBoard(user._id)}} ico={{ name:"material", cls:"svg-btn svg-cw90"}} info={['Show','Materials']} />
                        </td>
                        <td className="brd-left-dash cell-right">{user.tCnt}</td>
                        <td className="cell-center">
                          <CustomButton disabled={(user.tCnt===0)||(this.state.transferState !== undefined)} cls="mmb-btn-s" color="green" onClick={()=>{this.handleUserTemplateBoard(user._id)}} ico={{ name:"template", cls:"svg-btn svg-cw90"}} info={['Show','Templates']} />
                        </td>
                        <td className="brd-left cell-center">
                          <CustomButton disabled={((user.pCnt===0)&&(user.mCnt===0)&&(user.tCnt===0))||(this.state.transferState !== undefined)} cls="mmb-btn-s mr-2" color="blue" onClick={()=>{this.handleUserAllMove(user._id)}} ico={{ name:"move", cls:"svg-btn svg-cw90"}} info={['Move','Objects']} />
                          <CustomButton disabled={((user.pCnt===0)&&(user.mCnt===0)&&(user.tCnt===0))||(this.state.transferState !== undefined)} cls="mmb-btn-s" color="blue" onClick={()=>{this.handleUserAllCopy(user._id)}} ico={{ name:"copy", cls:"svg-btn svg-cw90"}} info={['Copy','Objects']} />
                        </td>
                        <td className="brd-left-dash cell-center">
                          <CustomButton disabled={((user.pCnt===0)&&(user.mCnt===0)&&(user.tCnt===0))||(this.state.transferState !== undefined)} cls="mmb-btn-s" color="red" onClick={()=>{this.handleUserAllDeleteObject(user._id)}} ico={{ name:"delete", cls:"svg-btn svg-cw90"}} info={['Delete','Pbjects']} />
                        </td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            </Form.Group>
          </Form.Row>

          { (this.state.transferState === undefined) && ( <CustomButtonRow btnList={btnList} /> ) }
          { (['move','copy'].includes(this.state.transferState)) && (
              <Form.Row className="frm-alpha-w10">
                <Form.Group as={Col} sm="12" md="3">
                  <h5>{transferTitle} from user '{this.state.fromUser.data.username}' to user ...</h5>
                  <Form.Control
                    as="select"
                    name="moveuser"
                    id="moveuser"
                    default={''}
                    onChange={this.handleChangeTransferUser}
                  >
                    {optList}
                  </Form.Control> 
                  <div style={{marginTop: "12px"}}>             
                    <nobr>
                      <Button className="mr-2" variant="dark" onClick={this.handleCancelTransfer}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Cancel</Button>
                      <Button className="mr-2" disabled={(this.state.isValidUser===undefined)} variant="blue" onClick={this.handleUserTransferConfirmation}><IconSvg ico={transferTitle.toLowerCase()} cls="svg-btn svg-cw90 svg-mr"/>{transferTitle}</Button>
                    </nobr>
                  </div>
                </Form.Group>
                <Form.Group as={Col} sm="12" md="9">
                  <h5>Projects, Materials and Templates to {transferTitle.toLowerCase()} ...</h5>
                  <CardColumns className="card-detail frm-mb-12">
                    {projectList}
                    {materialList}
                    {templateList}
                  </CardColumns>
                </Form.Group>
              </Form.Row>
            )
          }
        </Form>
        <MessageBox option={this.state.confirmActionInfo} />
      </>
    )
  }
}
/*

                            <Button className="mmb-btn-s" disabled={(user.pCnt>0)||(user.mCnt>0)||(user.role!=='user')||(this.state.transferState !== undefined)} variant="red" onClick={()=>{this.handleUserAllDeleteUser(user._id)}}><IconSvg ico="del_user" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>
                            <Button className="mmb-btn-s mr-2" disabled={(user.pCnt===0)||(this.state.transferState !== undefined)} variant="green" onClick={()=>{this.handleUserProjectBoard(user._id)}}><IconSvg ico="project" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                            <Button className="mmb-btn-s mr-2" disabled={(user.mCnt===0)||(this.state.transferState !== undefined)} variant="green" onClick={()=>{this.handleUserMaterialBoard(user._id)}}><IconSvg ico="material" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                            <Button className="mmb-btn-s" disabled={(user.tCnt===0)||(this.state.transferState !== undefined)} variant="green" onClick={()=>{this.handleUserTemplateBoard(user._id)}}><IconSvg ico="template" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                            <Button className="mmb-btn-s mr-2" disabled={((user.pCnt===0)&&(user.mCnt===0)&&(user.tCnt===0))||(this.state.transferState !== undefined)} variant="blue" onClick={()=>{this.handleUserAllMove(user._id)}}><IconSvg ico="move" cls="svg-btn svg-cw90 svg-mr"/>Move ...</Button>
                            <Button className="mmb-btn-s" disabled={((user.pCnt===0)&&(user.mCnt===0)&&(user.tCnt===0))||(this.state.transferState !== undefined)} variant="blue" onClick={()=>{this.handleUserAllCopy(user._id)}}><IconSvg ico="copy" cls="svg-btn svg-cw90 svg-mr"/>Copy ...</Button>
                            <Button className="mmb-btn-s" disabled={((user.pCnt===0)&&(user.mCnt===0)&&(user.tCnt===0))||(this.state.transferState !== undefined)} variant="red" onClick={()=>{this.handleUserAllDeleteObject(user._id)}}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>

*/