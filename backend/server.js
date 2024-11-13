const dotenv = require('dotenv').config() // get the .env and take it as process.env
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors');
const route = require('./routes/route');

// adding () this will call the function when it runned
app.use(cors()) // communcate from frontend to backend
app.use(express.json()) // req.body as json
app.use(express.urlencoded({ extended: true }));
app.use("/", route) // "/" sets an initial parameter so if "/qwe", search "/qwe"


app.listen(port, () => {
    console.log(port)
})
