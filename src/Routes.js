import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import About from './views/About';
import Contact from './views/Contact';
import NotFound from './views/NotFound';
import Road from './views/Road';


import EditRoad from './views/EditRoad';
import FilterRoad from './views/FilterRoad';
import Login from './views/Login';
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/about" />
        <Route component={About} exact path="/about" />
        <Route component={Contact} exact path="/contact" />
        <Route component={Road} exact path="/road" />
        <Route component={EditRoad} exact path="/edit-road" />
        <Route component={FilterRoad} exact path="/filter-road" />
        <Route component={Login} exact path="/login" />
        <Route component={Register} exact path="/register" />
        <Route component={ForgotPassword} exact path="/forgot-password" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
