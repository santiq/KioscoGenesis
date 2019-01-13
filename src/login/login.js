
const cambioPagina = (pagina) => {
    $.post( pagina) 
      
   
}

const validar = () => {

    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if (usuario === "kiosko" && contraseña === "genesis"){
        
        cambioPagina('/ventas')

    }

    else {
        alert("Ingresa un usuario o contraseña validos")
    }
}

export {cambioPagina, validar}