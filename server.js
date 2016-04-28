var express = require('express');
var Storage = require('./storage.js'); // requiring our Storage constructor

var storage = new Storage();

var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    storage.remove(id);
    res.status(200).json(storage.items);
});

app.put('/items/:id', jsonParser, function(req, res) {
    storage.edit(req.body);
    res.status(200);
});

app.listen(process.env.PORT || 8080);
