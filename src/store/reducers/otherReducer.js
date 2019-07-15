const otherReducer = (state={}, {type,payload}) => {
    switch(type){
        case 'UPDATE_OTHER':
            return {name:payload}
        default:
            return state
    }
}

export default otherReducer