//Joi for input validation, returns a class so capitalize
const Joi = require('joi')
//require express and instantiate express object into app const
const express = require('express')
const app = express()

//This line is required to parse JSON in the body of a request
//It basically tells the app to use the express.JSON middleware
app.use(express.json())

const courses = [
    {id: 1, name: 'Course 1'},
    {id: 2, name: 'Course 2'},
    {id: 3, name: 'Course 3'}
]

//The app object has a bunch of useful methods, the following being useful for defining routes rather than using a big if block with the HTTP server creation method
//app.get()
//app.post()
//app.put()
//app.delete()

//We will use app.get
//Takes two arguments, it's a path and a callback funtion with req and res, also called a 'Route Handler'
app.get('/', (req, res) => {
    //req has a bunch of useful properties which can be explored more in the express documentation
    res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
    //normally you would retreive a list of courses from the database and return them, but we'll just do an array of numbers
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    //handle route
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){ // 404 (not found)
        res.status(404).send('Course not found')
    }
    res.send(course)
})

//can use multiple parameters
// '/api/posts/:year/:month' to get all the posts for a given month of a given year
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query)
})

//POST REQUESTS
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body) //gets result.error
    if (error){
        //400 = bad request
        return res.status(400).send(error.details[0].message)
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

//PUT requests
app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){ // 404 (not found)
        return res.status(404).send('Course not found')
    }

    //otherwise, validate
    //if invalid, return 400 - bad request
    
    //using object destructuring (new in JS)
    const { error } = validateCourse(req.body) //gets result.error
    if (error){
        //400 = bad request
        return res.status(400).send(error.details[0].message)
    }

    //if valid, update course
    course.name = req.body.name
    //return updated course
    res.send(course)
})

//DELETE request
app.delete('/api/courses/:id', (req, res) => {
    //look up course
    //if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){ // 404 (not found)
        return res.status(404).send('Course not found')
    }

    //delete
    const index = courses.indexOf(course)
    courses.splice(index, 1) //go to index and remove 1

    //return the same course
    res.send(course)
})

//With express, the app replaces all of the HTTP module requirements to set up a web server so you can listen like this:

//env variable on host server for PORT to replace hard coding the port
//the following variable will use the set environmental port value OR 3000 if that is not set, uses the global 'process'
const port = process.env.PORT || 3000

//On a mac you can run :export PORT=3000 to set the env variable
//use :set on Windows
//Do this for your server when hosting proper
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}