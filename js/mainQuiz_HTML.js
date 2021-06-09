
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const confirmButton = document.getElementById('confirm-btn')
const questionContainerElement = document.getElementById('question_container')

/*costante per la singola domanda*/
const questionElement = document.getElementById('request')
const textArea = document.getElementById('question')

/*variabile per rendere random le domande*/
let randomQuestions, reset

const timer_value = document.getElementById('timer')
const circle1 = document.getElementById('circle_animation1')
const circle2 = document.getElementById('circle_animation2')
const circle3 = document.getElementById('circle_animation3')
const circle4 = document.getElementById('circle_animation4')
const circle5 = document.getElementById('circle_animation5')
const circle6 = document.getElementById('circle_animation6')
const circle7 = document.getElementById('circle_animation7')
const circle8 = document.getElementById('circle_animation8')
const circle9 = document.getElementById('circle_animation9')
const circle10 = document.getElementById('circle_animation10')
const outer_animation = document.getElementById('container_timer')

startButton.addEventListener('click', startGame)
confirmButton.addEventListener('click', verifyQuiz)
nextButton.addEventListener('click', nextQuestion)

let name_user_for_point = NaN

/* function onload document */
$("document").ready(function() {
    /* --- request server for id user --- */
    $.ajax({
        url: "http://localhost:5000/api/get-nickname",
        type: "POST",
        dataType: "json",
        success: function (result) {
            console.log("index_ricevuto : " + result["nickname"])
            name_user_for_point = result["nickname"]
            $.ajax({
                url: 'http://localhost:5000/api/update-quiz',
                type: 'POST',
                dataType: 'json',
                data:
                    {
                        name: name_user_for_point,
                        quiz: 'HTML',
                        stato: 1
                    },

                success: function (result) {
                    console.log(result)
                }
            })
        }
    })
})

function startAnimations(){
    circle1.style.animation = "timer-anim 6s ease-in forwards"
    circle2.style.animation = "timer-anim 6s ease-in forwards"
    circle2.style.animationDelay = "6s"
    circle3.style.animation = "timer-anim 6s ease-in forwards"
    circle3.style.animationDelay = "12s"
    circle4.style.animation = "timer-anim 6s ease-in forwards"
    circle4.style.animationDelay = "18s"
    circle5.style.animation = "timer-anim 6s ease-in forwards"
    circle5.style.animationDelay = "24s"
    circle6.style.animation = "timer-anim 6s ease-in forwards"
    circle6.style.animationDelay = "30s"
    circle7.style.animation = "timer-anim 6s ease-in forwards"
    circle7.style.animationDelay = "36s"
    circle8.style.animation = "timer-anim 6s ease-in forwards"
    circle8.style.animationDelay = "42s"
    circle9.style.animation = "timer-anim 6s ease-in forwards"
    circle9.style.animationDelay = "48s"
    circle10.style.animation = "timer-anim 6s ease-in forwards"
    circle10.style.animationDelay = "54s"
    outer_animation.style.animation = "outer_anim 20s infinite linear alternate"
}
function stopAnimations(){
    circle1.style.animationPlayState = "paused"
    circle2.style.animationPlayState = "paused"
    circle3.style.animationPlayState = "paused"
    circle4.style.animationPlayState = "paused"
    circle5.style.animationPlayState = "paused"
    circle6.style.animationPlayState = "paused"
    circle7.style.animationPlayState = "paused"
    circle8.style.animationPlayState = "paused"
    circle9.style.animationPlayState = "paused"
    circle10.style.animationPlayState = "paused"
    outer_animation.style.animationPlayState = "paused"
}

function startGame(){
    startButton.classList.add('hide')
    reset = 0
    startAnimations()
    timerStart()
    randomQuestions = Math.floor(Math.random()*3)
    questionContainerElement.classList.remove('hide')
    confirmButton.classList.remove('hide')
    nextQuestion()
}

function nextQuestion(){
    /*resetState()*/
    if(reset > 2){
        $('#container_timer').hide()
        $('#main-btn').show()
        $("#container_error_index").show()
        $('#riassunto_game').hide()
        $('#next-btn').hide()
        $('#timer').hide()
    }
    else { // esco e verifico i risultati VR
        $('.circle_animation').show()
        showQuestion(randomQuestions)
        reset = reset + 1
        $('#confirm-btn').show()
        $('#request').show()
        $('#question').show()
        $('#riassunto_game').hide()
        $('#next-btn').hide()
        timerStart()
        startAnimations()
    }
}

function showQuestion(){
    /*mostra il testo di una domanda che si trova nell'array question*/
    questionElement.innerText = questions_array[reset]['question']
    /*mostro il codice da correggere*/
    textArea.value = questions_array[reset]['code']
}


//timer
function timerStart(){
    var time_out = "Time out";
    /*per cambiare font size alla scritta Time out*/
    var result_time_out = time_out.fontsize(6);
    let timer = 60;
// Update the count down every 1 second
    let x = setInterval(function() {
        timer -= 1
        document.getElementById("timer_value").innerText = timer;
        /*per spostare i numeri al centro*/
        if(timer < 10) {
            document.getElementById("timer_value").style.marginLeft = "33px";
        }
        if (timer <= 0) {
            clearInterval(x);
            $('#confirm-btn').hide()
            $('#request').hide()
            $('#question').hide()
            $('#riassunto_game').show()
            $('#next-btn').show()
            $('#risp_errata').show()
            $('#risp_corretta').hide()
            document.getElementById("timer_value").style.marginLeft = "-25px";
            document.getElementById("timer_value").innerHTML = result_time_out;
            /*per nascondere l'animazione del timer*/
            $('.circle_animation').hide();
            stopAnimations()
        }
         /*quando clicca su conferma ed il tempo non è ancora finito, si blocca il tempo */
        confirmButton.addEventListener("click", () => {
            clearInterval(x)
            $('.circle_animation').hide();
            document.getElementById("timer_value").style.marginLeft = "-25px";
            document.getElementById("timer_value").innerHTML = result_time_out;
            /*document.getElementById("confirm_btn").style.display = "none"*/
            timer = 60
        } )

        nextButton.addEventListener("click", () => {
            clearInterval(x)
            document.getElementById("timer_value").style.marginLeft = "25px";
            document.getElementById("timer_value").innerHTML = 60
            startAnimations()
            /*document.getElementById("confirm_btn").style.display = "none"*/
        } )


    }, 1000);
}


/*array delle domande*/
const questions_array = [
    {
        question: "In questo esercizio ci sono 2 errori, trovali e corregili!",
        code: "<!doctype html>\n" +
                "<html lang=\"en\">\n" +
                "        <meta charset=\"UTF-8\">\n" +
                "        <meta name=\"viewport\"\n" +
                "              content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
                "        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
                "        <title>Document</title>\n" +
                "    </head>\n" +
                "    <body>\n" +
                "       <h1>Questo è un esercizio html!<h1>\n" +
                "    </body>\n" +
                "</html>",
        answer: "<!doctype html>\n" +
            "<html lang=\"en\">\n" +
            "    <head>\n" +
            "        <meta charset=\"UTF-8\">\n" +
            "        <meta name=\"viewport\"\n" +
            "              content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
            "        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
            "        <title>Document</title>\n" +
            "    </head>\n" +
            "    <body>\n" +
            "       <h1>Questo è un esercizio html!</h1>\n" +
            "    </body>\n" +
            "</html>"
    },
    {
        question: "In questo esercizio ci sono 3 errori, trovali e corregili!",
        code: "<!doctype html>\n" +
            "    <html lang=\"en\">\n" +
            "    <head>\n" +
            "        <meta charset=\"UTF-8\">\n" +
            "        <meta name=\"viewport\"\n" +
            "              content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
            "        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
            "        <title>Document</title>\n" +
            "    </head>\n" +
            "    <body>\n" +
            "       <p>Questo è un paragrafo<\p>\n" +
            "        <src=foto.jpg>\n" +
            "        <style>\n" +
            "            body \n" +
            "            background-image: ('foto.jpg');\n" +
            "        </style>\n" +
            "    </body>\n" +
            "    </html>",
        answer: "<!doctype html>\n" +
            "    <html lang=\"en\">\n" +
            "    <head>\n" +
            "        <meta charset=\"UTF-8\">\n" +
            "        <meta name=\"viewport\"\n" +
            "              content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
            "        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
            "        <title>Document</title>\n" +
            "    </head>\n" +
            "    <body>\n" +
            "       <p>Questo è un paragrafo<\p>\n" +
            "        <img src='foto.jpg'>\n" +
            "        <style>\n" +
            "            body \n" +
            "            background-image: url('foto.jpg');\n" +
            "        </style>\n" +
            "    </body>\n" +
            "    </html>"
    },
    {
        question: "In questo esercizio c'e' 1 errore, trovalo e corregilo!",
        code: "<!doctype html>\n" +
            "    <html lang=\"en\">\n" +
            "    <head>\n" +
            "        <meta charset=\"UTF-8\">\n" +
            "        <meta name=\"viewport\"\n" +
            "              content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
            "        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
            "        <title>Document</title>\n" +
            "    </head>\n" +
            "    <body>\n" +
            "        <a='http://www.google.com'></a>\n" +
            "    </body>\n" +
            "    </html>",
        answer: "<!doctype html>\n" +
            "    <html lang=\"en\">\n" +
            "    <head>\n" +
            "        <meta charset=\"UTF-8\">\n" +
            "        <meta name=\"viewport\"\n" +
            "              content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
            "        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
            "        <title>Document</title>\n" +
            "    </head>\n" +
            "    <body>\n" +
            "        <a href='http://www.google.com'></a>\n" +
            "    </body>\n" +
            "    </html>"
    }
]

function verifyQuiz() {
    let risposta = document.getElementById("question").value
    $('#confirm-btn').hide()
    $('#request').hide()
    $('#question').hide()
    $('#riassunto_game').show()
    $('#next-btn').show()
    stopAnimations()

    if(risposta === questions_array[reset-1]["answer"]) {
        $('#risp_corretta').show()
        $('#risp_errata').hide()
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
        console.log("Risposta Corretta")
    } else {
        $('#risp_errata').show()
        $('#risp_corretta').hide()
        console.log("Risposta errata")
    }
}

function return_main_page() {
    window.location = 'page2.html'
}