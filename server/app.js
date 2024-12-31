import express from 'express';
import mongoose from 'mongoose'
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { MessageModel } from './modules/models/message/message.js';
const port = 3000;

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

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('send_message', (data) => {
        console.log('recieved data from client', data);
        // Now emit the message back to everyone else who is connected with the server
        io.emit('recieve-message', data)
    })

    // Listen for new users
    socket.on('newUser', (data) => {
        users.push(data);

        // Sends the list of users to the client
        io.emit('newUserResponse', users);
    })

    // Listen for when a user disconnects
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');

        // Updates the list of users when a user disconnects
        users = users.filter((user) => user.id !== socket.id);

        //Sends the list of users to the client
        io.emit('newUserResponse', users);
        socket.disconnect();
    })
})


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })