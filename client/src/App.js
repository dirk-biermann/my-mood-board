import React from "react";
import "./App.css";
import "./Acb.css";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
//import Projects from "./components/tmp/Projects";
//import ProjectDetail from "./components/tmp/ProjectDetail";
//import TaskDetail from "./components/tmp/TaskDetail";
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

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />
        <Distance />
          <Route exact path="/signup" render={props => <Signup {...props} setUser={this.setUser} />} />
          <Route exact path="/login" render={props => <Login {...props} setUser={this.setUser} />} />
          <Route exact path="/moodboard" render={props => <MoodBoard {...props} setUser={this.setUser} /> }/>
          <Route exact path="/" render={props => <Startpage {...props} setUser={this.setUser} /> }/>
        <Distance />
        <Footer />
      </div>
    );
  }
}

export default App;

/*
        <Route exact path="/tasks/:id" component={TaskDetail} />
        <Route
          exact
          path="/projects"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              return <Projects {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/projects/:id"
          render={props => <ProjectDetail user={this.state.user} {...props} />}
        />
        {/* <Route exact path="/projects/:id" component={ProjectDetail} /> * /}

*/