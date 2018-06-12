import React, { Component } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import GroupMatches from './components/GroupMatches';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
       <Router>
         <div className="App">
           <Switch>
             <Route exact path="/" component={() => <Redirect to="/login"/>} />
             <Route exact path="/login" component={Login}/>
             <Route exact path="/signup" component={Signup}/>
             <Route exact path="/profile" component={UserProfile}/>
             <Route exact path="/matches" component={GroupMatches}/>
           </Switch>
         </div>
       </Router>
    );
  };
}
