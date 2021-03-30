const express = require('express');
const pageRouter = express.Router();

init = (dbHandler) => {

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
    pageRouter.post('/addpage/:pageName', async (req, res) => {

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
    pageRouter.delete('/removepage/:pageName', async (req, res) => {
        const pageName = req.params.pageName;
        await dbHandler.removePage(pageName);
        res.status(204).end();
    });

    return {
        route: pageRouter
    }

}

module.exports = init;