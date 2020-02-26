import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectBoard from "./components/ProjectBoard";
import ProjectDetail from "./components/ProjectDetail";
import MaterialBoard from "./components/MaterialBoard";
import MaterialDetail from "./components/MaterialDetail";
import TemplateBoard from "./components/TemplateBoard";
import TemplateDetail from "./components/TemplateDetail";
import MoodBoard from "./components/MoodBoard";
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
  
  routeMaterialBoard = (props) => {  
    if (this.state.user) {
      return <MaterialBoard user={this.state.user} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  routeTemplateBoard = (props) => {  
    if (this.state.user) {
      return <TemplateBoard user={this.state.user} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }


  routeMoodBoard = (props) => {  
    if (this.state.user) {
      return <MoodBoard user={this.state.user} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  routeProjectDetail = (props) => {  
    if (this.state.user) {
      return <ProjectDetail user={this.state.user} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  routeMaterialDetail = (props) => {  
    if (this.state.user) {
      return <MaterialDetail user={this.state.user} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  routeTemplateDetail = (props) => {  
    if (this.state.user) {
      return <TemplateDetail user={this.state.user} {...props} />;
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
            <Route exact path="/projectdetail/:id" render={this.routeProjectDetail} />

            <Route exact path="/materialboard" render={this.routeMaterialBoard} />
            <Route exact path="/materialdetail/:id" render={this.routeMaterialDetail} />
            
            <Route exact path="/templateboard" render={this.routeTemplateBoard} />
            <Route exact path="/templatedetail/:id" render={this.routeTemplateDetail} />

            <Route exact path="/moodboard/:id" render={this.routeMoodBoard} />
          </div>
        <Distance/>
        <Footer user={this.state.user}/>
      </div>
    );
  }
}

export default App;
