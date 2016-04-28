module.exports = Storage; // this now means we can export our Storage contsrutor anywhere in our app.
function Storage() {  // had to change the was the constructor was defined. exports doesn't seem to like var Storage = function();
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

Storage.prototype.remove = function(id) {
    var that = this; // storing current context of 'this' (the storage object) as it changes inside the forEach loop to the specific item the loop is on at that time.
    this.items.forEach(function(item) {
        if (item.id === parseInt(id, 10)) {
            var index = that.items.indexOf(item); // 'that' refers to the storage obj as noted above.
            that.items.splice(index, 1);          // previously we used 'storage' here instead of 'this/that'.
        }                                         // So the method would have broken if we'd called our storage anything but 'storage'
    });
};

Storage.prototype.edit = function(requestObj) {
    this.items.forEach(function(item) {
        if (item.id === requestObj.id) {
            item.name = requestObj.name;
        }
    });
};
