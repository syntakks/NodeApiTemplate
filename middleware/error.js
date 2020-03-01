const {logger} = require('../logger')

module.exports = function(err, req, res, next) {
    // Log the exception 
    logger.log({
        level: 'error',
        message: err.message,

      });
    res.status(500).send('Something Failed...')
}

// Log Levels: 
// error
// warn
// info
// verbose
// debug
// silly