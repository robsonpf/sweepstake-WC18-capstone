import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import FlagIconFactory from 'react-flag-icon-css'
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import store from './redux/store';
import { fetchToken } from './redux/actions/auth';
import { matchesByDay } from './redux/actions/matches';
import { fetchTeams } from './redux/actions/matches';
import { fetchStadiums } from './redux/actions/matches';
import { fetchUsers } from './redux/actions/users'

const newStore = store();

newStore.dispatch(fetchToken());
newStore.dispatch(matchesByDay());
newStore.dispatch(fetchTeams());
newStore.dispatch(fetchStadiums());
newStore.dispatch(fetchUsers());

ReactDOM.render(
  <Provider store={newStore}>
    <App />
  </Provider>,
   document.getElementById('root')
 );
