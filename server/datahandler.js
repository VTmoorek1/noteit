const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;
const MongoClient = require('mongodb').MongoClient;
let db = null;

module.exports = (() => {

    MongoClient.connect(url, (err,client) => {
        if (err) return console.log(err);

        console.log('success');

        db = client.db('noteit');
    });    

    addNoteDB = (note) => {

        db.collection('notes').insertOne(note, (err,result) => {
            console.log(result);

            if (err) throw err;
        });
    }

    return {
        addNote : addNoteDB
    };

})();