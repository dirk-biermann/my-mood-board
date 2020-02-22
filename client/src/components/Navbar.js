import React, { Component } from 'react'
import About from './About.js';

import { Link } from "react-router-dom";
import { Navbar as Navmenu } from "react-bootstrap";
import { logout } from "../services/auth";

import IconSvg from "./Icons/IconSvg";

export default class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      showAbout: false
    };
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  showAbout = () => {
    this.setState({ showAbout: true });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  hideAbout = () => {
    this.setState({ showAbout: false });
  };

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
      <>
        <Navmenu className="nav" bg="dark" fixed="top">
          <Navmenu.Brand>
            <Link to="/"><img alt="acb-logo" src="../arts_craft_base_logo.svg" width="35" height="35"/></Link>
          </Navmenu.Brand>
          <Navmenu.Text className="shw-acb navbar-caption">Arts-Craft-Base</Navmenu.Text>
            
          <Navmenu.Collapse className="justify-content-end">
            <Link to="/"><IconSvg ico="home" cls="svg-nav svg-sw10 svg-cw50-h"/></Link> 

            {this.props.user ? (
              <>
                <Link to="/projectboard"><IconSvg ico="project" cls="svg-nav svg-sw10 svg-cw50-h"/></Link>
                <Link to="/materialboard"><IconSvg ico="material" cls="svg-nav svg-sw10 svg-cw50-h"/></Link>
                <Link to="/templateboard"><IconSvg ico="template" cls="svg-nav svg-sw10 svg-cw50-h"/></Link>
                <IconSvg ico="diff" cls="svg-nav svg-sw10 svg-cw25"/>
                <Link to="/" onClick={this.handleLogout}><IconSvg ico="logout" cls="svg-nav svg-sw10 svg-cw50-h"/></Link>
              </>
            ) : (
              <>
                <IconSvg ico="diff" cls="svg-nav svg-sw10 svg-cw25"/>
                <Link to="/signup"><IconSvg ico="signup" cls="svg-nav svg-sw10 svg-cw50-h"/></Link>
                <Link to="/login"><IconSvg ico="login" cls="svg-nav svg-sw10 svg-cw50-h"/></Link>
              </>
            )}
            <div className="acb-a-svg" onClick={this.showAbout}><IconSvg ico="info" cls="svg-nav svg-sw10 svg-cw50-h"/></div>
          </Navmenu.Collapse>
        </Navmenu>
        <About show={this.state.showAbout} close={this.hideAbout} />
      </>
    )
  }
}
