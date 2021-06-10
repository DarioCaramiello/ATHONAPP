const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const getbackButton=document.getElementById("getback-btn")
const questionContainerElement=document.getElementById('question_container')
/*costante per la singola domanda*/
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
/*variabile per rendere random le domande*/
let randomQuestions, currentQuestionIndex

let Punti=0;
let index_id
let name_user_for_point = NaN



startButton.addEventListener('click', startGame)
nextButton.addEventListener('click',()=>{
    /*incremento il contatore*/
    $('#riassunto_game').hide()
    $('#risp_corretta').hide()
    $('#risp_errata').hide()
    $('#timer').show()
    $('#answer-buttons').show()
    $('#question').show()
    $('#next-btn').hide()
    currentQuestionIndex++
    nextQuestion()
})

function startGame(){
    timerStart()
    startButton.classList.add('hide')
    /*genera domande in ordine casuale all'interno dell'array*/
    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion(){
    timerStart()
    resetState()
    //aggiunto check per verificare la fine delle domande VR
    if(randomQuestions.length > currentQuestionIndex)
        showQuestion(randomQuestions[currentQuestionIndex])
    else // esco e verifico i risultati VR
        show_Result()
}




/*********************question = oggetto dell'array questions_array*/
function showQuestion(question){
    /*mostra il testo di una domanda che si trova nell'array question*/
    questionElement.innerText = question['question']
    /*ciclo le risposte da far vedere*/
    question['answers'].forEach(answer => {
        /*si crea un bottone per ogni risposta*/
        const button = document.createElement('button')
        button.innerText = answer.text
        /*aggiungo la classe btn al bottone creato*/
        button.classList.add('btn')
        /*verifico se la risposta e' corretta*/
        if(answer['correct']){
            button.dataset['correct'] = answer['correct']
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    })
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
    setStatusClass(document.body, correct) // forse è corretto

    /*inserisco tutti i figli (bottoni) in un array per ciclarli con forEach()
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })*/
    /*mostro il bottone next*/
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        /*se la risposta e' corretta aggiungo la classe correct*/
        $('#riassunto_game').show()
        $('#risp_errata').hide()
        $('#risp_corretta').show()
        $('#timer').hide()
        $('#next-btn').show()
        $('#answer-buttons').hide()
        $('#question').hide()
        element.classList.add('correct')
        randomQuestions[currentQuestionIndex].result=true
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
        });
    }else{
        /*se la risposta e' sbagliata aggiungo la classe wrong*/
        element.classList.add('wrong')
        $('#riassunto_game').show()
        $('#risp_corretta').hide()
        $('#risp_errata').show()
        $('#timer').hide()
        $('#answer-buttons').hide()
        $('#question').hide()
        $('#next-btn').show()
    }
}
/*funzione per rimuovere la classe correct e wrong*/
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


/*array per tutte le domande*/
const questions_array = [
    {
        question: 'Complete the following numerical series: 2, 6, 7, 10, 12, 14, 17, 18, 22, ?, ??',
        answers: [
            { text: '? = 22, ?? = 27',correct: true },
            { text: '? = 27, ?? = 22', correct: false },
            { text: '? = 25, ?? = 27', correct: false },
            { text: '? = 24, ?? = 19', correct: false }
        ],
        result: false,
        Reference:""
    },
    {
        question: 'A farmer buys 500 kg of potatoes witch costs 15 cents per kg. He sells them at 27 cents per kg. How much did he earn?',
        answers: [
            /*Ha un guadagno di 12 centesimo al chilo che moltiplicato per 500kg gli fa guadagnare 6000 centesimi = 60 euro*/
            { text: '30',correct: false },
            { text: '60',correct: true },
            { text: '90',correct: false },
            { text: '600',correct: false },
        ],
        Reference:""
    }
]


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
        }
    });
})


// Send point to the server and show results
function show_Result() {
    $('#timer').hide()
    nextButton.style.display = "none";
    getbackButton.style.display = "block";
    questionContainerElement.style.display = "none"
/*
    $.ajax({
        url: "http://localhost:5000/api/update-point",
        type: "POST",
        dataType: "text",
        data: {
            point: Punti,
            name: name_user_for_point
        },
        success: function (result) {
            console.log(result)
        }
    });
*/

    let element=document.getElementById("lista_domande")
    let i
    for(i=0;i<randomQuestions.length;i++)
    {
        let x = document.createElement("li");
        if (randomQuestions[i].result===true) {
            x.innerText = "Question n°" + (i + 1) + " - Correct answer"
            element.appendChild(x)
        }
        else {
            let a=document.createElement("a")
            a.innerText="Click for the references!"
            a.setAttribute("href",randomQuestions[i].Reference)

            x.innerText = "Question n°" + (i + 1) + " - Wrong answer"
            element.appendChild(x)
            x.insertAdjacentElement("afterend", a)
        }
    }
}


$("#getback-btn").click(function(){
    $.ajax({
        url:'http://localhost:5000/api/update-quiz',
        type:'POST',
        dataType : 'json',
        data:
            {
                name: name_user_for_point,
                quiz: 'LOGIC',
                stato: 1
            },

        success: function (result){
            console.log(result)
        }

    })
    window.location = 'page2.html'
});



//timer
function timerStart(){
    let time_out = "Time out";
    /* variabile bool per controllare se i numeri < 10 devono essere spostati*/
    let check=0
    /*per cambiare font size alla scritta Time out*/
    let result_time_out = time_out.fontsize(5);
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

            document.getElementById("timer_value").innerHTML = result_time_out;
            if(check===1){
                check = 0
                document.getElementById("timer_value").style.marginLeft = "10px";
            }
        }

        nextButton.addEventListener("click", () => {
            clearInterval(x)
            document.getElementById("timer_value").innerHTML = "60"
            /* document.getElementById("confirm_btn").style.display = "none" */
        } )
    }, 1000);
}

