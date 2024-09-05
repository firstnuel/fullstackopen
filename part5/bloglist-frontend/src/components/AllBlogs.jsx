import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"
import Togglable from "./Togglable"

const AllBlogs = ({ blogs, user, handleLogOut, message,
   success, handleCreateNew, blogFormRef,
    handleAddLikes , handleDelete}) => {

  return (
        <div>
        <h2>blogs</h2>
        <Notification 
        message={message}
        success={success} />
        <p>{user.name} logged in <button 
        onClick={handleLogOut}>logout</button></p>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm handleCreateNew={handleCreateNew}/>
        </Togglable>
        {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} 
          handleAddLikes={handleAddLikes} 
          user={user}
          handleDelete={handleDelete}/>
        )}
      </div>
    )}

export default AllBlogs
