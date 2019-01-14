const cambioPagina = function(pagina) {
    $.post( pagina, function(data){
       $('#contenedor').html(data);
    });
   
}

