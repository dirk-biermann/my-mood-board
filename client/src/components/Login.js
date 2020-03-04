import React, { Component } from "react";
import { login } from "../services/auth";
import { Alert, Form, Button, ButtonToolbar } from "react-bootstrap";
import IconSvg from "./Icons/IconSvg";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
        username: "",
        password: "",
        error: ""
      };
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleClose = () => {
    this.props.history.push("/");
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: undefined
    });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  handleSubmit = event => {
    event.preventDefault();

    login(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/projectboard"
        this.props.history.push("/projectboard");
      }
    });
  };

  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    return (
      <div className="info-box f-row">
        <div className="f-item f-col">
          <img className="acb-img" src="./acb.png" alt="acb" width="200px"/>
        </div>
        <div className="f-item f-col txt-box">
          <h1 className="b-item title"><span className="fc-o">L</span>ogin</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">Username: </Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password: </Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.state.error && (
              <Alert variant="danger"><IconSvg ico="error" cls="svg-btn svg-cw90 svg-mr"/>{this.state.error}</Alert>
            )}
            <ButtonToolbar>
              <Button className="acb-btn" variant="red" onClick={this.handleClose}><IconSvg ico="cancel" cls="svg-btn svg-cw90 svg-mr"/>Close</Button>
              <Button className="acb-btn" variant="dark" type="submit"><IconSvg ico="login" cls="svg-btn svg-cw90 svg-mr"/>Log in</Button>
            </ButtonToolbar>
          </Form>
        </div>
      </div>
    );
  }
}

