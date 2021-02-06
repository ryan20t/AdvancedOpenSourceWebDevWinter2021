var express = require('express')
var mongoose = require('mongoose')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

//Set up middleware to use in app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

//Connect to MongoDB database using mongoose
//db name = Empl
mongoose.connect('mongodb://localhost:27017/Empl',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to database")
}).catch(function(err){
    console.log(err)
})

//Load in Database Templates or Schema (models)
require('./models/Employee')
//variable for reference to model
var Employee = mongoose.model('Employee')

//Set up routes to retreive data
app.post('/saveEmployee', function(req, res){
    console.log("A request was made")
    console.log(req.body)

    new Employee(req.body).save().then(function(){
        console.log("Data saved")
        res.redirect('view.html')
    })
})

//IF SOMETHING DOESN'T WORK TRY CAPITAL E
app.get('/getData', function(req, res){
    Employee.find({}).then(function(employee){
        res.json({employee})
    })
})

app.post('/redirectToDelete', function(req, res){
    console.log(req.body)
    res.redirect('delete.html?id=' + req.body._id)
    //res.send('delete.html')
})

app.get('/deleteEmployee', function(req, res){
    console.log(req.query)
    console.log("Employee deleted: ")
    Employee.findById(req.body._id).then(function(employee){
        res.json({employee})
    })
    //Employee.findByIdAndDelete(req.body._id).exec()
    //res.redirect('delete.html')
})

//set up static folder for views
app.use(express.static(__dirname+"/views"))
app.listen(3000, function(){
    console.log("Connected on port 3000")
})