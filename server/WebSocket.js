const WebSocket = require('ws');
	
const server = new WebSocket.Server({port: 8080});
server.on('connection', ws => {
	
	console.log('Open');
	console.log('server run on 8080 port');
	ws.on('message', ev => {
	console.log(ev)
	// body...
})
})
