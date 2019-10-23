const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, repsonse) => {
  const comments = await Comment.find({}).populate('blog')
  repsonse.json(comments)
})

commentsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const comment = new Comment({
      text: body.text,
      blog: body.blog
    })

    const savedComment = await comment.save()
    // blog.comment = blog.comments.concat(savedComment._id)
    // await blog.save()
    response.json(savedComment.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter
