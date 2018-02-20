var express = require('express');
//Convert JSON to Object
var bodyParser = require('body-parser');


//Local Import
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//Setting middleware  //return function
app.use(bodyParser.json()); 

app.post('/todos', (req, res) => {
   var todo = new Todo({
        text: req.body.text
   });

   todo.save().then((doc) => {
       res.send(doc);
   }, (e) => {
       res.status(400).send(e);
   });
});

// GET REQUEST

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app};