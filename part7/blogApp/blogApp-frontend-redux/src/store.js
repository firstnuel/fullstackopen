import { configureStore } from "@reduxjs/toolkit"
import blogsReducer from "./reducers/blogsReducer"
import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"

const store = configureStore({
    reducer : {
        blogs : blogsReducer,
        user : userReducer,
        notification : notificationReducer
    }
})

export default store