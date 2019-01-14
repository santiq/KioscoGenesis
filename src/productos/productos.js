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


    /*$.post(accion, datos, (response) => {
       console.log('El INDEX RESPONDE' + response);
    })*/


}
