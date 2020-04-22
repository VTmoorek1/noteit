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


// Connect database on page load
(async () => {
    try {

        await dbHandler.connect();

        app.listen(port, () => {
            console.log('Listening to port ' + port);
        });


    } catch (err) {
        console.log(err);
    }
})();


// Send the notes based on page
app.get('/getnotes/:id', async (req, res) => {

    try {
        let pageID = req.params.id;
        let notes = await dbHandler.retrieveNotes(pageID);
        res.json(notes);
        res.end();

    } catch (err) {
        console.log(err);
    }
});


// Delete note endpoint
app.delete('/removenote/:id', async (req, res) => {

    const noteID = req.params.id;
    await dbHandler.removeNote(noteID);
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
            page: req.body.page,
            file: {
                name: req.file.originalname,
                type: req.file.mimetype,
                size: req.file.size,
                buffer: req.file.buffer
            }
        };

        result = await dbHandler.addNote(note);

    } catch (err) {
        result = 'Error adding note: ' + err;
    }

    res.end(result);

});

// Find if a page exist 
app.get('/findpage/:pageName', async (req, res) => {

    try {
        let exists = await dbHandler.findPage(req.params.pageName);
        res.json({ 'exists': exists });
        res.end();

    } catch (err) {
        console.log(err);
    }
});

// Send the pages
app.get('/getpages', async (req, res) => {

    try {
        let pages = await dbHandler.retrievePages();
        res.json(pages);
        res.end();

    } catch (err) {
        console.log(err);
    }
});

// Add page post endpoint
app.post('/addpage/:pageName', async (req, res) => {

    let result = 'Page Added.';

    try {

        // Construct page object
        let page = {
            title: req.params.pageName,
        };

        result = await dbHandler.addPage(page);

    } catch (err) {
        result = 'Error adding page: ' + err;
    }

    res.end(result);

});

// Delete page endpoint
app.delete('/removepage/:pageName', async (req, res) => {
    const pageName = req.params.pageName;
    await dbHandler.removePage(pageName);
    res.status(204).end();
});


