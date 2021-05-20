const startButton = document.getElementById('start-btn')
const questionContainerElement=document.getElementById('question_container')
/*variabile per rendere random le domande*/
let randomQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame(){
    console.log('start')
    startButton.classList.add('hide')
    /*genera domande in ordine casuale all'interno dell'array*/
    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion(){
    showQuestion(randomQuestions[currentQuestionIndex])
}

function showQuestion(question){

}

function selectAnswer(){

}
/*array per tutte le domande*/
const questions_array = [
    {
        question: 'Completare la seguente serie numerica:',
        answers: [
            { text: '? = 22, ?? = 27',correct: true },
            { text: '? == 27, ?? = 22', correct: false },
            { text: '? == 25, ?? = 27', correct: false },
            { text: '? == 24, ?? = 19', correct: false }
        ]
    }
]