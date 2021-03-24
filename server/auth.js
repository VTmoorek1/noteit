const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initPassport = require('./passport-config');


init = () => {

    authRouter.use(flash());
    authRouter.use(session({
        secret: process.env.SESH_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    authRouter.use(passport.initialize());
    authRouter.use(passport.session());

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

    // Login endpoint
    authRouter.post('/login', passport.authenticate('local', {
        successRedirect: 'loginSuccess',
        failureRedirect: 'loginFail',
        failureFlash: true
    }));

    authRouter.delete('/logout', (req, res) => {

        const userObj = req.user;
        console.log('Logging out ' + userObj.name);

        req.logOut();

        // change
        res.redirect('/login');
    });

    initAuthentication = (dbhandler) => {
        initPassport(passport, dbhandler);
    }

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
        route : authRouter,
        initAuthentication : initAuthentication
    }

}

module.exports = init();