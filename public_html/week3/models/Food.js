var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FoodSchema = new Schema({
    food:{
        type:String,
        required:true
    }
})

mongoose.model('food', FoodSchema)
