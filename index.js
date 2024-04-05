require('dotenv').config();
const express = require('express');
const routes = require('./controller/');
const app = express();
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error-middleware');

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
    connectTimeoutMS: 20000,
    retryWrites: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use((req, res, next) => {
    next(new Error('Route Not Found'));
});
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
