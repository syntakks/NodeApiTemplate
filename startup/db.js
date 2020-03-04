module.exports = function() {
const config = require('config')
const dbDebugger = require('debug')('app:db')
// Mongoose
const mongoose = require('mongoose')
// Database
mongoose.connect(`mongodb://localhost/${config.get('db_name')}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
    .then(() => dbDebugger("Connected to MongoDB..."))
    .catch(() => dbDebugger("Could not connect to MongoDB..."));
}