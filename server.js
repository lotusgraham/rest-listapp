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

Storage.prototype.removeitem = function (id){
    this.items.forEach(function(item){
        if (item.id === parseInt(id, 10)) {
            console.log(item);
            var index = storage.items.indexOf(item);

            storage.items.splice(index, 1);
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

app.delete('/items/:id', function(req, res){
    // storage.({
    //     id: req.params.id
    // });

    console.log(req.body);
    var id = req.params.id;
    storage.removeitem(id);

    res.status(200).json(storage.items);

});



app.listen(process.env.PORT || 8080);
