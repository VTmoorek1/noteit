const express = require('express');
const bodyParser = require('body-parser');
const upload = require('multer')();
const fs = require('fs');
const dotenv = require('dotenv');
const app = express();
const dbHandler = require('./datahandler');


dotenv.config();
const port = process.env.PORT;

app.use(express.static(__dirname + './../'));

//Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For testing notes array
let notes = [];

// Send the notes based on page
app.get('/getnotes/:id', (req,res) => {
    
    let pageID = req.params.id;

    console.log('Get notes ' + pageID);
    res.json(notes);
    res.end();
});

// Add note post endpoint
app.post('/addnote', upload.single('file'), (req, res) => {

    let result = 'Note Added.';

    try {        

        console.log(req.file.buffer.length);

        // Construct note object
        let note = {
            title: req.body.title,
            desc: req.body.desc,
            user: req.body.user,
            file: {
                name : req.file.originalname,
                type : req.file.mimetype,
                size : req.file.size,
                file : req.file.buffer
            }
        };

        dbHandler.addNote(note);

        console.log(note);

    } catch (err) {
        result = 'Error adding note: ' + err;
    }
    
    res.end(result);

});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});
