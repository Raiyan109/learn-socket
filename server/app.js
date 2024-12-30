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

    socket.on('send_message', (data) => {
        console.log('recieved data from client', data);
        // Now emit the message back to everyone else who is connected with the server
        io.emit('recieve-message', data)
    })
})



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});