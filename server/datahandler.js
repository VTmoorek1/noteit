const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
let db = null;

module.exports = (() => {

    MongoClient.connect(url,{
        useUnifiedTopology : true
    }, (err,client) => {
        if (err) return console.log(err);

        console.log('success');

        db = client.db('noteit');
    });    

    addNoteDB = (note) => {

        return new Promise((resolve,reject) => {

            try {
                db.collection('notes').insertOne(note, (err,result) => {
                    if (err) throw reject(err);
        
                    resolve(result.insertedId.toString());
                });
                
            } catch (err)
            {
                reject(err);
            }
    });
}

    retrieveNotesDB = (pageID) => {
    
        return new Promise((resolve,reject) => {

        try {
            db.collection('notes').find({page : pageID}).sort({_id : 1}).toArray((err,items) => {
                if (err) return reject(err);

                resolve(items);
            });
            
        } catch (err)
        {
            reject(err);
        }

    })};

    removeNoteDB = (noteID) => {

        return new Promise ((resolve,reject) => {
            try {
                db.collection('notes').deleteOne({_id : ObjectId(noteID)}, (err,obj) => {
                    if (err) return reject(err);

                    resolve(obj);
                });

            } catch (err)
            {
                reject(err);
            }
        });
    };

    return {
        addNote : addNoteDB,
        retrieveNotes : retrieveNotesDB,
        removeNote : removeNoteDB
    };

})();