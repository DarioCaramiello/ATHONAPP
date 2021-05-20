const startButton = document.getElementById('start-btn')
const questionContainerElement=document.getElementById('question_container')
/*variabile per rendere random le domande*/
const randomQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame(){
    restartButton.classList.add('hide')
    startButton.classList.add('hide')
    /*genera domande in ordine casuale all'interno dell'array*/
    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion(){
    resetState()
    showQuestion(randomQuestions[currentQuestionIndex])
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


    if(randomQuestions.length > currentQuestionIndex + 1) {
        /*mostro il bottone next*/
        nextButton.classList.remove('hide')
    }else{
        restartButton.classList.remove('hide')
    }
}

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


/*array per tutte le domande*/
const questions-array = [
    {
        question: 'Completare la seguente serie numerica: 2, 6, 7, 10, 12, 14, 17, 18, 22, ?, ??',
        answers: [
            { text: '? = 22, ?? = 27',correct: true },
            { text: '? = 27, ?? = 22', correct: false },
            { text: '? = 25, ?? = 27', correct: false },
            { text: '? = 24, ?? = 19', correct: false }
        ]
    },
    {
        question: 'Un contadino compra 500 kg di patate a 15 centesimi al kg. Le rivende a 27 centesimi al kg. Quanto guadagna in tutto?',
        answers: [
            /*Ha un guadagno di 12 centesimo al chilo che moltiplicato per 500kg gli fa guadagnare 6000 centesimi = 60 euro*/
            { text: '30',correct: false },
            { text: '60',correct: true },
            { text: '90',correct: false },
            { text: '600',correct: false },
        ]

    }
]