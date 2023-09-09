import { createSlice } from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
    name: "notification",
    initialState: {message: null},
    reducers: {
        createNotification(state, action){
            state.message = action.payload
        },
        clearNotification(state){
            state.message = null

        }
    }
})

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(createNotification(notification))

        setTimeout(() => {
            dispatch(clearNotification());
          }, time * 500)
    }
}

export const { createNotification, clearNotification } = notificationSlicer.actions
export default notificationSlicer.reducer