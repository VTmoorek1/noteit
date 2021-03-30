const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initPassport = require('./passport-config');
const bcrypt = require('bcrypt');


init = (dbHandler) => {

    authRouter.use(flash());
    authRouter.use(session({
        secret: process.env.SESH_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    authRouter.use(passport.initialize());
    authRouter.use(passport.session());

    initPassport(passport, dbHandler);

    authRouter.get('/loginSuccess', (req, res) => {

        const userObj = req.user;
        console.log('Login Success: ' + userObj);
        res.end('success ' + userObj.name);
    });

    authRouter.get('/loginFail', async (req, res) => {

        const errorMsg = req.flash('error');
        console.log('Login Fail: ' + errorMsg[0]);
        res.end(errorMsg[0]);
    });

    const authStrategy = passport.authenticate('local', {
        successRedirect: 'loginSuccess',
        failureRedirect: 'loginFail',
        failureFlash: true
    });

    // Login endpoint
    authRouter.post('/login', authStrategy);

    authRouter.delete('/logout', (req, res) => {

        const userObj = req.user;
        console.log('Logging out ' + userObj.name);

        req.logOut();

        res.end();

    });

    register = async (req, res,next) => {
        let result = 'success';

        try {

            // Check if name or email exists already
            const name = req.body.name;
            const email = req.body.email;
            const user = await dbHandler.findUser(email);

            console.log('User registered: ' + user);

            if (user !== null) {
                result = 'Email is already registered.';
            }
            else {
                const hashed = await bcrypt.hash(req.body.password, 10);

                // Add user to db
                await dbHandler.addUser({
                    'name': name,
                    'email': email,
                    password: hashed
                });
            }

        }
        catch (err) {
            result = err;
        }

        console.log('Register result: ' + result);

        // If success then go to login logic
        if (result === 'success')
        {
            next();
        }
        else
        {
            res.end(result);
        }
    }

    // Register a user
    authRouter.post('/register', register, authStrategy);

    function isNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }

        next();
    }

    return {
        route: authRouter
    }

}

module.exports = init;