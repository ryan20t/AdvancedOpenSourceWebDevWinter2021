//a node server page will
//will contain what the app needs to run at the top of the file

var http = require("http")

http.createServer(function(request, response){
    //http header
    //Content type: text/plain

    response.writeHead(200,{'Content-Type':'text/plain'});
    //Send response to body
    response.end('Hello World\n')
}).listen(3000);

console.log('Server is running on port 3000.');