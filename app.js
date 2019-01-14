var express = require('express');
var app = express();
var path = require ('path');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./kioscogenesis-26031-firebase-adminsdk-mjxw1-e30be1f7d1.json");


// ACA ESPECIFICO LOS DIRECTORIO DE ARCHIVOS ESTATICOS
app.use(express.static(__dirname + '/dist/bundle.js'));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/ventas/'));
app.use(express.static(__dirname + '/src/ventas/ventas.css'));
app.use(express.static(__dirname + '/src/ventas/ventas.js'));
app.use(express.static(__dirname + '/src/login/'));
app.use(express.static(__dirname + '/src/login/login.js'));
app.use(express.static(__dirname + './src/login/login.css'));
app.use(express.static(__dirname + '/src/productos/'));
app.use(express.static(__dirname + '/src/productos/productos.js'));
app.use(express.static(__dirname + '/src/productos/productos.css'));
app.use(express.static(__dirname + '/dist/css'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/images'));
app.use(express.static(__dirname + '/dist/bundle.js'));


// ACA INICIO TODO LO RELACIONADO A FIREBASE Y TIRO UNA PRUEBA EN CONSOLA
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kioscogenesis-26031.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/Producto");
var refVenta = db.ref("/Ventas");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
// -----------------------    Fin Firebase

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/login/login.html'))
    console.log('estas en la home')
});

app.get('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ventas/ventas.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/productos/productos.html'));
    
});
app.get('/firebase', (req, res) => {
    
    //ref.push(productos);
    res.sendFile(path.join(__dirname + '/src/start.html'));
});

/*// ACA HAGO LOS ROUTES PERO UTTILIZANDO THEME
app.post('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ventas/ventas.html'));
});*/
// FIN ROUTES

// ACA VOY A HACER UNA PEQUEÑA API REST PARA ENVIAR A FIREBASE
app.post('/pushProductos', (req, res) => {
    //console.log(req)
    //console.log(res)
    
    let datosRecibidos = req.body;
    console.log(datosRecibidos);
    ref.push(datosRecibidos);
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
      })
    
});
app.post('/update', (req, res) => {
    let datosRecibidos = req.body;
    ref.update(datosRecibidos);
});


app.listen(3000, function(){
    console.log('Se abrio el servidor en el puerto 3000');
});




