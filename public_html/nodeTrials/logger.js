const EventEmitter = require('events')

class Logger extends EventEmitter {
    //function inside a class doesn't need the function keyword, it is now a method of the class
    log(message){
        console.log(message)
        //Raise an event
        this.emit('messageLogged', {data: message})
    }
}



//to access these from the app.js module we need to export it to the public scope

//module.exports.log = log //(this will export log as an object to the modules exports)

module.exports = Logger; //This will export it as a function
//or as a class if that is how you designed it

//module.exports.endPoint = url //(can export the URL variable as well)

