var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb+srv://dbTammy:%4D%73%77%6B%38%30%38%21@todo-rev65.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  });

var todoSchema = mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

    app.use(bodyParser());
    app.use(cors());

 
    app.get('/', (req, res) => {
        Todo.find({}, (err, data) => {
            if(err) throw err;
            console.log('Get: ' + data);
            res.end(JSON.stringify({items:data}));
        });
        
    });

    app.post('/newitem', (req, res) => {

        console.log(req.body);
        
        var newTodo = Todo(req.body).save((err, data) => {
            if (err) throw console.log(err);
            console.log('Post: ' + data);
            res.end(JSON.stringify({items: data}));
        });

        
        /*

        var newTodo = Todo(req.body).save()
            .then(() => {
                res.end(JSON.stringify({todos: data}));
            }).catch(err => res.status(400).json('Err' + err));

        -----------------
        
            Async () => {
                try{
                    const newTodo = await Todo(req.body).save()
                    res.end(JSON.stringify({todos: newTodo}));
                }catch(err){
                    res.status(400).json('Err' + err);
                }
            }*/
        
        
    });

    app.delete('/:item', (req, res) => {
        
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if(err) throw err;
            console.log('Delete: ' + data);
            res.end(JSON.stringify({items: data}));
        });
    });

//listen to port
app.listen(5000);
console.log('\nListening port 5000.\n');