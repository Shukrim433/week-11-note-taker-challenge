const express = require('express') //import the express framework


const notesRouter = require('./notes') // import the notes routes module

const app = express() //create an instance of express

app.use('/notes', notesRouter) //use all the routes in the notesRouter module at the '/notes' path


module.exports = app //export this module