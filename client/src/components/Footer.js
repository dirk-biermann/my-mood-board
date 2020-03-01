import React, { Component } from 'react'
import { Navbar } from "react-bootstrap";

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
    return(
      <Navbar className="foot" bg="dark" variant="dark" fixed="bottom" style={{textAlign: "left"}}>
        <Navbar.Brand style={{fontSize: "0.9rem", color:"rgb(255,255,255,0.5)", padding:"0rem"}}>
          (C)2020 by SU'JU'DI'KA
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="footer-text">
            { this.props.user && ( <><span>Signed in as: </span><span className="footer-text-si">{this.props.user.username}</span></> ) }
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
