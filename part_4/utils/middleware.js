const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({
      error: `expected ${request.body.username} to be unique`
    })
  }
  if (error.name === 'ValidationError' && error.message.includes('username')) {
    return response.status(400).json({ error: "username must be at least 3 characters long" })
  }
}

module.exports ={
  errorHandler
}