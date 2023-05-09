const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

  
blogRouter.post('/', middleware.userValidator, async (request, response) => {
  const body = request.body

  if(!body.likes){
    body.likes = 0
  }
  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)
  
  if (!request.token || !decodedToken.id){  
    return response.status(401).json({error: 'wrong token or missing token'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())

})


blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const userid = await User.findById(decodedToken.id)
   
  if ( blog.user._id.toString() === userid._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'wrong user'})
  }

})


blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  if (!body.likes) {
    body.likes = 0
  }

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogToUpdate = await Blog.findById(request.params.id)

  if (blogToUpdate.user._id.toString() != user._id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(updatedBlog.toJSON())
})
  
module.exports = blogRouter