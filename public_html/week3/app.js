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
//db name = favoriteFood
mongoose.connect('mongodb://localhost:27017/favoriteFood',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to database")
}).catch(function(err){
    console.log(err)
})

//Load in Database Templates or Schema (models)
require('./models/Food')
//variable for reference to model
var Food = mongoose.model('food')

//Basic data entry using mongoose
// var Food = mongoose.model('Food', {name:String})

// var food = new Food({name:"Pizza"})
// food.save().then(function(){
//     console.log("Food entry saved")
// })

//Set up routes to retreive data
app.post('/saveFoodEntry', function(req, res){
    console.log("A request was made")
    console.log(req.body)

    new Food(req.body).save().then(function(){
        console.log("Data saved")
        res.redirect('foodlist.html')
    })
})

app.get('/getData', function(req, res){
    Food.find({}).then(function(food){
        res.json({food})
    })
})

app.post('/deleteFood', function(req, res){
    console.log("Food deleted: ", req.body._id)
    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect('foodlist.html')
})

//set up static folder for views
app.use(express.static(__dirname+"/views"))
app.listen(3000, function(){
    console.log("Connected on port 3000")
})