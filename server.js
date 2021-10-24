const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
// all routes
const studentRoutes = require('./routes/student');
require('dotenv').config();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/student', studentRoutes);


app.get('/', (req, res) => {
    res.status(200).send('<h1> Welcome To Our Website </h1>');
});

app.get('*', (req, res) => {
    res.status(400).send("<h1>No API found with this route</1>")
})
// Database connection
mongoose.connect("mongodb://localhost:27017/project1")
    .then(() => console.log("Database connected successfully."))
    .catch(error => console.log(error));

// server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening at port ${port}`));