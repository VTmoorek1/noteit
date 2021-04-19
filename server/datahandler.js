const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


module.exports = (()=>{

    let db = null;
    let dbClient = null;

    const connectToDB = () => {

        // Connect to mongodb, happens on server start
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {
                useUnifiedTopology: true
            }, (err, client) => {
                if (err) return reject(err);

                dbClient = client;
                db = dbClient.db('noteit');

                resolve();
            });

        });
    }

    // Add note object to db
    const addNoteDB = note => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('notes').insertOne(note, (err, result) => {
                    if (err) throw reject(err);

                    resolve(result.insertedId.toString());
                });

            } catch (err) {
                reject(err);
            }
        });
    }

    // Get all notes from DB based on the current page
    const retrieveNotesDB = pageID => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('notes').find({ page: pageID }).sort({ _id: 1 }).toArray((err, items) => {
                    if (err) return reject(err);

                    resolve(items);
                });

            } catch (err) {
                reject(err);
            }

        })
    }

    // Remove note from DB based on the current note
    const removeNoteDB = noteID => {

        return new Promise((resolve, reject) => {
            try {
                db.collection('notes').deleteOne({ _id: new ObjectId(noteID) }, (err, obj) => {
                    if (err) return reject(err);

                    resolve(obj);
                });

            } catch (err) {
                reject(err);
            }
        });
    }

    // Remove page and cascade delete notes
    const removePageDB = pageName => {

        return new Promise((resolve, reject) => {
            try {
                db.collection('pages').deleteOne({ title: pageName }, (err, pageObj) => {
                    if (err) return reject(err);

                    if (pageObj) {
                        db.collection('notes').deleteMany({ page: pageName }, (err, obj) => {
                            if (err) return reject(err);

                            resolve(pageObj);
                        });
                    }
                    else {
                        throw new Error('No page to delete.');
                    }

                });

            } catch (err) {
                reject(err);
            }
        });
    }

    // Get all pages
    const retrievePagesDB = () => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('pages').find().sort({ _id: 1 }).toArray((err, items) => {
                    if (err) return reject(err);

                    resolve(items);
                });

            } catch (err) {
                reject(err);
            }

        })
    }

    // Find a page
    const findPageDB = pageName => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('pages').findOne({ title: pageName }, (err, obj) => {
                    if (err) return reject(err);

                    resolve(obj != null);
                });

            } catch (err) {
                reject(err);
            }

        })
    }

    // Add page object to db
    const addPageDB = page => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('pages').insertOne(page, (err, result) => {
                    if (err) throw reject(err);

                    resolve(result.insertedId.toString());
                });

            } catch (err) {
                reject(err);
            }
        });
    }

    // Find a user based on email
    const findUser = email => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('users').findOne({ email: email }, (err, user) => {
                    if (err) return reject(err);

                    resolve(user);
                });

            } catch (err) {
                reject(err);
            }

        })
    }

    // Find a user by _id
    const findUserById = id => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('users').findOne(ObjectId(id), async (err, user) => {
                    if (err) return reject(err);

                    const userObj = await user;
                    resolve(userObj);
                });

            } catch (err) {
                reject(err);
            }

        });
    }

    // Add user object to db
    const addUser = user => {

        return new Promise((resolve, reject) => {

            try {
                db.collection('users').insertOne(user, (err, result) => {
                    if (err) throw reject(err);

                    resolve(result.insertedId.toString());
                });

            } catch (err) {
                reject(err);
            }
        });
    }

    // Remove user from DB based on email
    const removeUserDB = email => {

        return new Promise((resolve, reject) => {
            try {
                db.collection('users').deleteOne({ email : email}, (err, obj) => {
                    if (err) return reject(err);

                    resolve(obj);
                });

            } catch (err) {
                reject(err);
            }
        });
    }

    const close = () => dbClient.close();

    const isConnected = () => dbClient.isConnected();

    const getClient = () => dbClient;

    const getCheck = () => check;

    return {
        addNote: addNoteDB,
        retrieveNotes: retrieveNotesDB,
        removeNote: removeNoteDB,
        retrievePages: retrievePagesDB,
        addPage: addPageDB,
        findPage: findPageDB,
        removePage: removePageDB,
        connect : connectToDB,
        findUser : findUser,
        findUserById : findUserById,
        addUser : addUser,
        removeUser : removeUserDB,
        close : close,
        isConnected : isConnected,
        getClient : getClient
    };

})();
