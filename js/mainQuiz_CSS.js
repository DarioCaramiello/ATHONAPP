const startButton = document.getElementById('start-btn')
const questionContainerElement=document.getElementById('question_container')

startButton.addEventListener("click",function start_game(){
startButton.style.display="none";
questionContainerElement.style.display="block";

randomQuestions = questions_array.sort(() => Math.random() - .5)
currentQuestionIndex = 0
nextQuestion()

});

function nextQuestion(){
    showQuestion(randomQuestions[currentQuestionIndex])
}

function showQuestion(question)
{

    document.getElementById("question").innerText=question.question
    document.getElementById("fill_form").innerText=question.code
    document.getElementsByTagName("img").src=question.immagineQ
}

const questions_array = [
    {
        question: "Inserisci l'attributo mancante:",
        code :"<!DOCTYPE html>\n<html>\n<head>\n<style>\n.div2 {\nwidth: 300px;\nheight: 100px; \npadding: 50px;\nborder: 1px solid red;\nbox-sizing: border-box;\n}\n</style>\n</head>\n<body>\n<div class='div2'>Hooray!</div>\n</body>\n</html>\n",
        immagineQ: "CSS-Image1.JPG"
    },
    {
        question: "Inserisci l'attributo mancante:",
        code :"<!DOCTYPE html>\n<html>\n<head>\n<style>\n.div2 {\nwidth: 300px;\nheight: 100px; \npadding: 50px;\nborder: 1px solid red;\nbox-sizing: border-box;\n}\n</style>\n</head>\n<body>\n<div class='div2'>Hooray!</div>\n</body>\n</html>\n",
        immagineQ: "CSS-Image1.JPG"
    }
]