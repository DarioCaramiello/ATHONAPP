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
    console.log("hi, by change_color()");
    let obj = document.getElementById("btn_id")
    if( obj.style.color === "white") {
        obj.style.color = "black"
    } else {
        obj.style.color = "white"
    }
}

/*  Funzioni per il cambio displey ( show - hidden ).
    Note : ho provato ad ottimizare la funzione come in 'change color ' solo che non puo essere
    ottmizzata perche altrimenti il senso logico verrebbe corrotto
*/
function change_display_on () {
    console.log("hi , by change_display_on()")
    document.getElementById("myForm").style.display = "block"
}

function change_display_off () {
    console.log("hi , by change_display_off()")
    document.getElementById("myForm").style.display = "none"
}



