import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import store from './redux/store';

const newStore = store();

ReactDOM.render(
  <Provider store={newStore}>
    <App />
  </Provider>,
   document.getElementById('root')
 );
