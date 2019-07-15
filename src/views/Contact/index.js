import React from 'react';
import Dashboard from '../../layout/Dashboard'
import store from '../../store';

function Contact() {
  return (
    <Dashboard title="sdfs">
      <h1>I am Contact</h1>
      User name: {store.getState().user.name} 
    </Dashboard>
  );
}

export default Contact;