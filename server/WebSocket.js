const WebSocket = require('ws');
const colors = require('colors');
const PORT = 8080;
const server = new WebSocket.Server({port: PORT});
server.on('connection', ws => {
	
	console.log('Open');
	console.log(`server run on ${PORT} port`.green);
	ws.on('message', function (event) {

	console.log(event);
	ws.send(event);

})
})
