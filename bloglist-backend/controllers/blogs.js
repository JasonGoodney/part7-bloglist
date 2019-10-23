const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      const comments = blog.toJSON().comments
      if (comments) {
        response.json(comments)
      }
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    console.log('decoded token', request.decodedToken)
    const user = await User.findById(request.decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id/comments', async (request, response, next) => {
  const body = request.body
  debugger
  console.log('comment', body)
  console.log('blog id', request.params.id)

  const comment = new Comment({
    text: body.text
  })

  try {
    let updatedComments
    let blog = await Blog.findById(request.params.id)
    blog = blog.toJSON()
    console.log('blog', blog)
    if (blog.comments) {
      updatedComments = { ...blog, comments: blog.comments.concat(comment) }
    } else {
      updatedComments = { ...blog, comments: [comment] }
    }
    console.log('blog comments', updatedComments.comments)
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedComments,
      {
        new: true
      }
    )
    console.log('updated blog', updatedBlog)
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    console.log('params', request.decodedToken)
    console.log('blog', blog)

    if (blog.user.toString() === request.decodedToken.id) {
      console.log('DELETING')
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  } catch (exception) {
    console.log('blog user and user id do not match')
    next(exception)
  }
})

module.exports = blogsRouter
