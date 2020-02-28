const config = require('config')
const helmet = require('helmet')
const startupDebugger = require('debug')('app:start') //export DEBUG=<namespace> comma separated, * for all, empty for none.
const dbDebugger = require('debug')('app:db')
// Routes
const users = require('./routes/users')
const auth = require('./routes/auth')
// Express
const express = require('express')
const app = express()
// Mongoose
const mongoose = require('mongoose')
// Allows for json parsing in the request body. Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // converts urlencoded to json in req.body
app.use(express.static('public')) // Static assets in this folder, localhost:port/<filename>
// HTTP Header Security
app.use(helmet()) 
// Use routes 
app.use('/api/users/', users)
app.use('/api/auth/', auth)

checkConfigSetup()

// Database
mongoose.connect(`mongodb://localhost/${config.get('db_name')}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => dbDebugger("Connected to MongoDB..."))
  .catch(() => dbDebugger("Could not connect to MongoDB..."));

// Define the port with environment variables: export PORT=<your port number>
const port = process.env.PORT || 3000
app.listen(port, () => {
    startupDebugger(`Listening on port ${port}`)
})

function checkConfigSetup() {
    // jwtPrivateKey: export db_name=<your db name here>
    startupDebugger(`db_name: ${config.get('db_name')}`)
    if (!config.get('db_name')) {
        console.log('FATAL ERROR: db_name not defined... Exiting...')
        process.exit(1)
    }
    // jwtPrivateKey: export <app name>_jwtPrivateKey=<your key here>
    startupDebugger(`jwtPrivateKey: ${config.get('jwtPrivateKey')}`)
    if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined... Exiting...')
    process.exit(1)
    }
}
