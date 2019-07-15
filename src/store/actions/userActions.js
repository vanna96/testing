export const UPDATE_USER = 'UPDATE_USER'
export const FETCH_USER = 'FETCH_USER'
export const SORT_BY_ID = 'SORT_BY_ID'

export const fetch_user = (dispatch) => {
    fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(res => dispatch({type:FETCH_USER,payload:res.data}) )
}


export const sort_by_id = {type:SORT_BY_ID,payload:'Ojcloveu'}

const update_user = {type:UPDATE_USER,payload:'Ojcloveu'}
export default update_user