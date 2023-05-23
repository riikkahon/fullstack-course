import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)




  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const blogFormRef = useRef()

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {

    try{
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setMessage(`New blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception){
      setMessage('error occured')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const updateBlog = async (blogObject) => {


    try {
      await blogService.update(blogObject.id, blogObject)
    } catch (exception) {
      setMessage('error occured')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleDelete = async (id, blogObject) => {

    if (window.confirm(`Delete ${blogObject.title} ?`)) {
      blogService
        .deleteBlog(id)
      console.log(`${blogObject.title} successfully deleted`)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setMessage(`${blogObject.title} was deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const LikesOrder = (a, b) => b.likes - a.likes


  if(user === null)
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message}/>
        <h2>Log in to application</h2>
        <Togglable buttonLabel="log in">
          <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername}/>
        </Togglable>

      </div>
    )
  return(
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Notification message={message} />
      <h1>create new blog</h1>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      {blogs.sort(LikesOrder).map((blog) =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} handleDelete={handleDelete}/>)}
    </div>
  )
}


export default App