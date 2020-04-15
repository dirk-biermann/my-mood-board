import React, { Component } from 'react'
import { Navbar } from "react-bootstrap";
import IconSvg from "../Icons/IconSvg";

export default class AppFooter extends Component {
  constructor(){
    super()
      this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let signedIn = 'Not signed in !';
    let userName = '';
    if( this.props.user ) { 
      signedIn = 'Signed in as:';
      userName = this.props.user.username
    }

    return(
      <Navbar className="foot" bg="dark" variant="dark" fixed="bottom" style={{textAlign: "left"}}>
        <Navbar.Brand className="navbar-cr" style={{fontSize: "0.9rem", color:"rgb(255,255,255,0.5)", padding:"0rem", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
          <IconSvg ico={'copyright'} cls="svg-btn svg-sw-10 svg-cw75 svg-mr"/>
          <p className="abt-cr" >2020 by <img src="/crw.png" alt="crw" height="25px"/></p>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="footer-text">
            <><span>{signedIn} </span><span className="footer-text-si">{userName}</span></>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
