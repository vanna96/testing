import arraySort from 'array-sort';
import {
    SEARCH_ROAD,
    TOGGLE_ROAD,
    FILTER_ROAD,
    FILTER_GET_TOP,
    FILTER_DISTANCE
 } from '../actions/filterRoadAction';

const filterRoadReducer = (state={}, {type,payload}) => {
    switch(type){        
        case SEARCH_ROAD:
            return { ...state, roads: payload, newRoads: payload}
        case FILTER_ROAD:
            const arr = (payload==='ASC') ? arraySort(state.newRoads.slice(),'minimum_price'): arraySort(state.newRoads.slice(),'maximum_price', {reverse: true});            
            return { ...state, roads: arr, newRoads: arr}
        case FILTER_GET_TOP:
                return { ...state, roads: state.newRoads.slice(0, payload) }
        case FILTER_DISTANCE:
            const arrDis = (payload==='ASC') ? arraySort(state.newRoads.slice(),'distance'): arraySort(state.newRoads.slice(),'distance', {reverse: true});            
            return { ...state, roads: arrDis, newRoads: arrDis}
        case TOGGLE_ROAD:
            const arrRoadActive = state.roads.slice();
            arrRoadActive[payload].active = !arrRoadActive[payload].active;
            return { ...state, roads: arrRoadActive }
        default:
            return state
    }
}

export default filterRoadReducer