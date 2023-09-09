import { createSlice } from '@reduxjs/toolkit'

  const filterSlicer = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
  })


  export const { filterChange } = filterSlicer.actions
  export default filterSlicer.reducer
