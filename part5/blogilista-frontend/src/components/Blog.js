import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, handleDelete }) => {

  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? 'none' : '' }
  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      id: blog.id,
      likes: likes + 1,
    }
    setLikes(likes + 1)
    updateBlog(updatedBlog)

  }

  const removeBlog = () => handleDelete(blog.id, blog)

  return(
    <div className="blog" style={blogStyle}>
      <div style ={showWhenVisible}>
        {blog.title} {blog.author} <button id={`${blog.title}-view`} onClick={toggleVisibility}>view</button>
      </div>
      <div style={hideWhenVisible}>
        <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>url: {blog.url}</p>
        <p>user: {blog.user.name}</p>
        <p>likes: {likes}<button id={`${blog.title}-like`} onClick={handleLikes}>like</button></p>
        <div>
          {user.name === blog.user.name ? (
            <p><button onClick={removeBlog}>remove</button></p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}


export default Blog