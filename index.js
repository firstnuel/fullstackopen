const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

require('dotenv').config()

// const persons = []
const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/info', (req, res) => {
  const d = new Date()
  Person.find({}).then(persons => {
    res.send(`<h3>Phonebook has info for ${persons.length} people<br><br>${d}</h3>`)
  } )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }
  )}
)

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      console.log(person)
      if (person) {
        res.json(person)
      }else {
        res.status(404).send('person not found') }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// const getRandomId = () => {
//     const maxId = persons.length > 0? Math.max(...persons.map(p => Number(p.id))): 0
//     let randomId =  Math.random() * (20 - (maxId + 1)) + (maxId + 1)
//     return String(Math.floor(randomId))
//   }

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if((!body.name) || (!body.number)) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  Person.findOne({ name: body.name })
    .then(personExists => {
      if(personExists){
        return res.status(400).json({
          error: 'name must be unique'
        })
      }else{
        const newPerson = new Person ({
          name : body.name,
          number : body.number
        })
        newPerson.save().then(response =>
          res.json(response))
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const newPerson = {
    name : body.name,
    number : body.number
  }
  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
