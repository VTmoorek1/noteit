const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function initPassport(passport, getUserByEmail,getUserById)
{
    const authUser = async (email,password,done) => {
        
        const user = getUserByEmail(email);

        if (user == null)
        {
            return done(null,false,{message : "No user with that email found."});
        }

        try {

            console.log('User hash: ' + user.password + " Sent password: " + password);

            if (await bcrypt.compare(password,user.password))
            {
                return done(null,user);
            }
            else
            {
                return done(null,false,{message : 'Incorrect Password'});
            }

        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({usernameField : 'email'},authUser));
    passport.serializeUser((user,done) => done(null,user.id));
    passport.deserializeUser((id,done) => done(null,getUserById(id)));
}

module.exports = initPassport;