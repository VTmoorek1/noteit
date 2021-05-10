const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initPassport = require('./passport-config');
const bcrypt = require('bcryptjs');
const dbHandler = require('./datahandler');


module.exports = (() => {

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
        res.json({status : 'success', userName : userObj.name});
        res.end();
    });

    authRouter.get('/loginFail', async (req, res) => {
        const errorMsg = req.flash('error');
        console.log('Login Fail: ' + errorMsg[0]);
        res.json({status : 'error', error : errorMsg[0]});
        res.end();
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

    const register = async (req, res,next) => {
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
            result = err.message;
        }

        console.log('Register result: ' + result);

        // If success then go to login logic
        if (result === 'success')
        {
            next();
        }
        else
        {
            res.json({status : 'error', error : result});
            res.end();
        }
    }

    // Return if user is logged in
    authRouter.get('/user',function (req,res) {
        const userObj = {name : req.isAuthenticated() ? req.user.name : null};
        res.json(userObj);
        res.end();
    });

    // Register a user
    authRouter.post('/register', register, authStrategy);

    function isNotLoggedIn(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }

    function isLoggedIn(req, res, next) {
        req.isAuthenticated() ? next() : res.end('UNAUTHENTICATED');
    }

    return {
        route: authRouter,
        isLoggedIn : isLoggedIn
    }

})();