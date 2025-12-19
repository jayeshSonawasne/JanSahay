require('dotenv').config();
require('./connection/db.connection')();
const { swaggerUi, swaggerSpec } = require("./swagger/swagger.config");
const express = require('express');
const app = express(); // Remove 'new' keyword
const AI = require('./routes/aichat.routes');
const cors = require('cors');

const PORT = process.env.PORT || 8585;

// const schemeModel = require('./models/scheme.model');

const chatRoute = require('./routes/jansahay.route');
const userRoute = require('./routes/user.routes');
const schemeRoute = require('./routes/scheme.routes');
const application = require('./routes/application.track.route');

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELET"]
}));


// Serve static files from public folder
app.use('/pdf', express.static('public'));

// Routes


//AI Models
app.use('/', AI);
app.use('/chat', chatRoute);

//user API
app.use('/user', userRoute);
app.use('/scheme', schemeRoute);
app.use('/application', application);


// Swagger Docs Route
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// const audioService = require('./groqAIModel/audio.service.model');


// (async () => {
//     let data = await audioService.speechToText("./speech.wav", "Specify context or spelling");
//     console.log(data);
// })()

// app.use('/uploadScheme')

const server = app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.log('Something went wrong:', err);
    } else {
        console.log(`🚀 Server running on port ${PORT}`);
    }
});

// Initialize Socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomId, userId) => {
        console.log(`User ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            console.log(`User ${userId} disconnected from room ${roomId}`);
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });

    // WebRTC Signaling Events
    socket.on('offer', (data) => {
        socket.to(data.roomId).emit('offer', data.offer);
    });

    socket.on('answer', (data) => {
        socket.to(data.roomId).emit('answer', data.answer);
    });

    socket.on('ice-candidate', (data) => {
        socket.to(data.roomId).emit('ice-candidate', data.candidate);
    });
});
