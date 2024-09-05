import { useState } from "react"

const BlogForm = ({ handleCreateNew }) => {

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

    const createNew = async event => {
        event.preventDefault()
        await handleCreateNew({
            title : blogTitle,
            author : blogAuthor,
            url : blogUrl,
        })
        clear()
    }
    
    return (
    <>
    <h2>create new</h2>
    <form onSubmit={createNew}>
        <div>
            title: 
            <input
            value={blogTitle}
            type="text"
            onChange={handleBlogTitle}
            name="title"
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
            required>
            </input>
        </div>
        <div>
            url:
            <input
            value={blogUrl}
            type="text"
            onChange={handleBlogUrl}
            name="url"
            required>
            </input>
        </div>
        <button type="create">create</button>
    </form>
    </>
)}

export default BlogForm