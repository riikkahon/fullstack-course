const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Get blogs information', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password'
      
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
    console.log(result.body)
  })


  test('get blogs', async () => {
    const response = await api.get('/api/blogs')

    await api
      .get('/api/blogs')
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('there are two blogtexts', async () => {
    const response = await api.get('/api/blogs')
      .set(headers)

    expect(response.body).toHaveLength(2)
  
  })


  test('id matches', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
  })

})

describe('Added blogtext', () => {
  let headers

  beforeEach(async () => {

    const newUser = {
      username: 'root2',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

   
    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
    

  })

  test('new blogtext added', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'R. H.',
      url: 'blogs.fi',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Test title'

    )
  })

  test('blog without likes will have 0 likes', async () => {
    const newBlog = {
      title: 'Title of blog with no likes',
      author: 'Maija M.',
      url: 'blogit.fi',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    
    const blogs = await helper.blogsInDb()
  
    const blog = await blogs.find(b => b.title === 'Title of blog with no likes')
    expect(blog.likes).toBe(0)
    
  })

  test('blog without title or url will have response 400 Bad Request', async () => {
    const newBlog = {
      author: 'R. H.',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      
    const blogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(helper.initialBlogs.length)

  })
})


describe('Delete and update blogtext', () => {
  let headers

  beforeEach(async () => {

    const newUser = {
      username: 'root3',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

   
    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
    

  })

  test('a blog is deleted succesfully with statuscode 204', async () => {

    const newBlog = {
      title: 'This needs to be deleted',
      author: 'Mr. Delete',
      url: 'deleteme.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    
  })


})


describe('Delete and update blogtext', () => {
  let headers

  beforeEach(async () => {

    const newUser = {
      username: 'root2',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

   
    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
    

  })

  test('a blog is updated succesfully', async () => {

    const newBlog = {
      title: 'Update this title',
      author: 'R. H.',
      url: 'blogs.fi',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[2]
 
    const updatedBlog = {
      ...blogToUpdate,
      likes: 8
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const blogs = await helper.blogsInDb()
  
    const blog = await blogs.find(b => b.likes === 8)
    expect(blog.likes).toBe(8)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})