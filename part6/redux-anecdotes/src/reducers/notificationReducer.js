import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, action) {
            return action.payload
        },
        rmNotification() {
            return ''
        }
    }
})

export const setNotification = (content, time) => {
    return (dispatch) => {
        dispatch(notify(content))
        setTimeout(() => {
            dispatch(rmNotification())
        }, time)
    }
}

export const { notify, rmNotification } = notificationSlice.actions
export default notificationSlice.reducer
