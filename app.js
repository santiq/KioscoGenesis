var express = require('express');
var app = express();
var path = require ('path');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/pepe', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function(){
    console.log('Se abrio el servidor en el puerto 3000');
});

