
let tot_reset = 0
let risposteQ1 = [ "function swap(a, b){", "let x; x = a; a = b; b = x;", "return }" ]
let risposteQ2 = [ "$(\"#element\").click( function() {", "alert(\"TechWeb\")", "})" ]
let risposteQ3 = [ "function assign() {", "$(\"#element\").innerText = text", "}" ]
let qestion = ["complete function at 'click' event with JQuery,the function should bring up a warning window","complete function to insert text into an HTML element with id = \"element\""]
let count_question = 0
let correct_risp_user = 0
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
            $.ajax({
                url:'http://localhost:5000/api/update-quiz',
                type:'POST',
                dataType : 'json',
                data:
                    {
                        name: name_user_for_point,
                        quiz: 'JS',
                        stato: 1
                    },

                success: function (result){
                    console.log(result)
                }
            })
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
    $("#id_question_quiz").show()
    $("#container_start").hide()
    timerStart()
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
                point: 1,
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
    $("#id_question_quiz").hide()
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
    $("#id_question_quiz").show()
    $("#question").text(qestion[count_question])
    count_question = count_question + 1

    timerStart()
    $('.circle_animation').show();


    $("#cella_utent1").empty()
    $("#cella_utent2").empty()
    $("#cella_utent3").empty()


    if(tot_reset === 1){
        $("#container_cella_1").empty()
        let cella1 = document.createElement("code")
        cella1.innerHTML = "<code id=\"id_drop1\" draggable=\"true\" ondragstart=\"drag(event)\">$(\"#element\").click( function() {</code>"
        document.getElementById("container_cella_1").appendChild(cella1)

        $("#container_cella_2").empty()
        let cella2 = document.createElement("code")
        cella2.innerHTML = "<code id=\"id_drop2\" draggable=\"true\" ondragstart=\"drag(event)\">function().ready {</code>"
        document.getElementById("container_cella_2").appendChild(cella2)

        $("#container_cella_3").empty()
        let cella3 = document.createElement("code")
        cella3.innerHTML = "<code id=\"id_drop3\" draggable=\"true\" ondragstart=\"drag(event)\">document.ready( {</code>"
        document.getElementById("container_cella_3").appendChild(cella3)

        $("#container_cella_4").empty()
        let cella4 = document.createElement("code")
        cella4.innerHTML = "<code id=\"id_drop4\" draggable=\"true\" ondragstart=\"drag(event)\">alert(\"TechWeb\")</code>"
        document.getElementById("container_cella_4").appendChild(cella4)

        $("#container_cella_5").empty()
        let cella5 = document.createElement("code")
        cella5.innerHTML = "<code id=\"id_drop5\" draggable=\"true\" ondragstart=\"drag(event)\">printf(\"TechWeb\")</code>"
        document.getElementById("container_cella_5").appendChild(cella5)

        $("#container_cella_6").empty()
        let cella6 = document.createElement("code")
        cella6.innerHTML = "<code id=\"id_drop6\" draggable=\"true\" ondragstart=\"drag(event)\">console.log(\"TechWeb\")</code>"
        document.getElementById("container_cella_6").appendChild(cella6)

        $("#container_cella_7").empty()
        let cella7 = document.createElement("code")
        cella7.innerHTML = "<code id=\"id_drop7\" draggable=\"true\" ondragstart=\"drag(event)\">return })</code>"
        document.getElementById("container_cella_7").appendChild(cella7)

        $("#container_cella_8").empty()
        let cella8 = document.createElement("code")
        cella8.innerHTML = "<code id=\"id_drop8\" draggable=\"true\" ondragstart=\"drag(event)\">})</code>"
        document.getElementById("container_cella_8").appendChild(cella8)

        $("#container_cella_9").empty()
        let cella9 = document.createElement("code")
        cella9.innerHTML = "<code id=\"id_drop9\" draggable=\"true\" ondragstart=\"drag(event)\">Null</code>"
        document.getElementById("container_cella_9").appendChild(cella9)

    } else {
        $("#container_cella_1").empty()
        let cella1 = document.createElement("code")
        cella1.innerHTML = "<code id=\"id_drop1\" draggable=\"true\" ondragstart=\"drag(event)\">assign() {</code>"
        document.getElementById("container_cella_1").appendChild(cella1)

        $("#container_cella_2").empty()
        let cella2 = document.createElement("code")
        cella2.innerHTML = "<code id=\"id_drop2\" draggable=\"true\" ondragstart=\"drag(event)\">assign():</code>"
        document.getElementById("container_cella_2").appendChild(cella2)

        $("#container_cella_3").empty()
        let cella3 = document.createElement("code")
        cella3.innerHTML = "<code id=\"id_drop3\" draggable=\"true\" ondragstart=\"drag(event)\">function assign() {</code>"
        document.getElementById("container_cella_3").appendChild(cella3)

        $("#container_cella_4").empty()
        let cella4 = document.createElement("code")
        cella4.innerHTML = "<code id=\"id_drop4\" draggable=\"true\" ondragstart=\"drag(event)\">$(\"#element\").innerText = text</code>"
        document.getElementById("container_cella_4").appendChild(cella4)

        $("#container_cella_5").empty()
        let cella5 = document.createElement("code")
        cella5.innerHTML = "<code id=\"id_drop5\" draggable=\"true\" ondragstart=\"drag(event)\">element = text</code>"
        document.getElementById("container_cella_5").appendChild(cella5)

        $("#container_cella_6").empty()
        let cella6 = document.createElement("code")
        cella6.innerHTML = "<code id=\"id_drop6\" draggable=\"true\" ondragstart=\"drag(event)\">document.body.innerText = text</code>"
        document.getElementById("container_cella_6").appendChild(cella6)

        $("#container_cella_7").empty()
        let cella7 = document.createElement("code")
        cella7.innerHTML = "<code id=\"id_drop7\" draggable=\"true\" ondragstart=\"drag(event)\">}</code>"
        document.getElementById("container_cella_7").appendChild(cella7)

        $("#container_cella_8").empty()
        let cella8 = document.createElement("code")
        cella8.innerHTML = "<code id=\"id_drop8\" draggable=\"true\" ondragstart=\"drag(event)\">return text }</code>"
        document.getElementById("container_cella_8").appendChild(cella8)

        $("#container_cella_9").empty()
        let cella9 = document.createElement("code")
        cella9.innerHTML = "<code id=\"id_drop9\" draggable=\"true\" ondragstart=\"drag(event)\">return }</code>"
        document.getElementById("container_cella_9").appendChild(cella9)
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



function timerStart(){
    var time_out = "Time out";
    /* variabile bool per controllare se i numeri < 10 devono essere spostati*/
    var check=0
    /*per cambiare font size alla scritta Time out*/
    var result_time_out = time_out.fontsize(6);
    let timer = 60;
// Update the count down every 1 second
    let x = setInterval(function() {
        timer -= 1
        document.getElementById("timer_value").innerText = timer;
        /*per spostare i numeri al centro*/
        if(timer < 10) {
            document.getElementById("timer_value").style.marginLeft = "25px";
            check = 1
        }
        if (timer <= 0) {
            clearInterval(x);
            /*per nascondere l'animazione del timer*/
            $('.circle_animation').hide();
            $("#risp_errata").show()
            $("#risp_corretta").hide()
            $("#game_").hide()
            $("#timer").hide()
            $("#confirm_button").hide()
            $("#id_question_quiz").hide()
            $("#reset_button").show()
            $('#riassunto_game').show()
            document.getElementById("timer_value").innerHTML = result_time_out;
            if(check===1){
                check = 0
                document.getElementById("timer_value").style.marginLeft = "10px";
            }
        }
        /*quando clicca su conferma ed il tempo non è ancora finito, si blocca il tempo */
        let confirmButton = document.getElementById("input_button")
        confirmButton.addEventListener("click", () => {
            clearInterval(x)
            $('.circle_animation').hide();
            document.getElementById("timer_value").innerHTML = result_time_out;
            /* document.getElementById("confirm_btn").style.display = "none" */
            timer = 60
        })
        let nextButton = document.getElementById("reset_button")
        nextButton.addEventListener("click", () => {
            clearInterval(x)
            document.getElementById("timer_value").innerHTML = 60
            /* document.getElementById("confirm_btn").style.display = "none" */
        } )
    }, 1000);
}