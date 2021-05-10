const express = require('express');
const pageRouter = express.Router();
const dbHandler = require('./datahandler');
const auth = require('./auth');

init = () => {

    // Find if a page exist 
    pageRouter.get('/findpage/:pageName', async (req, res) => {

        try {
            let exists = await dbHandler.findPage(req.params.pageName);
            res.json({ 'exists': exists });
            res.end();

        } catch (err) {
            console.log(err);
        }
    });

    // Send the pages
    pageRouter.get('/getpages', async (req, res) => {

        try {
            let pages = await dbHandler.retrievePages();
            res.json(pages);
            res.end();

        } catch (err) {
            console.log(err);
        }
    });

    // Add page post endpoint
    pageRouter.post('/addpage/:pageName', auth.isLoggedIn, async (req, res) => {

        let result = 'Page Exists.';
        let id = null;

        try {

            let exists = await dbHandler.findPage(req.params.pageName);

            // Construct page object
            if (!exists) {

                let page = {
                    title: req.params.pageName,
                };

                id = await dbHandler.addPage(page);
            }

        } catch (err) {
            result = 'Error adding page: ' + err;
        }

        const retObj = { id : id,
            result : result}

        res.json(retObj);
        res.end();

    });

    // Delete page endpoint
    pageRouter.delete('/removepage/:pageName', auth.isLoggedIn, async (req, res) => {
        const pageName = req.params.pageName;
        await dbHandler.removePage(pageName);
        res.status(204).end();
    });

    return {
        route: pageRouter
    }

}

module.exports = init;