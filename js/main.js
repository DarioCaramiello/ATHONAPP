let playerName;
let point_rank;

function start_game() {
    console.log("Hi, by start_game()");
    playerName=  document.getElementById("nickname").value; //Salva nome giocatore
    console.log(playerName);
    location.href="page2.html"
    point_rank = 0;
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


/* funzione del cambio display migliorate */
function change_display() {
    let obj = document.getElementById("myForm")
    if( obj.style.display === "block" ) {
        obj.style.display = "none"
    } else {
        obj.style.display = "block"
    }
}

