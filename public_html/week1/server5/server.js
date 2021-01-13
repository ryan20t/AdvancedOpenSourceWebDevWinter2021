//declarations
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port:3000}),
clients = [],
messages = [];

//on connection event, run callBack function
wss.on('connection', function(ws){
    var index = clients.push(ws) -1

    var msgText = messages.join('<br>')
    ws.send(msgText)

    ws.on('message', function(message){
        messages.push(message)
        console.log('received: %s from %s', message, index)

        wss.clients.forEach(function(conn){
            conn.send(message)
        })
    })
})