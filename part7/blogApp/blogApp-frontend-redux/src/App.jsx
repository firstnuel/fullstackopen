import AllBlogs from "./components/AllBlogs"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAndSetUser } from "./reducers/userReducer"
import { initializeBlogs } from "./reducers/blogsReducer"
import LoginForm from "./components/LoginForm"


function App() {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchAndSetUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [user])

  return (
    <>
    {user? <AllBlogs blogFormRef={blogFormRef}/> : <LoginForm /> }
    </>
  )
}

export default App
