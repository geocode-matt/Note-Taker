// ===========================================================
// Dependencies
// ===========================================================
const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const { notes } = require('./db/db.json');


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

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

