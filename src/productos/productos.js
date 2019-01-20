let datosBase = "";
let codigoDeEdicion = "";
const consumirJson = () => { 
     $.getJSON( "/json" , function(data){
                datosBase = data;
                $('#productosList').html('');
                $('input').val('');
                $.each(data, function(i, dato){
                
                    
                    $('#productosList').append(`
                    <tr class="itemProducto">
                        <td>${dato.codigoInterno}</td>
                        <td>${dato.nombre} </td>
                        <td>${dato.ean} </td>
                        <td>${dato.preciodeVenta} </td>
                        <td>${dato.cantidad}</td>
                        <td><div class="row">
                        <button id="editar" onclick="preEditar('${i}')" class="btn btn-sm btn-success"><i class="fas fa-pencil-alt"></i> Editar</button>
                        <button id="eliminar" onclick="eliminar('${i}')" class="btn btn-sm btn-danger"><i class="fas fa-times"></i> Eliminar</button> </div> </td> </tr>`)
                        
                        
                })
    })
}

function recargar(){  
    $.ajax({
    url: '/api/producto',
    type: "GET",
    dataType: "json",

})}

const preEditar = (index) => {
    console.log(index)
    let nombreProducto = $('#nombreProducto').val();
    let codigoInterno = $('#codigoInterno').val();
    let ean = $('#ean').val();
    let precioVenta = $('#precioVenta').val();
    let stock = $('#stock').val();
    $('#botonAgregar').addClass('d-none')
                      .removeClass('d-block')
    $('#botonEditar').addClass('d-block')
                     .removeClass('d-none')
    $.ajax({
        url: '/api/producto/' + index,
        type: 'get',
        dataType: 'json',

    }).done(function(respuesta){
         console.log(respuesta)
         nombreProducto = $('#nombreProducto').val(respuesta.nombre);
         codigoInterno = $('#codigoInterno').val(respuesta.codigoInterno);
         ean = $('#ean').val(respuesta.ean);
         precioVenta = $('#precioVenta').val(respuesta.preciodeVenta);
         stock = $('#stock').val(respuesta.cantidad);
         return codigoDeEdicion = respuesta.id
    })
    
    
}

const editar = () => {
    let nombreProducto = $('#nombreProducto').val();
    let codigoInterno = $('#codigoInterno').val();
    let ean = $('#ean').val();
    let precioVenta = $('#precioVenta').val();
    let stock = $('#stock').val();
    console.log();
    $('#botonEditar').addClass('d-none')
                    .removeClass('d-block')
    $('#botonAgregar').addClass('d-block')
                     .removeClass('d-none')
    let datos = {
                        'codigoInterno': codigoInterno,
                        'ean': ean,
                        'nombre': nombreProducto,
                        'preciodeVenta': precioVenta,
                        'cantidad': stock
     }



    $.ajax({
        url: '/api/producto/'+ codigoDeEdicion,
        type: "put",
        dataType: "json",
        data: datos
        })
    .done(function(){
        // llamo a esta funcion que recarga los datos en tiempo real
        consumirJson()
        })
}



const eliminar = (index) => {
    $.ajax({
        url: '/api/producto/'+index,
        type: "delete",
        dataType: "json",
        //data: datos
    })
    .done(function(){
        consumirJson()
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
    if (nombreProducto && codigoInterno && ean && precioVenta && stock)
    {
        $.ajax({
            url: accion,
            type: "POST",
            dataType: "json",
            data: datos
        }).done(function(){
            consumirJson()
            
        })
        
        
    }
    else{
        alert('hay campos vacios')
    }
    
    
    
    
    /*$.post(accion, datos, (response) => {
        console.log('El INDEX RESPONDE' + response);
    })*/
    
    
};
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        enviarDatos('/api/producto')
    }
});

consumirJson()
