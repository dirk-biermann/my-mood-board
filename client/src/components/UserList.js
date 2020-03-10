import React, { Component } from 'react'
import axios from "axios";
import { Form, Col, Table, Button, CardColumns } from "react-bootstrap";
import SiteHeader from "./SiteHeader";
import Loading from "./Loading";
import IconSvg from "./Icons/IconSvg";
import ObjectCard from "./ObjectCard";

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        users: [],
        loadUser: true
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserMaterialBoard = (idx) => {
    this.props.history.push(`/userlist/mat/${idx}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserProjectBoard = (idx) => {
    this.props.history.push(`/userlist/prj/${idx}`);
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserDeleteConfirmation = (id) => {
    this.setState({ 
        showConfirm: true,
        deleteUserId: id,
        loadUser: false
      });
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserDeleteConfirmationState = (confirmDeleteState) => {
    if (confirmDeleteState === true) {
      this.handleUserDeletet( this.state.deleteUserId );
    }
    this.setState({
        showConfirm: false,
        deleteUserId: undefined,
        loadUser: false,
        isMoving: false
      });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserDelete = (idx) =>{
    console.log( `.delete('/api/users/${idx}')` );
/*
    axios
      .delete(`/api/users/${idx}`)
      .then(() => {
        this.props.history.push("/userlist");
      })
      .catch(err => {
        console.log(err);
      })
*/
  };

  handleUserAllMove = (idx) => {
    this.handleUserAllTransfer( true, idx );
  }

  handleUserAllCopy = (idx) => {
    this.handleUserAllTransfer( false, idx );
  }
  
  handleUserAllTransfer = async ( transferType, idx) =>{
    const tmpFromUser = this.state.users.find( (user) => { return (user._id.toString() === idx.toString() ); });
    const tmpToUserList = this.state.users.filter( (user) => { return (user._id.toString() !== idx.toString() ); });

    const routeProject = `/api/projects/usr/${tmpFromUser._id}`;
    const routeMaterial = `/api/materials/usr/${tmpFromUser._id}`;

    let [projectDataUser, materialDataUser] = await Promise.all([
        axios.get(routeProject),
        axios.get(routeMaterial)
      ]);

    this.setState({
        isTransfer: transferType,
        fromUser: { data: tmpFromUser, projects: projectDataUser.data, materials: materialDataUser.data },
        toUserList: tmpToUserList
      });
  }

  handleExecuteTransfer = async () => {
    console.log("handleExecuteTransfer");
    if( this.state.isTransfer === true ) {
      // MOVE
      await Promise.all([
          axios
            .put('/api/projects/move',
                { info: 'move objects',
                  data: { src_id: this.state.fromUser.data._id, dst_id: this.state.isValidUser }
                }
              ),
          axios
            .put('/api/materials/move',
                { info: 'move materials',
                  data: { src_id: this.state.fromUser.data._id, dst_id: this.state.isValidUser }
                }
              )
      ]);
      this.handleUserGetAll();
    }
    this.handleCancelTransfer();
  }

  handleCancelTransfer = () => {
    console.log("handleCancelTransfer");
    this.setState({
        isTransfer: undefined,
        fromUser: undefined,
        toUserList: undefined,
        isValidUser: undefined
      });
  }

  handleChangeTransferUser = (event) => {
    const listId = event.target.value-1;
    if( listId > -1 ) {
      this.setState( {isValidUser: this.state.toUserList[listId]._id });
    } else {
      this.setState( {isValidUser: undefined });
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleUserGetAll = async () => {
    let [userData] = await Promise.all([
        axios.get('/api/users')
    ]);

    let newUsers = userData.data.allUser.map( (user,id) => {
        const objCnt = userData.data.objCount.find( (obj) => { return( obj.id.toString() === user._id.toString() ); });
        user.pCnt = objCnt ? objCnt.pCnt : 0;
        user.mCnt = objCnt ? objCnt.mCnt : 0;
        return( user );
      });

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
    if( this.state.loadUser === true ) {
      return ( <Loading /> )
    } else {

      // ---------------------------------------------------------------------
      // -- to user option 
      let optList = [];
      if( this.state.isTransfer !== undefined ) {
        optList = this.state.toUserList.map( (user,id) => {
            return ( <option key={`usr_opt_${id+1}`} value={id+1}>{user.username}</option> )
          });
        optList.unshift( ( <option key={`usr_opt_${0}`} value={0}>select user ...</option> ) );
      }

      // ---------------------------------------------------------------------
      // -- from user object cards 

      let projectList = [];
      let materialList = [];
      let transferTitle = '';
      
      if( this.state.isTransfer !== undefined ) {
        transferTitle = ( this.state.isTransfer === true) ? 'Move' : 'Copy';

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
        materialList = this.state.fromUser.materials.map( (material,id) => {
            return (
              <ObjectCard key={`material_card_${id}`} 
                          idx={material._id} 
                          typ={"pb"}
                          title={material.name}
                          imgUrl = {material.imageUrl}
                          dispDetail = {material}
                          {...this.props}/>
            )
          });
      }

      // ---------------------------------------------------------------------

      return (
        <>
          <SiteHeader ico="user" title={pageTitle} />
          <Form>
            <Form.Row className="frm-alpha-w10">
              <Form.Group as={Col} sm="12">
                <Table responsive striped borderless hover size="sm" variant="dark" className="tab-vcenter" style={{marginBottom: "0"}}>
                  <thead style={{backgroundColor: "black"}}>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Id</th>
                      <th>Role</th>
                      <th>Created at</th>
                      <th>User</th>
                      <th>#</th>
                      <th>Projects</th>
                      <th>#</th>
                      <th>Materials</th>
                      <th>All</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.users.map( (user, id) => {
                      return (
                        <tr key={`user_row_${id}`}>
                          <td>{id}</td>
                          <td>{user.username}</td>
                          <td>{user._id}</td>
                          <td>{user.role}</td>
                          <td>{user.createdAt}</td>
                          <td>
                            <nobr>
                              <Button className="mmb-btn-s mr-2" disabled={(user.pCnt>0)||(user.mCnt>0)||(user.role==='admin')||(this.state.isTransfer !== undefined)} variant="red" onClick={()=>{this.handleUserDeleteConfirmation(user._id)}}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>
                            </nobr>
                          </td>
                          <td>{user.pCnt}</td>
                          <td>
                            <nobr>
                              <Button className="mmb-btn-s mr-2" disabled={(user.pCnt===0)||(this.state.isTransfer !== undefined)} variant="green" onClick={()=>{this.handleUserProjectBoard(user._id)}}><IconSvg ico="project" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                            </nobr>
                          </td>
                          <td>{user.mCnt}</td>
                          <td>
                            <nobr>
                              <Button className="mmb-btn-s mr-2" disabled={(user.mCnt===0)||(this.state.isTransfer !== undefined)} variant="green" onClick={()=>{this.handleUserMaterialBoard(user._id)}}><IconSvg ico="material" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                            </nobr>
                          </td>
                          <td>
                            <nobr>
                              <Button className="mmb-btn-s mr-2" disabled={((user.pCnt===0)&&(user.mCnt===0))||(this.state.isTransfer !== undefined)} variant="blue" onClick={()=>{this.handleUserAllMove(user._id)}}><IconSvg ico="move" cls="svg-btn svg-cw90 svg-mr"/>Move</Button>
                              <Button className="mmb-btn-s mr-2" disabled={((user.pCnt===0)&&(user.mCnt===0))||(this.state.isTransfer !== undefined)||true} variant="blue" onClick={()=>{this.handleUserAllCopy(user._id)}}><IconSvg ico="copy" cls="svg-btn svg-cw90 svg-mr"/>Copy</Button>
                            </nobr>
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </Form.Group>
              { (this.state.isTransfer === undefined) && (
                  <Form.Group as={Col} sm="12" md="3">
                    <Button className="mmb-btn-s mr-2" variant="blue" onClick={this.handleUserGetAll}><IconSvg ico="refresh" cls="svg-btn svg-cw90 svg-mr"/>Refresh</Button>
                  </Form.Group>
                )
              }
            </Form.Row>
            { (this.state.isTransfer !== undefined) && (
                <Form.Row className="frm-alpha-w10">
                  <Form.Group as={Col} sm="12" md="3">
                    <h5>{transferTitle} all projects and materials from<br/> '{this.state.fromUser.data.username}' to ...</h5>
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
                        <Button className="mr-2" disabled={(this.state.isValidUser===undefined)} variant="blue" onClick={this.handleExecuteTransfer}><IconSvg ico={transferTitle.toLowerCase()} cls="svg-btn svg-cw90 svg-mr"/>{transferTitle}</Button>
                      </nobr>
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} sm="12" md="9">
                    <h5>Projects to {transferTitle.toLowerCase()} ...</h5>
                    <CardColumns className="card-detail frm-mb-12">
                      {projectList}
                    </CardColumns>
                    <h5>Materials to {transferTitle.toLowerCase()} ...</h5>
                    <CardColumns className="card-detail frm-mb-12">
                      {materialList}
                    </CardColumns>
                  </Form.Group>
                </Form.Row>
              )
            }
          </Form>
        </>
      )
    }
  }
}
