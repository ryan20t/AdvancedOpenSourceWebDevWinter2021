//a node server page will
//will contain what the app needs to run at the top of the file

var http = require("http")
var url = require('url')
var fileSystem = require('fs')

http.createServer(function(request, response){

    //gives you the complete URL with parameters
    var requestedPage = request.url.substr(1)
    //console.log(requestedPage)

    //load html page
    fileSystem.readFile(requestedPage, callBack)

    function callBack(err, data){
        if(err){
            console.log(err)
            //redirect to index on page not found
            response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' })
        }
        else if(requestedPage == 'index.html'){
            //http header
            //Content type: text/html
            response.writeHead(200,{'Content-Type':'text/html'})
            //Send response to body
            response.write(data.toString())
        }
        else if(requestedPage == 'todo.json' || requestedPage == 'todo'){
            response.writeHead(200,{'Content-Type':'text/json'})
            response.write(data.toString())
        }
        else if(requestedPage == 'read-todo.html' || requestedPage == 'read-todo'){
            response.writeHead(200,{'Content-Type':'text/html'})
            response.write(data.toString())
        }
        //response complete
        response.end()
    }
    
}).listen(3000)
console.log('Server is running at http://localhost:3000')