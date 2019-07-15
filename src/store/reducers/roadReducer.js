import arraySort from 'array-sort'

import {
    FETCH_ROAD, 
    FILTER_BY_PRICE, 
    SLICE_ROADS,
    GOGGLE_ACTIVE_ROAD
 } from '../actions/roadAction'

const roadReducer = (state={}, {type,payload}) => {
    switch(type){
        case FETCH_ROAD:
            return { ...state, roads: payload }
        case FILTER_BY_PRICE:
            const arr = (payload==='asc') ? arraySort(state.roads.slice(),'minimum_price'): arraySort(state.roads.slice(),'maximum_price', {reverse: true})
            return { ...state, roads: arr}
        case SLICE_ROADS:
            return { ...state, roads: state.roads.slice(0,5) }
        case GOGGLE_ACTIVE_ROAD:
            const arrRoadActive = state.roads.slice();
           console.log("TCL: roadReducer -> arrRoadActive", arrRoadActive[payload].active)
            arrRoadActive[payload].active = !arrRoadActive[payload].active
            return { ...state, roads: arrRoadActive }
       
            
        default:
            return state
    }
}

export default roadReducer