import {UPDATE_USER, FETCH_USER,SORT_BY_ID } from '../actions/userActions'

const userReducer = (state={}, {type,payload}) => {
    switch(type){
        case UPDATE_USER:
            return {...state,name:payload}
        case FETCH_USER:
            return {...state,list:payload}
        case SORT_BY_ID:
            let arr = state.list.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1)
            return {...state,list:arr}
        default:
            return state
    }
}

export default userReducer