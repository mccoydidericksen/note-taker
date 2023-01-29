const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const PORT = 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    res.json(notes);
});

// POST Route for a new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: notes.length + 1,
        };
        notes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// DELETE Route for a note
app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const id = req.params.id;
    if (id) {
        const newNotes = notes.filter(note => note.id !== parseInt(id));
        fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    } else {
        res.error('Error in deleting note');
    }
});