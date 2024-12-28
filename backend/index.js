require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { initializeDB } = require('./db/connectDB')
const errorHandler = require('./middleware/errorHandler.middleware')
const routeNotFound = require('./middleware/routeNotFound.middleware')
const authRouter = require('./routes/auth.route')
const eventRouter = require('./routes/event.route')
const ticketRouter = require('./routes/ticket.route')

//middleware
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(bodyParser.json())

//connecting to data base
initializeDB()

app.get('/', (req, res) => {
  res.send('Hello, welcome to event management API')
})

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/events', eventRouter)
app.use('api/v1/ticket', ticketRouter)

//middleware
app.use(routeNotFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
