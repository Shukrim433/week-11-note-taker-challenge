const notes = require('express').Router // imports the Router method from the express module
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils') //imports the readFromFile, writeToFile, and readAndAppend 
//functions from the fsUtils module
const { v4: uuidv4 } = require('uuid') // imports a specific function called v4 from the uuid package and renames it to uuidv4, allowing you 
//to generate UUIDs using uuidv4().

//GET route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => {
        res.json(JSON.parse(data))
    })
})

//GET route for retrieving a specific note
notes.get('/:note_id', (req, res) => {

    const note_id = req.params.note_id

    readFromFile('./db/db.json')
    .then((data) => {
       json.parse(data)
    }).then((jsonData) => {
        const result = jsonData.filter((noteObject) => {noteObject.note_id === note_id})
        return result.length > 0 ? res.json(result) : res.json('no note with that id found') //checks if the result array is more than 0 (aka theres
        //atleast one note object that had the matching note id) and if it is > 0 then return that result array consisting of that matching note object
    })

})