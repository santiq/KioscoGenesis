var express = require('express');
var app = express();
var path = require ('path');
var firebase = require('firebase');

app.use(express.static(__dirname + '/pages/login/'));
app.use(express.static(__dirname + '/pages/productos/'));
app.use(express.static(__dirname + '/pages/ventas/'));
app.use(express.static(__dirname + '/assets/'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/pages/login/login.html'));
});

app.get('/ventas', function(req, res){
    res.sendFile(path.join(__dirname + '/pages/ventas/ventas.html'));
});

app.get('/productos', function(req, res){
    res.sendFile(path.join(__dirname + 'pages/productos/productos.html'));
});


app.listen(3000, function(){
    console.log('Se abrio el servidor en el puerto 3000');
});


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
  
  var config = {
    apiKey: "AIzaSyCYfdRAKVO9REjsR3fmupP4gGjFfxijlFw",
    authDomain: "kioscogenesis-26031.firebaseapp.com",
    databaseURL: "https://kioscogenesis-26031.firebaseio.com",
    projectId: "kioscogenesis-26031",
    storageBucket: "kioscogenesis-26031.appspot.com",
    messagingSenderId: "320492236095"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }

 var database = firebase.database();
