import { useState } from 'react'


const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }



  return(
    <form onSubmit={addBlog}>
      <div>
          title
        <input
          type="text"
          id='title'
          value={newTitle}
          name="Title"
          aria-label="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
          author
        <input
          type="text"
          id='author'
          value={newAuthor}
          name="Author"
          aria-label="author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
            url
        <input
          type="text"
          id='url'
          value={newUrl}
          name="Url"
          aria-label="url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}


export default BlogForm