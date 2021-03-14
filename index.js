const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use('/', express.static(path.join(__dirname, '/public')));

io.on('connection', (socket) => {
    console.log("A user connected");
    socket.on('drawing', (msg) => {
        console.log(`Message recieved : ${msg}`);
        socket.broadcast.emit('drawing', msg);
        //io.emit('drawing', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


http.listen(3000, () => {
    console.log('Listening on port: 3000');
});