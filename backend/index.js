require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const helmet = require('helmet')
const { initializeDB } = require('./db/connectDB')
const errorHandler = require('./middleware/errorHandler.middleware')
const routeNotFound = require('./middleware/routeNotFound.middleware')
const authRouter = require('./routes/auth.route')
const eventRouter = require('./routes/event.route')


app.use(cors())
app.use(helmet())
app.use(express.json())

initializeDB()

app.get('/', (req, res) => {
  res.send('Hello, welcome to event management API')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/events', eventRouter)

//middleware
app.use(routeNotFound)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
