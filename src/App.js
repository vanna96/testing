import React from 'react';
import Dashboard from './layout/Dashboard'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Routes
import Routes from './Routes';

// Browser history
const browserHistory = createBrowserHistory();

function App() {
  return (

    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
