import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('blank')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async ({ username, password }) => {
    const user = await loginService.login({
      username, password,
    })

    if (user) {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    }
    else {
      setMessage("wrong username or password")
      setType("error")
      setTimeout(() => {
        setMessage('')
        setType('blank')
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleAddBlog = async (blog) => {
    console.log(blog)
    const newBlog = await blogService.create(blog, user.token)
    console.log(newBlog)
    if (!newBlog) {
      setMessage("Error when adding the blog")
      setType("error")
      setTimeout(() => {
        setMessage('')
        setType('blank')
      }, 5000)
      return
    }
    else {
      setBlogs(blogs.concat(newBlog))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setType("success")
      setTimeout(() => {
        setMessage('')
        setType('blank')
      }, 5000)
    }
  }

  const onLikeClicked = (blog) => {
    const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

    blogService.update(blog.id, updatedBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
      )
    })
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={message} type={type} />
        <LoginForm onSubmit={handleLogin} />
      </div>
    )
  }

  blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={type} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <BlogForm onSubmit={handleAddBlog} />
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={onLikeClicked} />
      )}
    </div>
  )
}

export default App