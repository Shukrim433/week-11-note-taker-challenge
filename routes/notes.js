const notes = require('express').Router() //imports the express framework and then accesses the Router() method and that method creates 
//a router object which is used to define and handle routes and middleware. [i.e. notes.get means the Router() method has a get() property ect...]
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils') //imports the readFromFile, writeToFile, and readAndAppend 
//functions from the fsUtils module
const { v4: uuidv4 } = require('uuid') // imports a specific function called v4 from the uuid package and renames it to uuidv4, allowing you 
//to generate UUIDs using uuidv4().

//GET route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved`)
    readFromFile('./db/db.json')
    .then((data) => {
        res.json(JSON.parse(data))
    })
})

//GET route for retrieving a specific note based on its node_id
notes.get('/:note_id', (req, res) => {

    const id = req.params.note_id

    readFromFile('./db/db.json')
    .then((data) => {
       JSON.parse(data)
    }).then((jsonData) => {
        const result = jsonData.filter((noteObject) => {noteObject.id === id})
        return result.length > 0 ? res.json(result) : res.json('no note with that id found') //checks if the result array is more than 0 (aka theres
        //atleast one note object that had the matching note id) and if it is > 0 then return that result array consisting of that matching note object
    })

})

//DELETE route for deleting a specific note based on its node_id
notes.delete('/:note_id', (req, res) => {

    const id = req.params.note_id

    readFromFile('./db/db.json')
    .then((data) => {
        const jsonData = JSON.parse(data); // Parse the JSON data****
        return jsonData; // Return the parsed JSON data*****
    }).then((jsonData) => {
        result = jsonData.filter((noteObject) => noteObject.id !== id) //itterates through the notes database array and returns all the
        //note objects that DO NOT match the note id specified in the route parameter into the 'result' array [essentially deleting that one note]

        writeToFile('./db/db.json', result) //overwriting the contents of the db with the new array of note objects (minus the deleted one)
        
        console.info(`${id} note has been deleted`)
    })
})

//POST route for creating a new note
notes.post('/', (req, res) => {
    const {title, text} = req.body
    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        readAndAppend(newNote, './db/db.json')
    } else {
        res.json('Error in adding note');
    }
})

module.exports = notes;