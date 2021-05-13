function start_game() {
    location.href="page2.html"
}


/* funzione del cambio di colore migliorata */
function change_color() {
    let obj = document.getElementById("btn_id")
    if( obj.style.color === "white") {
        obj.style.color = "black"
    } else {
        obj.style.color = "white"
    }
}

function for_cite_on() {
    let cite = document.getElementById("cite_intro").style
    cite.fontSize = "26pt"
    cite.color = "white"
}

function for_cite_off() {
    let cite = document.getElementById("cite_intro").style
    cite.fontSize = "20pt"
    cite.color = "black"
}

/*

  Funzioni per il cambio displey ( show - hidden ).
    Note : ho provato ad ottimizare la funzione come in 'change color ' solo che non puo essere
    ottmizzata perche altrimenti il senso logico verrebbe corrotto

function change_display_on () {
    document.getElementById("myForm").style.display = "block"
    document.getElementById("span_id").style.display = "none"
}

 */
