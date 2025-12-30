const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('مستخدم متصل:', socket.id);
    
    socket.on('join-room', (roomName) => {
        socket.join(roomName);
        console.log(`${socket.id} انضم إلى ${roomName}`);
    });
    
    socket.on('message-to-room', ({ room, message }) => {
        io.to(room).emit('room-message', {
            sender: socket.id,
            message
        });
    });
});