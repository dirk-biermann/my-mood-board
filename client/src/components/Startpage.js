import React from "react";
import { Button } from "react-bootstrap";

const Startpage = props => {

  return (
    <div className="main">

      <div className="info-box f-row">
        <div className="f-item">
          <img className="acb-img" src="./acb.png" alt="acb" width="400px"/>
        </div>
        <div className="f-item f-col txt-box">
          <h1 className="b-item title">ARTS-CRAFT-BASE</h1>
          <div className="b-item desc">
            <p>Administration of materials and craft projects.</p>
            <p>Visualization with a Mood-Board.</p>
            <p>Be creative and more flexible!</p>
          </div>
          <Button className="b-item nextbtn" variant="light" href="/moodboard" size="lg">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Startpage;