
    const enviarDatos = (accion) => {
        
        const inputNombre = $('#nombreP').val();
        console.log(accion);
        let datos = {
            'Producto': {
              'codigoInterno': '',
              'ean': '',
              'nombre': inputNombre,
              'preciodeVenta': '',
              'cantidad': ''
            },
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
  
    




    



