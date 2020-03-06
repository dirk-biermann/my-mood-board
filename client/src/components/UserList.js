import React, { Component } from 'react'
import axios from "axios";
import { Form, Col, Table, Button } from "react-bootstrap";
import SiteHeader from "./SiteHeader";
import Loading from "./Loading";
import IconSvg from "./Icons/IconSvg";

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
        loadUser: false
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
      return (
        <>
          <SiteHeader ico="user" title={pageTitle} />
          <Form>
            <Form.Row className="frm-alpha-w10">
              <Form.Group as={Col} sm="12">
                <Table responsive striped borderless hover size="sm" variant="dark" className="tab-vcenter">
                  <thead className="btn-blue">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Id</th>
                      <th>Role</th>
                      <th>Created at</th>
                      <th>User</th>
                      <th colSpan="2"># Projects</th>
                      <th colSpan="2"># Materials</th>
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
                            <Button className="mr-2" disabled={user.role==='admin'} variant="red" onClick={()=>{this.handleUserDeleteConfirmation(user._id)}}><IconSvg ico="delete" cls="svg-btn svg-cw90 svg-mr"/>Delete</Button>
                          </td>
                          <td>{user.pCnt}</td>
                          <td>
                            <Button className="mr-2" disabled={user.pCnt===0} variant="green" onClick={()=>{this.handleUserProjectBoard(user._id)}}><IconSvg ico="project" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                          </td>
                          <td>{user.mCnt}</td>
                          <td>
                            <Button className="mr-2" disabled={user.mCnt===0}variant="green" onClick={()=>{this.handleUserMaterialBoard(user._id)}}><IconSvg ico="material" cls="svg-btn svg-cw90 svg-mr"/>Show</Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </Form.Group>
            </Form.Row>
          </Form>
        </>
      )
    }
  }
}
