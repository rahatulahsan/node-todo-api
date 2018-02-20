//For Assertions
const expect = require('expect');
// test Express routes
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Dummy test data for GET todos
const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

//Will remove every todo before each test request and and dummy data for GET /todos
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            //Checking DB also
            Todo.find({text}).then((todos) => {
                //Expect 1 todo as we are creating 1
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();

            }).catch((e) => done(e));
        });
    });

    //Confirm that no BAD DATA is created if we send bad request
    it('should not create todo with invalid Body Data', (done) => {

        request(app)
        .post('/todos')
        .send({})
        .expect(400)

        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});


// GET /todo test

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});