let datosBase = "";
const consumirJson = () => { 
     $.getJSON( "/json" , function(data){
                datosBase = data;
                $.each(data, function(i, dato){
                    
                    console.log(dato.nombre + dato.codigoInterno);
                    console.log(dato.codigoInterno);
                    $('#nombreListado').append("<p>" + dato.nombre + "</p>")
                    $('#codigoInternoList').append("<p>" + dato.codigoInterno + "</p>")
                    $('#eanListado').append("<p>" + dato.ean + "</p>")
                    $('#precioVentaListado').append("<p>" + dato.preciodeVenta + "</p>")
                    $('#stockListado').append("<p>" + dato.cantidad + "</p>")
                    $('#acciones').append("<p>" + i + "</p>")
                })
    })
}

const enviarDatos = (accion) => {
        
    const nombreProducto = $('#nombreProducto').val();
    const codigoInterno = $('#codigoInterno').val();
    const ean = $('#ean').val();
    const precioVenta = $('#precioVenta').val();
    const stock = $('#stock').val();
    console.log(accion);
    let datos = {
          'codigoInterno': codigoInterno,
          'ean': ean,
          'nombre': nombreProducto,
          'preciodeVenta': precioVenta,
          'cantidad': stock
        }
    

    console.log(datos);
    
    $.ajax({
        url: accion,
        type: "POST",
        dataType: "json",
        data: datos
    });

    consumirJson()


    /*$.post(accion, datos, (response) => {
       console.log('El INDEX RESPONDE' + response);
    })*/


};

consumirJson()
