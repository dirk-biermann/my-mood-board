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
import UserList from "./components/UserList";
import Startpage from "./components/Startpage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Distance from "./components/Distance";
import Footer from "./components/Footer";

// ----------------------------------------------------------
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PublicRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return rest.user ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: redirectTo,
          state: { from: routeProps.location }
        }}/>
      );
    }}/>
  );
};

class App extends React.Component {
  state = {
    user: this.props.user
  };

  // ----------------------------------------------------------

  setUser = user => {
    this.setState({
      user: user
    });
  };

  // ----------------------------------------------------------
  
  render() {
    return (
      <div className="App">
        <Distance/>
        <Navbar user={this.state.user} clearUser={this.setUser} />
          <div className="dist-horz">
            <PublicRoute exact path='/' component={Startpage} user={this.state.user} />
            <PublicRoute exact path='/signup' component={Signup} setUser={this.setUser} />
            <PublicRoute exact path='/login' component={Login} setUser={this.setUser} />

            <PrivateRoute exact path='/projectboard' component={ProjectBoard} redirectTo="/" user={this.state.user} />
            <PrivateRoute exact path='/projectdetail/:id' component={ProjectDetail} redirectTo="/" user={this.state.user} />
            <PrivateRoute exact path='/projectcreate' component={ProjectDetail} redirectTo="/" user={this.state.user} />

            <PrivateRoute exact path='/materialboard/:id' component={MaterialBoard} redirectTo="/" assignMode={true} user={this.state.user} />
            <PrivateRoute exact path='/materialboard' component={MaterialBoard} redirectTo="/" user={this.state.user} />
            <PrivateRoute exact path='/materialdetail/:id' component={MaterialDetail} redirectTo="/" user={this.state.user} />
            <PrivateRoute exact path='/materialcreate' component={MaterialDetail} redirectTo="/" user={this.state.user} />

            <PrivateRoute exact path='/templateboard' component={TemplateBoard} redirectTo="/" user={this.state.user} />
            <PrivateRoute exact path='/templatedetail/:id' component={TemplateDetail} redirectTo="/" user={this.state.user} />

            <PrivateRoute exact path='/moodboard/:id' component={MoodBoard} redirectTo="/" user={this.state.user} />

            <PrivateRoute exact path='/userlist' component={UserList} redirectTo="/" user={this.state.user} />
            <PrivateRoute exact path='/userlist/prj/:id' component={ProjectBoard} redirectTo="/" prv={true} user={this.state.user} />
            <PrivateRoute exact path='/userlist/mat/:id' component={MaterialBoard} redirectTo="/" prv={true} user={this.state.user} />
            <PrivateRoute exact path='/userlist/mb/:id' component={MoodBoard} redirectTo="/" prv={true} user={this.state.user} />
          </div>
        <Distance/>
        <Footer user={this.state.user}/>
      </div>
    );
  }
}

export default App;
