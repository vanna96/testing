import API from '../../libraries/API';

export const SEARCH_ROAD = 'SEARCH_ROAD';
export const TOGGLE_ROAD = 'TOGGLE_ROAD';
export const UPDATE_ROAD = 'UPDATE_ROAD';
export const FILTER_ROAD = 'FILTER_ROAD';
export const FILTER_GET_TOP = 'FILTER_GET_TOP';
export const FILTER_DISTANCE = 'FILTER_DISTANCE';
export const LOGIN = 'LOGIN';


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
             throw(error);
          });
    };
};
 
export const fetchRoadSuccess =  (data) => {
   return {
     type: SEARCH_ROAD,
     payload: data.map(r => ({...r, active:true, color:getRandomColor() ,mid:'',count:'',label:false}))
   }
};

export const toggle_road = (index) => { 
    return {
        type:TOGGLE_ROAD,
        payload:index
    }
}

export const update_road = (data) => {
  API.put(`/roads/${data.id}`,data).then();
  return {
      type:UPDATE_ROAD,
      payload:data
  }
}

export const filter_roads = (data) => {
    return {
        type:FILTER_ROAD,
        payload:data
    }
}

export const filter_distance = (data) => {
    return {
        type:FILTER_DISTANCE,
        payload:data
    }   
}

export const filter_getTop = (data) => {
    return {
        type:FILTER_GET_TOP,
        payload:data
    }  
}

export const Login = (data) => {    
    return () => {
        return API.post('/login', data).then(response => {
            const authentication = response.data.token_type +' '+ response.data.access_token
            localStorage.setItem('auth', authentication);
        })
        .catch(error => {
            throw(error)
        });
    }; 
}

export const register = (data) => {
    return () => {
        return API.post('/register', data).then(response => {
            console.log(response);
        })
        .catch(error => {
            throw(error);
        });
    }
}

export const reset = (data) => {
    return () => {
        return API.post('/user/reset-password', data).then(response => {
            console.log(response);
        })
        .catch(error => {
            throw(error);
        });
    }
}

export const changePassword = (data) => {
    var headers = {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('auth') 
    }
    return () => {
        return API.post('/user/change-password',data,{
            headers: headers
        }
        ).then(response => {
            return response;
        })
        .catch(error => {
            throw(error);
        });
    }
}