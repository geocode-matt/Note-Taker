// ===========================================================
// Dependencies
// ===========================================================
const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');
const uniqid = require('uniqid');
// Tells app to use the public folder for html/js
app.use(express.static(__dirname + '/public'));
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

// This function validates the note inputs before allowing it to be added
function validateNewNote(newNote) {
  if (!newNote.title || typeof newNote.title !== 'string') {
    return false;
  }
  if (!newNote.text || typeof newNote.text !== 'string') {
    return false;
  }
  if (!newNote.id || typeof newNote.id !== 'string') {
    return false;
  }
  return true;
}

// This function removes the targeted (delete button) item from db.json and re-writes the file
function removeFromDb(id) {
  for (i = 0; i < notes.length; i++) {
    if (id === notes[i].id) {
      notes.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
      )
    }
    console.log(notes);
  }
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
    // console.log(notes);
});

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = uniqid();
  // validate the new note data before pushing newNote
  if (!validateNewNote(req.body)) {
    res.status(400).send("This note is not properly formatted.");
  } else {
  // add new note to db.json file
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
  }
});

app.delete('/api/notes/:id', function (req, res) {
  res.send('Deleted Note');
  const idSplit = req.url.split(":")
  const id = idSplit[1];
  removeFromDb(id);
})

// ===========================================================
// LISTENER
// ===========================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

