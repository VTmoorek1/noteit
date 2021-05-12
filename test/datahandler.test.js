const dbHandler = require('../server/datahandler');
const { Binary } = require('bson');


describe('basic database functionality', () => {
    test('connect to db success promise resolves', async () => {
        await expect(dbHandler.connect()).resolves.not.toThrow();
    });

    test.skip('successful connect to database outputs success', async () => {
        console.log = jest.fn();
        await dbHandler.connect();

        expect(console.log).toHaveBeenCalledWith('success');
    });

    test('the database closes correctly',  () => {
        dbHandler.close();

        expect(dbHandler.isConnected()).toBeFalsy();
    });

    afterEach(() => {
        dbHandler.close();
    });
});

describe('note functionality', () => {
    beforeAll(async () => {
        await dbHandler.connect();
    });

    
    const buffer = Buffer.from('this is a test');
    

    test('a note is added to the db', async () => {
        
        const noteData = {
            title: 'req.body.title',
            desc: 'req.body.desc',
            user: 'kevin',
            page: 'whatever the page is',
            file: {
                name: 'test file',
                type: '.gif',
                size: buffer.length,
                buffer: buffer
            }
        };
        const noteId = await dbHandler.addNote(noteData);
        
        expect(noteId).toMatch(/^[0-9a-z]{24}$/);
    });

    test('retrieve notes from db', async () => {
        
        const pageName = 'Sports';
        const notes = await dbHandler.retrieveNotes(pageName);

        expect(notes.length).toBe(1);
        expect(notes[0]).toHaveProperty('_id','desc','page','file','user');
        expect(notes[0].file).toHaveProperty('name','type','size','buffer');

        const fileBuffer = notes[0].file.buffer;
      //  expect(typeof fileBuffer).toBe('string');

        //const array = base64ToArrayBuffer(fileBuffer);
        expect(fileBuffer).toBeInstanceOf(Binary);
    });

    test('a note is deleted from the db', async () => {
        const noteData = {
            title: 'req.body.title',
            desc: 'req.body.desc',
            user: 'kevin',
            page: 'whatever the page is',
            file: {
                name: 'test file',
                type: '.gif',
                size: buffer.length,
                buffer: buffer
            }
        };
        const noteId = await dbHandler.addNote(noteData);
        const removedObj = await dbHandler.removeNote(noteId);
        
        expect(removedObj).toMatchObject({deletedCount : 1});
    });

    afterAll( () => {
        dbHandler.close();
    });
});

describe('page functionality', () => {
    beforeAll(async () => {
        await dbHandler.connect();
    });

    test('find a page from the db', async () => {
        
        const pageName = 'Sports';
        const foundPage = await dbHandler.findPage(pageName);
        
        expect(foundPage).toBeTruthy();
    });

    test('add a page to the system', async () => {

        const page = {
            title: 'Weather'
        };

        const pageId = await dbHandler.addPage(page);

        expect(pageId).toMatch(/^[0-9a-z]{24}$/);
    });

    test('retrieve all pages', async () => {

        const pages = await dbHandler.retrievePages();

        expect(pages).toHaveLength(3);

        expect(pages).toEqual(expect.arrayContaining([expect.objectContaining({title: 'Sports'},
            expect.objectContaining({title: 'News'}),expect.objectContaining({title: 'Weather'}))]));
    });

    test('delete a page from the db', async () => {
        const pageName = 'Weather';
        const removedObj = await dbHandler.removePage(pageName);
        
        expect(removedObj).toMatchObject({deletedCount : 1});
    });


    afterAll( () => {
        dbHandler.close();
    });
});


describe('user functionality', () => {
    beforeAll(async () => {
        await dbHandler.connect();
    });

    let userId = 0;

    test('add a user to the system', async () => {

        const userObj = {
            email : '4@4.com',
            name : 'Ken',
            password : 'password'
        };

        userId = await dbHandler.addUser(userObj);

        expect(userId).toMatch(/^[0-9a-z]{24}$/);
    });

    test('find a user by id from the db', async () => {
        
        const userObj = await dbHandler.findUserById(userId);
        
        const matchUserObj = {
            email : '4@4.com',
            name : 'Ken'
        }

        expect(userObj).toMatchObject(matchUserObj);
    });

    test('find a user by email from the db', async () => {
        
        const email = '4@4.com'
        const userObj = await dbHandler.findUser(email);
        
        const matchUserObj = {
            email : '4@4.com',
            name : 'Ken'
        }

        expect(userObj).toMatchObject(matchUserObj);
    });

    test('delete a user from the db', async () => {
        const userEmail = '4@4.com';
        const removedObj = await dbHandler.removeUser(userEmail);
        
        expect(removedObj).toMatchObject({deletedCount : 1});
    });


    afterAll( () => {
        dbHandler.close();
    });
});

