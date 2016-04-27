var express = require('express');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {
        name: name,
        id: this.id
    };
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.removeitem = function(id) {
    this.items.forEach(function(item) {
        if (item.id === parseInt(id, 10)) {
            console.log(item);
            var index = storage.items.indexOf(item);
            storage.items.splice(index, 1);
        }
    });
};

Storage.prototype.editItem = function(requestObj) {
    console.log("Edit item method argument: ", requestObj);
    this.items.forEach(function(item) {
        if (item.id === requestObj.id) {
            console.log("Storage Item Before: ", item);
            item.name = requestObj.name;
            console.log("Storage Item After: ", item);
        }
    });

};

var storage = new Storage();
storage.add('A New Car!');
storage.add('Bluetooth Headset');
storage.add('Macbook Air');

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
    storage.removeitem(id);
    res.status(200).json(storage.items);
});

app.put('/items/:id', jsonParser, function(req, res) {
    console.log("Request Body: ", req.body);
    storage.editItem(req.body);
    res.status(200);
});

app.listen(process.env.PORT || 8080);
