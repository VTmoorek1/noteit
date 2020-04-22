const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
let db = null;

module.exports = (() => {

    connectToDB = () => {

        // Connect to mongodb, happens on server start
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {
                useUnifiedTopology: true
            }, (err, client) => {
                if (err) return reject(err);

                console.log('success');

                db = client.db('noteit');

                resolve();
            });

        });
    }

    // Add note object to db
    addNoteDB = (note) => {

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
    retrieveNotesDB = (pageID) => {

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
    };

    // Remove note from DB based on the current note
    removeNoteDB = (noteID) => {

        return new Promise((resolve, reject) => {
            try {
                db.collection('notes').deleteOne({ _id: ObjectId(noteID) }, (err, obj) => {
                    if (err) return reject(err);

                    resolve(obj);
                });

            } catch (err) {
                reject(err);
            }
        });
    };

    // Remove page and cascade delete notes
    removePageDB = (pageName) => {

        return new Promise((resolve, reject) => {
            try {
                db.collection('pages').deleteOne({ title: pageName }, (err, obj) => {
                    if (err) return reject(err);

                    if (obj) {
                        db.collection('notes').deleteMany({ page: pageName }, (err, obj) => {
                            if (err) return reject(err);

                            resolve(obj);
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
    };

    // Get all pages
    retrievePagesDB = () => {

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
    };

    // Find a page
    findPageDB = (pageName) => {

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
    };

    // Add page object to db
    addPageDB = (page) => {

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

    return {
        addNote: addNoteDB,
        retrieveNotes: retrieveNotesDB,
        removeNote: removeNoteDB,
        retrievePages: retrievePagesDB,
        addPage: addPageDB,
        findPage: findPageDB,
        removePage: removePageDB,
        connect : connectToDB
    };

})();