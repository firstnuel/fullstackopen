const BlogForm = ({createNew, blogTitle, handleBlogTitle, blogAuthor, handleBlogAuthor, blogUrl, handleBlogUrl}) => (
    <>
    <h2>create new</h2>
    <form onSubmit={createNew}>
        <div>
            title: 
            <input
            value={blogTitle}
            type="text"
            onChange={handleBlogTitle}
            name="title">
            </input>
        </div>
        <div>
            author:
            <input
            value={blogAuthor}
            type="text"
            onChange={handleBlogAuthor}
            name="author">
            </input>
        </div>
        <div>
            url:
            <input
            value={blogUrl}
            type="text"
            onChange={handleBlogUrl}
            name="url"></input>
        </div>
        <button type="create">create</button>
    </form>
    </>
)

export default BlogForm