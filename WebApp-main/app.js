var express = require("express");
var mongoose = require("mongoose");
var app = express()
var path = require('path');
var port = process.env.PORT || 3000

require('./db')

//quick data model
var User = mongoose.model('User', {
    name:{
        type:String
    },
    email:{
        type:String
    }
})

app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+"/public/index.html"))
})

app.get('/getData',function(req,res){
    User.find({}).then(function(user){
        res.json({user})
    })
})

app.post('/data', function(req,res){
    console.log("posting data")
    //console.log(req.body, req.body.name, req.body.email)
    var newUser = new User({
        name:req.body.name,
        email:req.body.email
    })
    newUser.save(function(err,result){
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.redirect('/userlist.html')
        }
    })
 
    
})
app.listen(port,function(){
    console.log("Listening on port " + port)
})

