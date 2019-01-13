
const cambioPagina2 = (pagina) => {
    $.post( pagina, (data) => {
       $("#contenedor").html(data);
    });
   
}
const enviarDatos = (accion, datos) => {
   let aEnviar = datos;
   console.log(accion);
   console.log(aEnviar + " ESTA ES LA PRIMERA");
   $.post( accion, aEnviar);
   
}