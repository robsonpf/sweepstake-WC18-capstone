import React, { Component } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import Matches from './components/Matches';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
       <Router>
         <div className="App">
           <Switch>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/signup" component={Signup}/>
             <Route exact path="/profile" component={UserProfile}/>
             <Route exact path="/matches" component={Matches}/>
           </Switch>
         </div>
       </Router>
    );
  }
}
