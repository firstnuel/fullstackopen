import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogsReducer'

const BlogForm = ({ ref }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const clear = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleBlogTitle = event => setBlogTitle(event.target.value)
  const handleBlogAuthor = event => setBlogAuthor(event.target.value)
  const handleBlogUrl = event => setBlogUrl(event.target.value)

  const dispatch = useDispatch()

  const handleCreateNew = async event => {
    event.preventDefault()
    const newBlog = {
      title : blogTitle,
      author : blogAuthor,
      url : blogUrl,
    }
    dispatch(createNew(newBlog))
    ref.current.toggleVisibility()
    clear()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
            title:
          <input
            value={blogTitle}
            type="text"
            onChange={handleBlogTitle}
            aria-label="title"
            name="title"
            data-testid="title"
            required>
          </input>
        </div>
        <div>
            author:
          <input
            value={blogAuthor}
            type="text"
            onChange={handleBlogAuthor}
            name="author"
            aria-label="author"
            data-testid="author"
            required>
          </input>
        </div>
        <div>
            url:
          <input
            value={blogUrl}
            type="text"
            onChange={handleBlogUrl}
            aria-label="url"
            data-testid="url"
            name="url"
            required>
          </input>
        </div>
        <button type="create">create</button>
      </form>
    </>
  )}


// BlogForm.propTypes = {
//   handleCreateNew: PropTypes.func.isRequired,
// }
export default BlogForm