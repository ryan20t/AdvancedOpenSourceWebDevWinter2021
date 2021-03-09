var mongoose = require('mongoose')
var debug = require('debug')('demo:mongo')
//var dbURI = 'mongodb://localhost/WebAppUsers'
var dbURI = 'mongodb+srv://ryan:ryan123@cluster0.jsiit.mongodb.net/newUsers?retryWrites=true&w=majority'


 if(process.env.NODE_ENV === 'production'){
    dbURI = dbURI
 }

mongoose.connect(dbURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.Promise = Promise

mongoose.connection.on('connected', function(){
    debug("Mongoose connected to " + dbURI)
})

mongoose.connection.on('error', function(err){
    debug('Mongoose connection error' + err)
    process.exit(0)
})

mongoose.connection.on('disconnected', function(){
    debug('Mongoose disconnected')
    
})

process.on('exit', function(code){
    debug("About to exit with code: ", code)
})

