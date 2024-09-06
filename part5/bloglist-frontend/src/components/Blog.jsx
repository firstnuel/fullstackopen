import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user,  handleAddLikes, handleDelete }) => {
  const[view, setView] = useState(false)
  const[likes, setLikes] = useState(blog.likes)
  const handleView = () => setView(!view)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => { if (await handleAddLikes(blog)) setLikes(likes+1)}
  const deleteBlog = async () => await handleDelete(blog)

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleView}>
          {view? 'hide' : 'show'}</button>
      </div>
      {view && <div>
        <div>{blog.url}</div>
        <div>likes {likes}  <button onClick={addLike}>
        like</button></div>
        <div>{blog.author}</div>
        {blog.user !== user.id? <div><button style={{ backgroundColor:'red' }}
          onClick={deleteBlog}
        >remove</button></div> : null}
      </div>}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleAddLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog