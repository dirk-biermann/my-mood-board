import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class Startpage extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  handleGetStarted = () => {
    console.log( "GETS:", this.props.user );
    if( this.props.user ) {
      this.props.history.push("/projectboard");
    } else {
      this.props.history.push("/login");
    }
  }

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    return (
      <div className="info-box f-row">
        <div className="f-item f-col">
          <img className="acb-img" src="./acb.png" alt="acb" width="400px"/>
        </div>
        <div className="f-item f-col txt-box">
          <h1 className="b-item title"><span className="fc-r">M</span>y-<span className="fc-g">M</span>ood-<span className="fc-b">B</span>oard</h1>
          <div className="b-item desc">
            <p><IconSvg ico="dot" cls="svg-mr svg-sw5 svg-cw90"/>Administration of materials and craft projects.</p>
            <p><IconSvg ico="dot" cls="svg-mr svg-sw5 svg-cw90"/>Visualization with a Mood-Board.</p>
            <p><IconSvg ico="dot" cls="svg-mr svg-sw5 svg-cw90"/>Be creative and more flexible!</p>
          </div>
          <Button className="b-item acb-btn" variant="green" onClick={this.handleGetStarted}>Get Started &nbsp;<IconSvg ico="right" cnt={3} cls="svg-sw10 svg-cw90"/></Button>
        </div>
      </div>
    );
  };
}