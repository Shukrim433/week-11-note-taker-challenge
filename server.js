const express = require('express')
const path = require('path')
//const db = require('./db/db.json')
const api = require('./routes/index')

const PORT = process.env.port || 3001

const app = express()

//middleware for parsing incoming request bodies in JSON and URL-encoded formats, making the data accessible in the request object.
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//middleware for serving static files from the 'public' directory
app.use(express.static('public'))
//middleware to use all the routes in index.js at the /api path
app.use('/api', api)

//get requests to serve the static html pages

//home page
app.get('/', (req,res) => {
    console.info(`${req.method} request recieved`)
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

//notes page

app.get('/notes', (req, res) => {
    console.info(`${req.method} request recieved`)
    res.sendFile(path.join(__dirname, ('/public/notes.html')))
})

// wildcard route in case of an error, README said  -`GET *` should return the `index.html` file.

app.get('*', (req, res) => {
    console.info(`${req.method} request recieved`)
    res.sendFile(path.join(__dirname, ('/public/notes.html')))
})

//run the server
app.listen(PORT, console.log(`App listening at http://localhost:${PORT}`))