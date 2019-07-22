import React from 'react';
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
