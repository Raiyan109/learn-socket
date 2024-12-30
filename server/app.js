import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('message', (data) => {
        console.log('Received message:', data.message);
        console.log('Receiver room:', data.room);
        io.to(data.room).emit('recieve-message', data.message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    })
})



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});