const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

async function initPassport(passport, dbHandler)
{
    const authUser = async (email,password,done) => {
        
        const user = await getUserByEmail(email);

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

    const getUserByEmail = async (email) => {
        return await dbHandler.findUser(email);
    }

    const getUserById = async (id) => {
        return await dbHandler.findUserById(id);
    }

    // email => users.find(user => user.email === email),
    // id => users.find(user => user.id === id)

    passport.use(new LocalStrategy({usernameField : 'email'},authUser));
    passport.serializeUser((user,done) => done(null,user._id.toString()));
    passport.deserializeUser(async (id,done) => done(null,await getUserById(id)));
}

module.exports = initPassport;