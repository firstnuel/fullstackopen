import { useSelector, useDispatch } from "react-redux"
import { logOut } from "../reducers/userReducer"
import Blog from "./Blog"
import Notification from "./Notification"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const AllBlogs = ({ blogFormRef }) => {

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>{user.name} logged in <button
            onClick={handleLogOut}>logout</button></p>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm ref={blogFormRef}/>
            </Togglable>
            {[...blogs]
                .sort((a,b) => b.likes - a.likes)
                .map(blog =>
                <Blog key={blog.id} blog={blog}
                user={user}/>)
            }
        </div>
    )
}

export default AllBlogs