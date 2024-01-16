// Load env variables
if (process.env.NODE_ENV != "production"){
require('dotenv').config();
}

// import dependencies
const express = require('express');
const connectDB = require('./config/connectDB');
const Note = require('./models/note')

// create express app
const app = express();

// configure express app
app.use(express.json());

// connect to database
connectDB();

// Routing
app.get('/', (req, res) => {
    res.json({ hello: 'world'});
})

app.get ('/notes', async (req, res) => {
    // Find the notes
    const notes = await Note.find();
    // Respond with the notes
    res.json({notes: notes });
})

app.get('/notes/:id', async (req, res) => {
    // Get id from URL
    const noteID = req.params.id;

    // Find note using that ID
    const note = await Note.findById(noteID)
    // Respond with note
    res.json({note: note})
})

app.post('/notes', async (req, res) => {
    // get sent in data off request body
    const title = req.body.title;
    const body = req.body.body; 
    // create a note with it
     const note = await Note.create({
        title: title,
        body: body,
    })
    // respond with new note
    res.json({note: note})
})

app.put('/notes/:id', async (req, res) => {
    // get id off url
    const noteId = req.params.id;

    // get the data off the req body
    const title = req.body.title;
    const body = req.body.body;

    // find and update record
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    })

    // find updated note
    const note = await Note.findById(noteId);
    // respond with it
    res.json({ note: note });
})

// start server
app.listen(process.env.PORT)