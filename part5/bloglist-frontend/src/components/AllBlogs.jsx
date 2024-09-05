import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"

const AllBlogs = ({ blogs, user, handleLogOut,
    createNew, blogTitle, handleBlogTitle, blogAuthor, 
    handleBlogAuthor, blogUrl, handleBlogUrl, message, success
    }) => (
        <div>
        <h2>blogs</h2>
        <Notification 
        message={message}
        success={success} />
        <p>{user.name} logged in <button 
        onClick={handleLogOut}>logout</button></p>
        <BlogForm 
        createNew={createNew}
        blogTitle={blogTitle}
        handleBlogTitle={handleBlogTitle}
        blogAuthor={blogAuthor}
        handleBlogAuthor={handleBlogAuthor}
        blogUrl={blogUrl}
        handleBlogUrl={handleBlogUrl}/>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

export default AllBlogs
