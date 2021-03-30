const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const dbHandler = require('./datahandler');
let authRoute = require('./auth');
let noteRoute = require('./note');
let pageRoute = require('./page');

dotenv.config();
const port = process.env.PORT;

app.use(express.static(__dirname + './../'));

//Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect database on startup
(async () => {
    try {

        await dbHandler.connect();

        // Passport login config
        authRoute = authRoute(dbHandler);

        // Setup note route
        noteRoute = noteRoute(dbHandler);

        // Setup page route
        pageRoute = pageRoute(dbHandler);

        useRoutes();

        app.listen(port, () => {
            console.log('Listening to port ' + port);
        });

    } catch (err) {
        console.log(err);
    }
})();

useRoutes = () => {

    // Authentication endpoints
    app.use('/auth', authRoute.route);

    // Note endpoints
    app.use('/note', noteRoute.route);

    // Page endpoints
    app.use('/page', pageRoute.route);

}

