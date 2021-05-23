
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
    let risp_row1 = "while"
    let risp_row2 = "y"
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
var time_out = "Time out";
/*per cambiare font size alla scritta Time out*/
var result_time_out = time_out.fontsize(6);
let timer = 30;
// Update the count down every 1 second
let x = setInterval(function() {
    timer -= 1
    document.getElementById("timer_value").innerText = timer;
    /*per spostare i numeri al centro*/
    if(timer < 10) {
        document.getElementById("timer_value").style.marginLeft = "15px";
    }
    if (timer < 0) {
        clearInterval(x);
        document.getElementById("timer_value").style.marginLeft = "-40px";
        document.getElementById("timer_value").innerHTML = result_time_out;
        document.getElementById("timer_value").style.color = "#DDD92A";
        document.getElementById("timer_value").style.textShadow = "2px 2px 1px #ff0000,-2px -2px 1px #F56416, 2px -2px 1px #E28413, -2px 2px 1px #EA1744";
        /*per nascondere l'animazione del timer*/
        $('.circle_animation').hide();
        verifica_quiz();
    }
    let confirm_button_id = document.getElementById("input_button")
    /* quando clicca su conferma ed il tempo non è ancora finito, si blocca il tempo */
    confirm_button_id.addEventListener("click", () => {
        timer = 0;
        document.getElementById("confirm_button").style.display = "none"
    } )
}, 1000);
