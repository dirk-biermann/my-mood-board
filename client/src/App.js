import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectBoard from "./components/ProjectBoard";
import Startpage from "./components/Startpage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Distance from "./components/Distance";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Distance/>
        <Navbar user={this.state.user} clearUser={this.setUser} />
          <div className="dist-horz">
            <Route exact path="/" render={props => <Startpage user={this.state.user} {...props} /> }/>
            <Route exact path="/signup" render={props => <Signup {...props} setUser={this.setUser} />} />
            <Route exact path="/login" render={props => <Login {...props} setUser={this.setUser} />} />
            <ProtectedRoute path='/projectboard' user={this.state.user} component={ProjectBoard} {...this.props}/>
          </div>
        <Distance vert={true}/>
        <Footer />
      </div>
    );
  }
}

export default App;
