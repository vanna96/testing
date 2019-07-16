import API from '../../libraries/API';

export const SEARCH_ROAD = 'SEARCH_ROAD';
export const TOGGLE_ROAD = 'TOGGLE_ROAD';

const  getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const search_roads = data => {
    return (dispatch) => {
        return API.get('/roads', { params: data})
          .then(response => {
            dispatch(fetchRoadSuccess(response.data.data))
          })
          .catch(error => {
            //  throw(error);
          });
    };
};
 
export const fetchRoadSuccess =  (data) => {
   return {
     type: SEARCH_ROAD,
     payload: data.map(r => ({...r, active:true, color:getRandomColor() ,mid:'',count:'',label:false}))
   }
};

export function toggle_road(index){ 
    return {
        type:TOGGLE_ROAD,
        payload:index
    }
}