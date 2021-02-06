/** PATH MODULE */
const path = require('path')

var pathObj = path.parse(__filename)
console.log(pathObj)

/** OS MODULE */
const os = require('os');

var totalMemory = os.totalmem()
var freeMemory = os.freemem()

//log info
console.log('Total Memory: ' + totalMemory)
//ES6 Template string to simplify string building
console.log(`Free Memory: ${freeMemory}`)

/** FILE SYSTEM MODULE */
const fs = require('fs')

//const files = fs.readdirSync('./')
//log(files)

/** Asynchronous functions always take a callback function as their last argument, in this case the readdir() function will either return an error or an object of results hence the arguments in the callback. Either the error or object will be null depending on success of the function */
fs.readdir('./', function(err, files){
    //check if there is an error
    if (err){
        console.log('Error: ', err)
    }
    else{
        console.log('Result: ', files)
    }
})

/**
 * LOGGER MODULE - Logger class extending EventEmitter
 */
const Logger = require('./logger')
const logger = new Logger()

/** EVENTS */
//const EventEmitter = require('events')
//capital letters because EventEmitter is a class
//need to instantiate the class as an object
//const emitter = new EventEmitter() //not needed once we build a class

//register a listener
//The function doesn't need to take an argument but if you are using event arguments when emitting you will need one to capture the object passed in (in this case arg captures {id: 1, url: 'http://'} from the secone emit below)
logger.on('messageLogged', (arg) =>{ //convention stated arg, or e, or eventArg
    console.log('Listener called', arg)
})
logger.log('message')
//emitter.emit() used to raise an event
//This will trigger the listener and its callback when used

//emitter.emit('messageLogged')

//can raise additional arguments when emitting an event
//emitter.emit('messageLogged', {id: 1, url: 'http://'})
//the object is the event argument


const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.write('Hello World')
        res.end()
    }

    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
})
//the server is also an instance of the event emitter so you can use it to create event listeners or to emit events

//this would respond when a browser connects to the server
server.on('connection', (socket) => {
    //console.log('New connection')
})

server.listen(3000, () => {
    console.log('Listening on port 3000')
})
