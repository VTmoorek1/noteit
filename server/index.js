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

// Send the notes based on page
app.get('/getnotes/:id', async (req,res) => {
    
    let pageID = req.params.id;
    let notes = await dbHandler.retrieveNotes(pageID);
    
    console.log('Get notes ' + notes[0].file.buffer.length());



    res.json(notes);
    res.end();
});

// Delete note endpoint
app.delete('/removenote/:id',async (req,res) => {
    
    const noteID = req.params.id;  
    console.log(await dbHandler.removeNote(noteID));

    res.status(204).end();
});

// Add note post endpoint
app.post('/addnote', upload.single('file'), async (req, res) => {

    let result = 'Note Added.';

    try {        

        console.log(req.file.buffer.length);

        // Construct note object
        let note = {
            title: req.body.title,
            desc: req.body.desc,
            user: req.body.user,
            page : req.body.page,
            file: {
                name : req.file.originalname,
                type : req.file.mimetype,
                size : req.file.size,
                buffer : req.file.buffer
            }
        };

        result = await dbHandler.addNote(note);

    } catch (err) {
        result = 'Error adding note: ' + err;
    }
    
    res.end(result);

});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});
