const cambioPagina = function(pagina) {
    $.post( pagina) 
      
   
}

function validar() {

    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if (usuario === "pako" && contraseña === "kioskogenesis"){
        
        cambioPagina('/ventas')

    }

    else {
        alert("Ingresa un usuario o contraseña validos")
    }
}