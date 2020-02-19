import React, { Component } from 'react'

import { Link } from "react-router-dom";
import { Navbar as Navmenu } from "react-bootstrap";
import { logout } from "../services/auth";

import IconSvg from "./Icons/IconSvg";

export default class Navbar extends Component {
  constructor(){
    super();
    this.state = {};
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleLogout = () => {
    logout(); // destroys the session on the server
    this.props.clearUser(null); // updates the `user` state in App
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    return (
      <Navmenu className="nav" bg="dark" fixed="top">
          <Navmenu.Brand>
            <img alt="acb-logo" src="../arts_craft_base_logo.svg" width="35" height="35" className=""/>
          </Navmenu.Brand>
          <Navmenu.Text className="shw-acb navbar-caption">ARTS CRAFT BASE</Navmenu.Text>

          {this.props.user ? (
            <Navmenu.Collapse className="justify-content-end">
              <Link to="/"><IconSvg ico="home" cls="svg-nav"/></Link> 
              <Link to="/moodboard"><IconSvg ico="moodboard" cls="svg-nav"/></Link>
              <Link to="/"><IconSvg ico="material" cls="svg-nav"/></Link>
              <Link to="/"><IconSvg ico="template" cls="svg-nav"/></Link>
              <Link to="/" onClick={this.handleLogout}><IconSvg ico="logout" cls="svg-nav"/></Link>
              <IconSvg ico="diff" cls="svg-dis svg-nav"/>
              <Link to="/"><IconSvg ico="info" cls="svg-nav"/></Link>
            </Navmenu.Collapse>
          ) : (
            <Navmenu.Collapse className="justify-content-end">
              <Link to="/"><IconSvg ico="home" cls="svg-nav"/></Link> 
              <Link to="/signup"><IconSvg ico="signup" cls="svg-nav"/></Link>
              <Link to="/login"><IconSvg ico="login" cls="svg-nav"/></Link>
              <IconSvg ico="diff" cls="svg-dis svg-nav"/>
              <Link to="/"><IconSvg ico="info" cls="svg-nav"/></Link>
            </Navmenu.Collapse>
          )}
      </Navmenu>
    )
  }
}
