const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, {
    autoIndex: true,
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err, 'Mongoose failed to connect');
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
});


process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Connection close successfully");
        process.exit(0);
    });
});


