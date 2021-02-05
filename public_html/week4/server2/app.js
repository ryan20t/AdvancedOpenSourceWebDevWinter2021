var express = require('express')
var hbs = require('hbs')
var app = express()

var randomNumber = require('./modules/randomNum')

//set up HBS as view engine
app.set('view engine', 'hbs')
//This is needed to be able to decode the req body, alternate is to use bodyparser middleware
app.use(express.urlencoded({extended:false}))

//register a helper
hbs.registerHelper('ptag', function(num, inputMessage){
    var msg = ""
    for(var i = 0; i < num; i++){
        msg += `<p>${inputMessage + num}</p>`
    }
    return new hbs.handlebars.SafeString(msg)
})

//get route to render form page
app.get('/form', function(req, res){
    res.render('form.hbs')
})

//post route
app.post('/results',function(req, res){
    //console.log(req.body.testNumber)
    res.render('results.hbs',{
        num:req.body.testNumber
    })
})

app.listen(3000,function(){
    console.log("Connected on Port 3000")
})