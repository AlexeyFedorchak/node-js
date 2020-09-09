const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
self = channel;

channel.on('join', (id, client) => {
	self.clients[id] = client;
	self.subscriptions[id] = (senderId, message) => {
		self.clients[id].write(message);
	}

	self.on('broadcast', self.subscriptions[id]);
});

channel.on('leave', id => {
	channel.removeListener('broadcast', self.subscriptions[id]);
	channel.emit('broadcast', id, `${id} has left the chat!\n`);
});

const server = net.createServer(client => {
	const id = `${client.remoteAddress}:${client.remotePort}`;
	channel.emit('join', id, client);

	console.log('Number of chatters: ' + channel.listeners.length);
	client.on('data', data => {
		channel.emit('broadcast', id, data);
	});

	client.on('close', () => {
		channel.emit('leave', id);
	})
});

server.listen(8888);