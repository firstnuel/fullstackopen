const filterReducer = (state='ALL', action) => {

    switch('SET_FILTER'){
        case (action.type): 
            return action.payload
        default: 
            return state
    }
}

export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  
export const removeFilter = () => {
    return {
      type: 'ALL'
    }
  }
export default filterReducer