import React, { Component } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
       <Router>
         <div className="App">
           <Switch>
             <Route exact path="/" component={Login}/>
             <Route exact path="/signup" component={Signup}/>
           </Switch>
         </div>
       </Router>
    );
  }
}
