

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

function start_game(){
    window.location = 'page2.html'
}

