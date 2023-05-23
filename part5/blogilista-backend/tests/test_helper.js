const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First Blog text',
    author: 'Riikka H.',
    url: 'blogit.fi',
    likes: 3
  },
  {
    title: 'Second Blog text',
    author: 'Maija M.',
    url: 'blogit.fi',
    likes: 4
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}   

const usersInDb = async () => {
  const users =  await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb,
}