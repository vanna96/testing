import API from '../../libraries/API'

export const FETCH_ROAD = 'FETCH_ROAD'
export const FILTER_BY_PRICE = 'FILTER_BY_PRICE'
export const SLICE_ROADS = 'SLICE_ROADS'
export const GOGGLE_ACTIVE_ROAD = 'GOGGLE_ACTIVE_ROAD'


const  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export const fetch_roads = (dispatch) => {
    API.get('/roads?khan=120103').then(res => dispatch({type:FETCH_ROAD,payload:res.data.map(r => { 
        return ({...r, active:true, color: getRandomColor() ,mid:'',count:'',label:false})
    })}) )
}

export const filter_by_price_asc = {type:FILTER_BY_PRICE,payload:'asc'}
export const filter_by_price_desc = {type:FILTER_BY_PRICE,payload:'desc'}
export const slice_roads = {type:SLICE_ROADS,payload:'desc'}


export function toggle_road(index){
console.log("TCL: functiontoggle_road -> toggle_road", "toggle_road")
  
  return {
    type:GOGGLE_ACTIVE_ROAD,
    payload:index
  }
}