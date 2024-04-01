const express = require('express')
const path = require('path')
const db = require('./db/db.json')
const api = require('./routes/index')

const PORT = process.env.port || 3001

const app = express()

//middleware for...
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

// wildcard route for 404 page 

//run the server
app.listen(PORT, console.log(`App listening at http://localhost:${PORT}`))