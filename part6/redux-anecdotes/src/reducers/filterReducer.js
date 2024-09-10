import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name : "filter",
  initialState : 'ALL',
  reducers : {
    filterChange(state, action) {
      console.log(action.payload)
      return action.payload
    },
    removeFilter () {
      return 'ALL'
    }
  }
})


export const { filterChange, removeFilter} = filterSlice.actions
export default filterSlice.reducer