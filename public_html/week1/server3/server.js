//a node server page will
//will contain what the app needs to run at the top of the file

var http = require("http")
var url = require('url')

http.createServer(function(request, response){

    //gives you the complete URL with parameters
    var pathName = url.parse(request.url).pathname

    //http header
    //Content type: text/plain

    response.writeHead(200,{'Content-Type':'text/html'})
    //Send response to body
    response.write('<!DOCTYPE html><html><body><div>Request for ' + pathName + ' received</div></body></html>')
    response.end()
}).listen(3000)

console.log('Server is running at http://localhost:3000')