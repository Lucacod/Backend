const express = require('express')
const mongoose = require('mongoose')
const logger = require('./middlewares/logger')
const postsRoute = require('./routes/posts')
const usersRoute = require('./routes/users')
require('dotenv').config()
const PORT = 5050;


const app = express();

// middleware parser json
app.use(express.json())
app.use(logger)

// routes
app.use('/', postsRoute)
app.use('/', usersRoute)


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during db connection'))
db.once('open', () => {
    console.log('Database successfully connected!')
})

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))