
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs.lenght === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.lenght === 0
    ? {}
    : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, blogs[0].likes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  else {
    let blogCounts = blogs.reduce((blogCount, blog) => {
      blogCount[blog.author] = (blogCount[blog.author] || 0) + 1
      return blogCount
    }, {})
    let maxBlogs = Math.max(...Object.values(blogCounts))
    let mostFrequent = Object.keys(blogCounts).filter(author => blogCounts[author] === maxBlogs)
    return {
      author: mostFrequent[0],
      blogs: maxBlogs
    }
  }

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  else {
    let likesCounts = blogs.reduce((likesCount, blog) => {
      likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
      return likesCount
    }, {})
    let maxLikes = Math.max(...Object.values(likesCounts))
    let maxLikesAuthor = Object.keys(likesCounts).filter(author => likesCounts[author] === maxLikes)
    return {
      author: maxLikesAuthor[0],
      likes: maxLikes
    }
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}