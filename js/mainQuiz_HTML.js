const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const confirmButton = document.getElementById('confirm-btn')
const questionContainerElement = document.getElementById('question_container')
/*costante per la singola domanda*/
const questionElement = document.getElementById('request')
const answerButtonsElement = document.getElementById('answer-buttons')
const textArea = document.getElementById('question')
/*variabile per rendere random le domande*/
let randomQuestions, currentQuestionIndex
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
nextButton.addEventListener('click',()=>{
    /*incremento il contatore*/
    currentQuestionIndex++
    nextQuestion()
})
confirmButton.addEventListener('click', correct_string)

function startGame(){
    startButton.classList.add('hide')
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
    outer_animation.style.animation = "outer_anim 60s linear forwards"
    timerStart()
    /*genera domande in ordine casuale all'interno dell'array*/
    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    confirmButton.classList.remove('hide')
    nextQuestion()
}

function nextQuestion(){
    /*resetState()*/
    showQuestion(randomQuestions[currentQuestionIndex])
}

function showQuestion(question){
    /*mostra il testo di una domanda che si trova nell'array question*/
    questionElement.innerText = question['question']
    /*mostro il codice da correggere*/
    textArea.value = question['code']
}

/*funzione per cancellare ogni volta le risposte*/
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    /*finche' c'e' un figlio*/
    while(answerButtonsElement.firstChild){
        /*viene rimosso*/
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    /*inseriamo nella variabile selectedButton il bottone premuto*/
    const selectedButton = e.target
    /*controllo se e' corretta*/
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    /*inserisco tutti i figli (bottoni) in un array per ciclarli con forEach()*/
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })


    if(randomQuestions.length > currentQuestionIndex + 1) {
        /*mostro il bottone next*/
        nextButton.classList.remove('hide')
    }else{
        /*restartButton.classList.remove('hide')*/
    }
}
/*funzione per aggiungere le classi correct e wrong*/
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        /*se la risposta e' corretta aggiungo la classe correct*/
        element.classList.add('correct')
    }else{
        /*se la risposta e' sbagliata aggiungo la classe wrong*/
        element.classList.add('wrong')
    }
}

/*funzione per rimuovere la classe correct e wrong*/
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
        if (timer < 0) {
            clearInterval(x);
            document.getElementById("timer_value").style.marginLeft = "-25px";
            document.getElementById("timer_value").innerHTML = result_time_out;
            document.getElementById("timer_value").style.color = "#DDD92A";
            document.getElementById("timer_value").style.textShadow = "2px 2px 1px #ff0000,-2px -2px 1px #F56416, 2px -2px 1px #E28413, -2px 2px 1px #EA1744";
            /*per nascondere l'animazione del timer*/
            $('.circle_animation').hide();
            verifica_quiz();
        }
        let confirm_button_id = document.getElementById("input_button")
        /* quando clicca su conferma ed il tempo non è ancora finito, si blocca il tempo */
        /*confirm_button_id.addEventListener("click", () => {
            timer = 0;
            document.getElementById("confirm_button").style.display = "none"
        } )*/
    }, 1000);

}

function correct_string(question){
    textAreaCorrect.value = question['answer']
    textArea.value = question['code']
    console.log(textAreaCorrect)
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
            "       <h1>Questo è un esercizio html!<\h1>\n" +
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
            "        <img src='foto.jpg'></img>\n" +
            "        <style>\n" +
            "            body \n" +
            "            background-image: ('foto.jpg');\n" +
            "        }\n"+
            "        </style>\n" +
            "    </body>\n" +
            "    </html>"
    }
]