const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// stop server
// $ mongod
// $ npm run start:test
router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
