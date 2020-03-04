module.exports = function(app) {
const express = require('express')
const helmet = require('helmet')
const error = require('../middleware/error')
// Routes
const auth = require('../routes/auth')
const users = require('../routes/users')
const notes = require('../routes/notes')
// Allows for json parsing in the request body. Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // converts urlencoded to json in req.body
app.use(express.static('public')) // Static assets in this folder, localhost:port/<filename>
// HTTP Header Security
app.use(helmet()) 
// Use routes 
app.use('/api/auth/', auth)
app.use('/api/users/', users)
app.use('/api/notes/', notes)
// Errors Middleware
app.use(error)
}