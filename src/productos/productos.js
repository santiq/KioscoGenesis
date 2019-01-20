let datosBase = "";
const consumirJson = () => { 
     $.getJSON( "/json" , function(data){
                datosBase = data;
                $.each(data, function(i, dato){
                    
                    console.log(dato.nombre + dato.codigoInterno);
                    console.log(dato.codigoInterno);
                    $('#productosList').append(`
                    <tr class="itemProducto">
                        <td>${dato.codigoInterno}</td>
                        <td>${dato.nombre} </td>
                        <td>${dato.ean} </td>
                        <td>${dato.precioVenta} </td>
                        <td>${dato.cantidad}</td>
                        <td><div class="row">
                        <button id="editar" onclick="" class="btn btn-sm btn-success"><i class="fas fa-pencil-alt"></i> Editar</button>
                        <button id="eliminar" onclick="" class="btn btn-sm btn-danger"><i class="fas fa-times"></i> Eliminar</button> </div> </td> </tr>`)
                        
                        
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




    /*$.post(accion, datos, (response) => {
       console.log('El INDEX RESPONDE' + response);
    })*/


};

consumirJson()
