import { useState, useEffect } from 'react'
import AllBlogs from './components/AllBlogs'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [status, setStatus] = useState({message: "", success: false})

  const clear = () => {
    setUsername('')
    setPassword('')
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

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
  
  const handleName = event => setUsername(event.target.value)
  const handlePassword = event => setPassword(event.target.value)
  const handleBlogTitle = event => setBlogTitle(event.target.value)
  const handleBlogAuthor = event => setBlogAuthor(event.target.value)
  const handleBlogUrl = event => setBlogUrl(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password,})

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      clear()
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

  const handleCreateNew = async event => {
    event.preventDefault()
    const newBlog = {
      title : blogTitle,
      author : blogAuthor,
      url : blogUrl,
    }
    try{
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      clear()
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, true)
    } catch(error) {
      const errMsg = error.response.data.error
      notify(errMsg , false)
    }
  }

  return (
    <div>
      {user ? <AllBlogs blogs = {blogs}
       user = {user}
       handleLogOut = {handleLogOut}
       createNew = {handleCreateNew} 
       blogTitle = {blogTitle} 
       handleBlogTitle = {handleBlogTitle} 
       blogAuthor = {blogAuthor}
       handleBlogAuthor = {handleBlogAuthor} 
       blogUrl = {blogUrl} 
       handleBlogUrl = {handleBlogUrl}
       message={status.message} 
       success={status.success}
      /> :
      <LoginForm handleLogin = {handleLogin}
       username = {username}
       password = {password} 
       handlePassword = {handlePassword}
       handleName = {handleName}
       message={status.message} 
       success={status.success}
      />}
    </div>
  )
}

export default App