const express = require('express');
const noteRouter = express.Router();
const upload = require('multer')();
const dbHandler = require('./datahandler');
const auth = require('./auth');


const init = () => {

    // Send the notes based on page
    noteRouter.get('/getnotes/:id', async (req, res) => {

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
    noteRouter.delete('/removenote/:id', auth.isLoggedIn, async (req, res) => {

        const noteID = req.params.id;
        await dbHandler.removeNote(noteID);
        res.status(204).end();
    });

    // Add note post endpoint
    noteRouter.post('/addnote', auth.isLoggedIn, upload.single('file'), async (req, res) => {

        let result = 'Note Added.';

        try {

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

    return {
        route : noteRouter
    }


}

module.exports = init;