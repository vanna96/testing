import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import otherReducer from './reducers/otherReducer'
import roadReducer from './reducers/roadReducer'

const allReducers = combineReducers({user:userReducer,other:otherReducer,road:roadReducer})
const InitialStates = {
    user:{name:"Rony",list:[]},
    other:{name:'Por'},
    road:{roads:[]}
}

const middleware = [thunk]

const store =createStore(
    allReducers, 
    InitialStates,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
//
export default store