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
    currentQuestionIndex++
    nextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    /*genera domande in ordine casuale all'interno dell'array*/
    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    
    nextQuestion()
}

function nextQuestion(){
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
    setStatusClass(document.body, correct)
    /*inserisco tutti i figli (bottoni) in un array per ciclarli con forEach()*/
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
        /*mostro il bottone next*/
        nextButton.classList.remove('hide')
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        /*se la risposta e' corretta aggiungo la classe correct*/
        element.classList.add('correct')
        Punti+=1
        randomQuestions[currentQuestionIndex].result=true
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


/*array per tutte le domande*/
const questions_array = [
    {
        question: 'Completare la seguente serie numerica: 2, 6, 7, 10, 12, 14, 17, 18, 22, ?, ??',
        answers: [
            { text: '? = 22, ?? = 27',correct: true },
            { text: '? = 27, ?? = 22', correct: false },
            { text: '? = 25, ?? = 27', correct: false },
            { text: '? = 24, ?? = 19', correct: false }
        ],
        result: false
    },
    {
        question: 'Un contadino compra 500 kg di patate a 15 centesimi al kg. Le rivende a 27 centesimi al kg. Quanto guadagna in tutto?',
        answers: [
            /*Ha un guadagno di 12 centesimo al chilo che moltiplicato per 500kg gli fa guadagnare 6000 centesimi = 60 euro*/
            { text: '30',correct: false },
            { text: '60',correct: true },
            { text: '90',correct: false },
            { text: '600',correct: false },
        ],
        result:false

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

    nextButton.style.display = "none";
    getbackButton.style.display = "block";
    questionContainerElement.style.display = "none"

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

    let element=document.getElementById("lista_domande")
    let i
    for(i=0;i<randomQuestions.length;i++)
    {
        let x = document.createElement("li");
        if (randomQuestions[i].result===true) {
            x.innerText = "Domanda nr. " + (i + 1) + " - Risposta Corretta"
            element.appendChild(x)
        }
        else {
            let a=document.createElement("a")
                a.innerText="Clicca qui per un riferimento!"
            a.setAttribute("href",randomQuestions[i].Reference)

            x.innerText = "Domanda nr. " + (i + 1) + " - Risposta errata"
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
    setTimeout(function(){
        window.location = 'page2.html'
    },2000)

});
