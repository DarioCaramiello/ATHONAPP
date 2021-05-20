/* funzione del cambio di colore migliorata */
function change_color() {
    let obj = document.getElementById("btn_id")
    if( obj.style.color === "white") {
        obj.style.color = "black"
    } else {
        obj.style.color = "white"
    }
}

function start_game(){
    window.location = 'page2.html'
}

