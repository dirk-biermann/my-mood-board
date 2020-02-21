import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectBoard from "./components/ProjectBoard";
import Startpage from "./components/Startpage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Distance from "./components/Distance";
import Footer from "./components/Footer";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  routeProjectBoard = (props) => {  
    if (this.state.user) {
      return <ProjectBoard user={this.state.user} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  render() {
    console.log( "APP:", this.state.user ? "set" : "undef", this.state.user )
    return (
      <div className="App">
        <Distance/>
        <Navbar user={this.state.user} clearUser={this.setUser} />
          <div className="dist-horz">
            <Route exact path="/" render={props => <Startpage user={this.state.user} {...props} /> }/>
            <Route exact path="/signup" render={props => <Signup {...props} setUser={this.setUser} />} />
            <Route exact path="/login" render={props => <Login {...props} setUser={this.setUser} />} />
            <Route exact path="/projectboard" render={this.routeProjectBoard} />
          </div>
        <Distance/>
        <Footer user={this.state.user}/>
      </div>
    );
  }
}

export default App;
