var express = require('express')
var app = express()
var path = require('path')
var port = 3000

//create a route to the local directory (independent of machine)
// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname+'/views/index.html'))
// })
//create route for about.html
// app.get('/about.html', function(req, res){
//     res.sendFile(path.join(__dirname+'/views/about.html'))
// })

//Files in this directory will automatically be served up by our express folder
//It created the static folder so links can use it as a reference
//This makes the above routes unnecessary
app.use(express.static(__dirname+'/views'))

app.listen(port, function(){
    console.log('Connected on Port ' + port)
})