// Log exceptions and rejections in file / db/ and console.
process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION', ex.message)
    process.exit(1)
})

process.on('unhandledRejection', (ex) => {
  console.log('WE GOT AN UNHANDLED REJECTION', ex.message)
  process.exit(1)
})
// Logging
const startupDebugger = require('debug')('app:start') //export DEBUG=<namespace> comma separated, * for all, empty for none.

// Config
require('./startup/config')()

// Express
const express = require('express')
const app = express()
require('./startup/routes')(app) // Adds routes and some middleware. 

//DB
require('./startup/db')()

// Define the port with environment variables: export PORT=<your port number>
const port = process.env.PORT || 3000
app.listen(port, () => {
    startupDebugger(`Listening on port ${port}`)
})


