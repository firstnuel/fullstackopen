import { useState, useEffect, useRef } from 'react'
import AllBlogs from './components/AllBlogs'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState({message: "", success: false})
  const blogFormRef = useRef()

  const notify = (msg, stats) => {
    setStatus({message: msg, success: stats})
    setTimeout(() => setStatus({message: "", success: false}), 3000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll()
      .then(blogs => setBlogs(blogs));
    }
  }, [user]);

  const handleLogin = async (loginDetails) => {
    try{
      const user = await loginService.login(loginDetails)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
    } catch(exception){
      const errMsg = 'wrong username or password'
      notify(errMsg , false)
        console.error(exception)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateNew = async newBlog => {
    try{
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, true)
    } catch(error) {
      const errMsg = error.response.data.error
      notify(errMsg , false)
    }
  }

  const handleAddLikes = async blogToUpdate => {
    try{
      const updatedBlog = await blogService.update(blogToUpdate.id, 
        {...blogToUpdate,
        likes: blogToUpdate.likes + 1
      })
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      notify(`likes updated`, true)
      return (true)
    } catch (error) {
      const errMsg = 'could not update likes'
      notify(errMsg , false)
      return (false)
    }
  }

  const handleDelete = async blogToDelete => {
    if(window.confirm(`remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
    try{
      const deleteStatus = await blogService.deleteBlog(blogToDelete.id)
      if (deleteStatus === 204){
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        notify(`Blog deleted`, true)
      }
    } catch (error) {
      const errMsg = 'could not delete blog'
      notify(errMsg , false)
    }}
  }

  return (
    <div>
      {user ?
      <AllBlogs blogs = {blogs}
       user = {user}
       handleLogOut = {handleLogOut}
       handleCreateNew = {handleCreateNew} 
       message={status.message} 
       success={status.success}
       blogFormRef={blogFormRef}
       handleAddLikes={handleAddLikes}
       handleDelete={handleDelete}
      /> :
      <LoginForm handleLogin = {handleLogin}
       message={status.message} 
       success={status.success}
      />}
    </div>
  )
}

export default App