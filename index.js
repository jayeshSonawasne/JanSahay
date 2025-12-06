require('dotenv').config();
require('./connection/db.connection')();
const { swaggerUi, swaggerSpec } = require("./swagger/swagger.config");
const express = require('express');
const app = express(); // Remove 'new' keyword
const AI = require('./routes/aichat.routes');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

// const schemeModel = require('./models/scheme.model');

const chatRoute = require('./routes/jansahay.route');
const userRoute = require('./routes/user.routes');
const schemeRoute = require('./routes/scheme.routes');
const application = require('./routes/application.track.route');

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "PUT" , "POST", "DELET"]
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

app.listen(PORT,'0.0.0.0',(err) => {
    if (err) {
        console.log('Something went wrong:', err);
    } else {
        console.log(`🚀 Server running on port ${PORT}`);
    }
});
