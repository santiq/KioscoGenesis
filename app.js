var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
//var serviceAccount = require("./kioscogenesis-26031-firebase-adminsdk-mjxw1-e30be1f7d1.json");


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


// ACA INICIO TODO LO RELACIONADO A FIREBASE Y TIRO UNA PRUEBA EN CONSOLA {

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.project_id,
        "private_key_id": process.env.private_key_id,
        "clientEmail": process.env.client_email,
        "private_key": process.env.private_key.replace(/\\n/g, '\n')
    }),
    //admin.credential.cert(serviceAccount),
    databaseURL: "https://kioscogenesis-26031.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/Producto");
var refVenta = db.ref("/Ventas");

ref.once("value", function(snapshot) {
    //console.log(snapshot.val());

});

// -----------------------    Fin Firebase

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/json', (req, res) => {
    ref.once("value", function(snapshot) {
        res.send(snapshot.val());
        return snapshot.val();
    });


});

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

app.get('/api/producto/', (req, res) => {
    let productos = [];
    let prod = {};
    ref.once('value', function(snapshot) {
        Object.keys(snapshot.val()).forEach(key => {
            prod = {};
            prod = snapshot.val()[key];
            prod.id = key;
            productos.push(prod);
        });
        res.status(200).json(productos);
    });
});

app.get('/api/producto/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    ref.child(id).once('value', function(snapshot) {
        let prod = snapshot.val();
        prod.id = id;
        res.status(200).json(prod);
    });
});

app.post('/api/producto', (req, res) => {
    //Al usar POST se indica que se esta creando
    let datosRecibidos = req.body;
    console.log(datosRecibidos);
    let id = ref.push(datosRecibidos).key;
    ref.child(id).once('value', (snapshot) => {
        let producto = snapshot.val();
        producto.id = id;
        res.status(200).json({
            status: 200,
            message: "articulo creado",
            producto
        })
    })
});

app.delete('/api/producto/:id', (req, res) => {
    //Al usar DELETE se indica que se esta borrando datos
    let id = req.params.id;
    ref.child(id).remove();
    res.status(200).json({
        status: 200,
        message: "Articulo Eliminado"
    })
});

app.put('/api/producto/:id', (req, res) => {
    //Al usar PUT se indica que se esta actualizando todos los datos de un registro al mismo tiempo
    let datosRecibidos = req.body;
    let productId = req.params.id;
    ref.child(productId).once('value', function(snapshot) {
        if (snapshot != null) {
            ref.child(productId).set(datosRecibidos);
            res.status(200).json({
                status: 200,
                message: "Producto Actualizado"
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "El producto no existe"
            });
        }
    });
});


app.listen(3000, function() {
    console.log('Se abrio el servidor en el puerto 3000');
});