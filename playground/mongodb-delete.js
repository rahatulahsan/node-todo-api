//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   //ES6 destructuring



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to MongoDB Server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    //Challange

    // db.collection('Users').deleteMany({name: 'Rahatul'}).then((result) => {
    //     console.log(result);
    // });

    
    db.collection('Users').findOneAndDelete(
        {_id: new ObjectID("5a831cf465691c2bb0331a9d")
    }).then((result) => {
        console.log(result);
    });


   // db.close();
});