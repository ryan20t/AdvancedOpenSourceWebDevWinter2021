var mongoose = require('mongoose')
var debug = require('debug')('demo:mongo')
var dbURI = 'mongodb://localhost/Reviews'

if (process.env.NODE_ENV === 'production'){
    dbURL = process.env.MONGOLAB_URI
}

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
    debug("Mongoose connected to " + dbURI)
})

mongoose.connection.on('error', (err) => {
    debug("Mongoose connection error " + err)
    process.exit(0)
})

mongoose.connection.on('disconnected', () => {
    debug('Mongoose disconnected')
})

process.on('exit', (code) => {
    debug("Mongoose terminated with exit code " + code)
})