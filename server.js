const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('مستخدم اتصل بالسيرفر');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('مستخدم فصل الاتصال');
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('السيرفر شغال على http://localhost:3000');
});
