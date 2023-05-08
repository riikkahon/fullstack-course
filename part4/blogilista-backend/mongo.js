const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://honkanenriikka:${password}@cluster.xbc8hyx.mongodb.net/testBlogilista?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: process.argv[3],
  author: process.argv[4],
  url: process.argv[5],
  likes: process.argv[6]
})

if(!process.argv[3] && !process.argv[4] && !process.argv[5] && !process.argv[6]){
  console.log('blogs:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog.title + ' by ' + blog.author + ' ' + blog.id)
    })
    mongoose.connection.close()
  })
}

/*else{
  blog.save().then(result => {
    console.log(`added ${blog.title} blogtext of ${blog.author} to bloglist with ${blog.likes} likes!`)
    mongoose.connection.close()
  })
}*/