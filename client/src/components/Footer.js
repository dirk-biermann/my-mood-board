import React, { Component } from 'react'
import { Navbar } from "react-bootstrap";

export default class AppFooter extends Component {
  constructor(){
    super()
      this.state = {
    }
  }

  render() {
    return(
      <Navbar className="foot" bg="dark" variant="dark" fixed="bottom" style={{textAlign: "left"}}>
        <Navbar.Brand style={{fontSize: "0.9rem", color:"rgb(255,255,255,0.5)", padding:"0rem"}}>
          (C)2020 by D.W.B
        </Navbar.Brand>
      </Navbar>
    )
  }
}
