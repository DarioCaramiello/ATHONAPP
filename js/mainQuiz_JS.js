let risultato=0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop (ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function verifica_quiz() {
    let count_ris = 0;
    let risp_row1 = "def"
    let risp_row2 = "gamma"
    let risp_row3 = ">"

    let x = document.getElementById("cella_utent1").innerText
    let y = document.getElementById("cella_utent2").innerText
    let z = document.getElementById("cella_utent3").innerText

    if ( x===risp_row1 ) {
        count_ris += 1
    }
    if ( y === risp_row2 ) {
        count_ris += 1
    }
    if ( z === risp_row3 ) {
        count_ris += 1
    }

    if(count_ris === 3 ){
        document.getElementById("risp_corretta").style.display = "block"
    } else {
        document.getElementById("risp_errata").style.display = "block"
    }

    /* da implementare la funzione per aggiungere i punti ( serve conoscenza lato server ) */

    console.log(x)
    console.log(y)
    console.log(z)
}

//timer

/*
let timer = 60;
// Update the count down every 1 second
let x = setInterval(function() {
    timer = timer - 1;

    document.getElementById("timer").innerHTML = timer;
    /
    if (timer < 0) {
        clearInterval(x);
       let timerValue = document.getElementById("timer").innerHTML = "EXPIRED";
    }
    /*if (timerValue=="EXPIRED")
    {
        nextquestion() ipotetica funzione per andare alla prossima domanda senza incrementare il risultato
    }
}, 1000);
*/

