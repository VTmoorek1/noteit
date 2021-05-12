const dbHandler = require('../server/datahandler');
let noteRouter = require('../server/note');
const app = require('express')();
const request = require('supertest');
const bodyParser = require('body-parser');

//Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

describe('note endpoint functionality', () => {

    beforeAll(async () => {
        await dbHandler.connect();

        noteRouter = noteRouter(dbHandler);

        app.use('/note',noteRouter.route);
    });

    let noteId;

    

    test('should POST a note and return note id.', async () => {

        const buffer = Buffer.from('this is a test');

        const response = await request(app).post('/note/addnote')
            .attach('file', buffer, 'custom_file_name.txt');

        noteId = response.text;

        expect(noteId).toMatch(/^[0-9a-z]{24}$/);
    });

    test('should remove a note with good staus', async () => {

        const response = await request(app).delete('/note/removenote/'+noteId);

        expect(response.status).toEqual(204);
    });

    test('should return an array of note objects', async () => {

        const response = await request(app).get('/note/getnotes/News');
        const noteObj = response.body[0];
        const matchObj = {
            user : 'Kevin',
            page : 'News',
            title : 'New news'
        }

        expect(noteObj).toMatchObject(matchObj);
    });

    afterAll(() => {
        dbHandler.close();
    });
});