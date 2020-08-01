// ===========================================================
// Dependencies
// ===========================================================
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3001;
const { notes } = require('./db/db.json');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===========================================================
// FUNCTIONS
// ===========================================================

// This function creates a new note from the post route and pushes the data into the db.json file
function createNewNote(body, notes) {
  const newNote = body;
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notes }, null, 2)
  );
  return newNote;
}

function validateNewNote(newNote) {
  if (!newNote.title || typeof newNote.title !== 'string') {
    return false;
  }
  if (!newNote.text || typeof newNote.text !== 'string') {
    return false;
  }
  if (!newNote.id || typeof animal.id !== 'number') {
    return false;
  }
  return true;
}


// ===========================================================
// ROUTES
// ===========================================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes);
});

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  // validate the new note data before pushing newNote
  if (!validateNewNote(req.body)) {
    res.status(400).send("This note is not properly fromatted.");
  } else {
  // add new note to db.json file
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
  }
});










// ===========================================================
// LISTENER
// ===========================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

