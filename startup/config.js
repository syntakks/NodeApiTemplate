module.exports = function() {
    const config = require('config')
    const startupDebugger = require('debug')('app:start') //export DEBUG=<namespace> comma separated, * for all, empty for none.
    checkConfigSetup()

    
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
}