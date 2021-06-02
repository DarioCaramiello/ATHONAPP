
let tot_reset = 0

let risposteQ1 = [ "function swap(a, b){", "let x; x = a; a = b; b = x;", "return }" ]
let risposteQ2 = [ "a", "b", "c" ]
let risposteQ3 = [ "x", "y", "z" ]
let correct_risp_user = 0

let timer = 30;
let name_user_for_point = NaN

/* function onload document */
$("document").ready(function(){

    /* --- request server for id user --- */
    $.ajax({
        url: "http://localhost:5000/api/get-nickname",
        type: "POST",
        dataType: "json",
        success: function(result) {
            console.log("index_ricevuto : " + result["nickname"])
            name_user_for_point = result["nickname"]
        }
    })

    $("#game_").hide()
    $("#timer").hide()
    $("#confirm_button").hide()
    $("#riassunto_game").hide()
    $("#reset_button").hide()
    $("#container_start").show()
})


function show_game(){
    $("#timer").show()
    $("#game_").show()
    $("#confirm_button").show()
    $("#container_start").hide()
}

/* ---- function for drag and drop ---- */
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

/* ---- function for verify quiz ---- */
function verifica_quiz_2(a, b, c, x, y, z){

    if (a === x && b === y && c === z) {
        correct_risp_user+=1
        $("#risp_corretta").show()
        $("#risp_errata").hide()
        $.ajax({
            url: "http://localhost:5000/api/update-point",
            type: "POST",
            dataType: "text",
            data: {
                point: 100,
                name: name_user_for_point
            },
            success: function (result) {
                console.log(result)
            }
        })
    } else {
        $("#risp_errata").show()
        $("#risp_corretta").hide()
    }
}
function verifica_quiz() {

    $("#game_").hide()
    $("#timer").hide()
    $("#confirm_button").hide()
    $("#reset_button").show()

    $("#riassunto_game").show()


    let a = document.getElementById("cella_utent1").innerText
    let b = document.getElementById("cella_utent2").innerText
    let c = document.getElementById("cella_utent3").innerText

    switch (tot_reset) {
        case 0:
            verifica_quiz_2(risposteQ1[0], risposteQ1[1], risposteQ1[2], a, b, c)
            console.log("switch verifica quiz case 0")
            break
        case 1:
            verifica_quiz_2(risposteQ2[0], risposteQ2[1], risposteQ2[2], a, b, c)
            console.log("switch verifica quiz case 1")
            break
        case 2:
            verifica_quiz_2(risposteQ3[0], risposteQ3[1], risposteQ3[2], a, b, c)
            console.log("switch verifica quiz case 2")
            break
    }
}

/* function for rendering reset quiz */
function change_quiz() {
    $("#game_").show()
    $("#timer").show()
    $("#confirm_button").show()
    $("#riassunto_game").hide()
    $("#reset_button").hide()
    timer = 30

    if(tot_reset === 1){
        $("#id_drop1").html("<code id=\"id_drop1\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
        $("#id_drop2").html("<code id=\"id_drop2\" draggable=\"true\" ondragstart=\"drag(event)\">b</code>")
        $("#id_drop3").html("<code id=\"id_drop3\" draggable=\"true\" ondragstart=\"drag(event)\">c</code>")
        $("#id_drop4").html("<code id=\"id_drop4\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
        $("#id_drop5").html("<code id=\"id_drop5\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
        $("#id_drop6").html("<code id=\"id_drop6\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
        $("#id_drop7").html("<code id=\"id_drop7\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
        $("#id_drop8").html("<code id=\"id_drop8\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
        $("#id_drop9").html("<code id=\"id_drop9\" draggable=\"true\" ondragstart=\"drag(event)\">a</code>")
    } else {
        $("#id_drop1").html("<code id=\"id_drop1\" draggable=\"true\" ondragstart=\"drag(event)\">x</code>")
        $("#id_drop2").html("<code id=\"id_drop2\" draggable=\"true\" ondragstart=\"drag(event)\">y</code>")
        $("#id_drop3").html("<code id=\"id_drop3\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
        $("#id_drop4").html("<code id=\"id_drop4\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
        $("#id_drop5").html("<code id=\"id_drop5\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
        $("#id_drop6").html("<code id=\"id_drop6\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
        $("#id_drop7").html("<code id=\"id_drop7\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
        $("#id_drop8").html("<code id=\"id_drop8\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
        $("#id_drop9").html("<code id=\"id_drop9\" draggable=\"true\" ondragstart=\"drag(event)\">z</code>")
    }
}

/* function verify logic reset */
function reset() {
    tot_reset = tot_reset + 1
    console.log(tot_reset)

    if (tot_reset > 2) {
        $("#game_").hide()
        $("#timer").hide()
        $("#confirm_button").hide()
        $("#riassunto_game").hide()
        $("#reset_button").hide()
        $("#container_error_index").show()
    } else {
        change_quiz()
    }
}

function return_main_page() {
    window.location = 'page2.html'
}


var time_out = "Time out";
/* per cambiare font size alla scritta Time out */
var result_time_out = time_out.fontsize(15);
// Update the count down every 1 second

let x = setInterval(function () {
    timer -= 1
    document.getElementById("timer_value").innerText = timer;
    /*per spostare i numeri al centro*/
    if (timer < 10) {
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
}, 1000);