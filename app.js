const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const server = express()
server.use(express.json({ extended: true }))
server.use('/api/auth', require('./routes/auth.routes'))
server.use('/api/notes', require('./routes/notes.routes'))

const PORT = config.get('port') || 5000

async function start() {  
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    server.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    )
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
