import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import { addLike, removeBlog } from "../reducers/blogsReducer"

const Blog = ({ blog, user }) => {
    const[view, setView] = useState(false)
    // const[likes, setLikes] = useState(blog.likes)
    const handleView = () => setView(!view)

    const dispatch = useDispatch()


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    const handleLikes = () => {
        dispatch(addLike(blog))
    }
    const handleDelete = () => {
      if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)) dispatch(removeBlog(blog))
    }

    return (
        <div style={blogStyle} className='blog' data-testid="blog">
      <div>
        {blog.title} {blog.author} <button onClick={handleView}>
          {view? 'hide' : 'show'}</button>
      </div>
      {view && <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}  <button onClick={handleLikes}>like</button></div>
        <div>{blog.author}</div>
        {blog.user === user.id && <div><button style={{ backgroundColor:'red' }}
          onClick={handleDelete}
        >remove</button></div>}
      </div>}
    </div>
    )
}

export default Blog