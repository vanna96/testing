import {
    SEARCH_ROAD,
    TOGGLE_ROAD
 } from '../actions/filterRoadAction'

const filterRoadReducer = (state={}, {type,payload}) => {
    switch(type){        
        case SEARCH_ROAD:
            return { ...state, roads: payload }
        case TOGGLE_ROAD:
            const arrRoadActive = state.roads.slice();
            arrRoadActive[payload].active = !arrRoadActive[payload].active;
            console.log(arrRoadActive);
            return { ...state, roads: arrRoadActive }
        default:
            return state
    }
}

export default filterRoadReducer