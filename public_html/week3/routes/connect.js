var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

//Connect to MongoDB database using mongoose
//db name = favoriteFood
mongoose.connect('mongodb://localhost:27017/favoriteFood',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to database")
}).catch(function(err){
    console.log(err)
})

module.exports = router