;(function(){
    "use strict"

    var palabras = [
        "ALURA",
        "ORACLE",
        "JAVASCRIPT",
        "CSS",
        "HTML",
        "PROGRAMACION",
        "AÑO",
        "MAGIA",
        "MAKE IT"
    ]

    //variable para almacenar la config actual
    var juego = null

    //para ver ai ya se ha enviado alguna alerta
    var finalizado = false

    var $html = {
    hombre:document.getElementById("hombre"),
    adivinado:document.querySelector(".adivinado"),
    errado: document.querySelector(".errado")
}


function dibujar(juego){
    //actualizar imagen
    var $elem
    $elem = $html.hombre

    var estado = juego.estado
    if(estado === 8) {
        estado = juego.previo
    }

    $elem.src="./img/estados/0" + juego.estado + ".png";
    //creamos letras a adivinar
    var palabra = juego.palabra
    var adivinado = juego.adivinado
    $elem = $html.adivinado
    //borramos los elementos
    $elem.innerHTML = ""
    for (let letra of palabra){
        let $span = document.createElement("span")
        let $txt = document.createTextNode("")
        if(adivinado.indexOf(letra) >= 0){
            $txt.nodeValue = letra
        }
        $span.setAttribute("class", "letra adivinada")
        $span.appendChild($txt)
        $elem.appendChild($span)
    }

    var errado = juego.errado
    $elem = $html.errado
    $elem.innerHTML = ""
    //borramos los elementos anteriores
    for(let letra of errado){
        let $span = document.createElement("span")
        let $txt = document.createTextNode(letra)
        $span.setAttribute("class", "letra errada")
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
}

function adivinar(juego, letra){
    var estado = juego.estado
    //si ya se ha perdido, o ganado, no se hace nada
    if(estado === 1 || estado === 8){
        return
    }
    var adivinado = juego.adivinado
    var errado = juego.errado
    //si ya hemos adivinado o errado la letra tmp hay que hacer nada
    if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
        return
    }
    var palabra = juego.palabra
    var letras = juego.letras
    //si es letra de la palabra
    if(palabra.indexOf(letra) >= 0){
        let ganado = true
        //debemos ver si llegamos al estado ganado
        for(let l of palabra){
            if(adivinado.indexOf(l) < 0 && l != letra ){
                ganado = false
                juego.previo = juego.estado
                break
            }
        }
        //si ya se ha ganado, debemos indicarlo
        if(ganado){
            juego.estado = 8
        }
        //agregamos la letra, a la lista de letras adivinadas
        adivinado.push(letra)
    }
    else{
        //si no es letra de la palabra, acercamos al hombre un paso más de su ahorca
        juego.estado--
        //agregamos la letra, a la lista de letras erradas
        errado.push(letra)
    }
}

window.onkeypress = function adivinarLetra(e){
    var letra = e.key
    letra = letra.toUpperCase()
    if (/[^A-ZÑ]/.test(letra)){
        return
    }
    adivinar(juego, letra)
    var estado = juego.estado
    if(estado === 8){
        alert("Felicidades, ganaste! :)")
    } else if(estado === 1){
        let palabra = juego.palabra
        alert("Lo siento, perdiste.... :C la palabra era:  " + juego.palabra)
    }
    dibujar(juego)

}
    window.nuevoJuego =  function nuevoJuego(){
        var palabra =palabraAleatoria()
        juego = {}
        juego.palabra = palabra
        juego.estado = 7
        juego.adivinado = []
        juego.errado = []
        dibujar(juego)
    }

function palabraAleatoria(){
    var index = Math.floor(Math.random() * palabras.length)
    return palabras[index]
}

nuevoJuego()
console.log(juego)

}())