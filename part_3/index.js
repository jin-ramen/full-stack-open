require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// list of all persons' details
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// look at information of the phonebook
app.get('/info', (request, response) => {
  Person.countDocuments()
    .then(count => {
      // Build the HTML string
      const info = `
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `
      // Send it as the response
      response.send(info)
    })
})


// look at a specific person details
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) { response.json(person) }
      else { response.status(404).end() }
    })
    .catch(error => next(error))
})

// delete a person details
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {response.status(204).end()})
    .catch(error => next(error))
})

// add a person person details
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  const person = new Person({ name, number })

  person.save()
    .then(savedPerson => {response.json(savedPerson)})
    .catch(error => next(error))
})

// change the number of the person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).json({ error: 'Person not found' })
      }
      person.name = name
      person.number = number

      return person.save()
        .then((updatedPerson) => response.json(updatedPerson))
        .catch(error => next(error))
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})