

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

    let x = document.getElementById("cella_utent1").innerText
    let y = document.getElementById("cella_utent2").innerText
    let z = document.getElementById("cella_utent3").innerText

    if ( x===risp_row1 ) {
        count_ris += 1
    }
    if ( y === risp_row2 ) {
        count_ris += 1
    }

    if(count_ris === 2 ){
        document.getElementById("risp_corretta").style.display = "block"
    } else {
        document.getElementById("risp_errata").style.display = "block"
    }

    /* da implementare la funzione per aggiungere i punti ( serve conoscenza lato server ) */

    console.log(x)
    console.log(y)
    console.log(z)
}