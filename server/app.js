import express from 'express';
import mongoose from 'mongoose'
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { MessageModel } from './modules/models/message/message.js';
const port = 3000;

import path from 'path';
const __dirname = path.resolve();

const app = express();
const server = createServer(app);
dotenv.config();
app.use(express.json());
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

app.post('/message', async (req, res) => {
    try {
        const message = await MessageModel.create(req.body);
        res.status(201).json(message);

    } catch (error) {
        console.log(error);

    }

})

let users = [];
let privateUsers = [];

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Group message
    socket.on('send-group-message', (data) => {
        console.log('recieved data from client', data);
        // Now emit the message back to everyone else who is connected with the server
        io.emit('recieve-group-message', data)
    })

    // Send the current user list to the newly connected client
    socket.emit('new-group-user-response', users);

    // Listen for new users
    socket.on('new-group-user', (data) => {
        console.log(data, 'new group user');

        users.push(data);

        // Sends the list of users to the client
        io.emit('new-group-user-response', users);
    })



    // Private message
    // Join room for private chat
    socket.on('join-room', ({ username, room }) => {
        console.log('🔥: A user joined a room', username, room);
        socket.join(room);
    })

    // Send private message
    socket.on('send-private-message', (data) => {
        console.log('🔥: A user sent a private message', data);
        socket.to(data.room).emit('recieve-private-message', data);
    })

    // User typing
    socket.on('user-typing', ({ room, username }) => {
        socket.to(room).emit('show-typing', { username });
    });

    socket.on('stop-typing', ({ room, username }) => {
        socket.to(room).emit('hide-typing', { username });
    });



    // Listen for when a user disconnects
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');

        // Updates the list of users when a user disconnects
        users = users.filter((user) => user.id !== socket.id);

        //Sends the list of users to the client
        io.emit('new-group-user-response', users);
        socket.disconnect();
    })
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//     })
// }

server.listen(port, () => {
    console.log(`Socket Server is running on port ${port}`);
});

// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         server.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//         });
//     })
//     .catch((error) => {
//         console.log(error)
//     })