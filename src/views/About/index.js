import React from 'react';
import Dashboard from '../../layout/Dashboard'
import update_user,{fetch_user,sort_by_id} from '../../store/actions/userActions'
import {connect} from 'react-redux'

function About({user,other,onUpdateUser,onFetchusers,onSortByID}) {
  return (
    <Dashboard title="sdfs">
      <h1>I am about</h1>
      <p>
        User name: {user.name} 
        <button onClick={onUpdateUser}>Update User</button>
      </p>

      <p>Users: <button onClick={onFetchusers}>Fetch Users</button> <button onClick={onSortByID}>Fetch Users</button></p>
      {
        user.list.length === 0 ? <p>No user</p>:user.list.map(({id,first_name}) => <p key={id}>{id} {first_name}</p>)
      }

      <p>Other name: {other.name} </p>
    </Dashboard>
  );
}

const mapStateToProps = state => {
  return {
    user:state.user,
    other:state.other
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: () => { dispatch(update_user) },
    onFetchusers: () => { dispatch(fetch_user) },
    onSortByID: () => { dispatch(sort_by_id)}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);