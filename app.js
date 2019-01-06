var express = require('express');
var app = express();
var path = require ('path');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./kioscogenesis-26031-firebase-adminsdk-mjxw1-7ff25d47c3.json");


// ACA ESPECIFICO LOS DIRECTORIO DE ARCHIVOS ESTATICOS
app.use(express.static(__dirname + '/pages/login'));
app.use(express.static(__dirname + '/pages/login'));
app.use(express.static(__dirname + '/pages/login'));


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
    res.sendFile(path.join(__dirname + '/pages/login/login.html'));
});

app.get('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/ventas/ventas.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/productos/productos.html'));
});
app.get('/firebase', (req, res) => {
    
    //ref.push(productos);
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/ventas/ventas.html'));
})

// FIN ROUTES

app.listen(3000, function(){
    console.log('Se abrio el servidor en el puerto 3000');
});




