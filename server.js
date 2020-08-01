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
function createNewNote(body, notes) {
  const newNote = body;
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notes }, null, 2)
  );
  return newNote;
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

  // add new note to db.json file
  const newNote = createNewNote(req.body, notes);

  res.json(newNote);
  console.log(notes)
});










// ===========================================================
// LISTENER
// ===========================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

