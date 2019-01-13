var express = require('express');
var app = express();
var path = require ('path');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./kioscogenesis-26031-firebase-adminsdk-mjxw1-e30be1f7d1.json");


// ACA ESPECIFICO LOS DIRECTORIO DE ARCHIVOS ESTATICOS
app.use(express.static(__dirname + '/dist/js'));
app.use(express.static(__dirname + '/dist/css'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/images'));


// ACA INICIO TODO LO RELACIONADO A FIREBASE Y TIRO UNA PRUEBA EN CONSOLA
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kioscogenesis-26031.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
// -----------------------    Fin Firebase

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTES

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/login/login.html'));
});

app.get('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ventas/ventas.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/productos/productos.html'));
});
app.get('/firebase', (req, res) => {
    
    //ref.push(productos);
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// ACA HAGO LOS ROUTES PERO UTTILIZANDO THEME
app.post('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ventas/ventas.html'));
});
// FIN ROUTES

// ACA VOY A HACER UNA PEQUEÑA API REST PARA ENVIAR A FIREBASE
app.post('/push', (req, res) => {
    ref.push(req);
});
app.post('/update', (req, res) => {
    ref.update(req);
});


app.listen(3000, function(){
    console.log('Se abrio el servidor en el puerto 3000');
});




