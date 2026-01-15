const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      logger.info(`Fetched ${blogs.length} blogs`)
      response.json(blogs)
    })
    .catch((error) => {
      logger.error(`Error fetching blogs: `. error.message)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter