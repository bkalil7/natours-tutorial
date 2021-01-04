/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on("uncaughtException", err => {
    console.log("UNHLANDED EXCEPTION! Shutting down the server.");
    console.log(err);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connected succesfully"));

const port = process.env.PORT;
const ip = process.env.IP;

const server = app.listen(port, ip, () => {
    console.log(`App running on: http://${ip}:${port}`);
});

process.on("unhandledRejection", err => {
    console.log("UNHLANDED REJECTION! Shutting down the server.");
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});
