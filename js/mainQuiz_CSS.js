const startButton = document.getElementById('start-btn')
const questionContainerElement=document.getElementById('question_container')
const clock=document.getElementById("timerLabel")
const nextButton=document.getElementById("next-btn")
const getbackButton=document.getElementById("getback-btn")

let Punti=0;
let index_id


/* --- request server for id user --- */
$("document").ready(function(){
    $.ajax({
        url: "http://localhost:5000/api/return-index",
        type: "POST",
        dataType: "text",
        success: function(result) {
            console.log("index_ricevuto : "+result)
            index_id = result
        }
    });
});


startButton.addEventListener("click",function start_game(){
    startButton.style.display="none";
    questionContainerElement.style.display="block";
    clock.style.display="block";
    nextButton.style.display="block";

    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    nextQuestion()
});



nextButton.addEventListener("click",function setPointAndNext(){
    let answerUser=document.getElementById("textTofill").value
    console.log(answerUser)
    let answerCorrect=randomQuestions[currentQuestionIndex].Answer

    if (answerUser===answerCorrect) {
        console.log("Risposta corretta")
        Punti += 1;
        randomQuestions[currentQuestionIndex].Result = true
    }
    currentQuestionIndex+=1;

    if (currentQuestionIndex>=randomQuestions.length)
        show_Result()
    else
        nextQuestion()
})

function nextQuestion(){
    showQuestion(randomQuestions[currentQuestionIndex])
}



function showQuestion(question)
{
    timer = 60;
    questionContainerElement.style.display="block";
    document.getElementById("question").innerText=question.question

    document.getElementById("imgtoguess").src=question.immagineQ

    //document.getElementById("fill_form").innerText=(question.code1+question.code2)
    document.getElementById("parte1").innerText = question.code1
    document.getElementById("parte2").innerText = question.code2
    let element = document.getElementById("parte2");
    let x = document.createElement("input");
    x.setAttribute("type", "text");
    x.setAttribute("size", "8");
    x.setAttribute("id", "textTofill");
    //element.appendChild(x)
    element.insertAdjacentElement("afterbegin", x)
    document.getElementById("Domanda").innerText= "Domanda "+ (currentQuestionIndex+1)

}

const questions_array = [
    {
        question: "Inserisci la proprietà mancante per avere l'elemento raffigurato nell'immagine a destra:",
        code1 :"<!DOCTYPE html>\n<html>\n<head>\n<style>\n.div2 {\nwidth: 300px;\nheight: 100px; \npadding: 50px;\nborder: 1px solid red;\n",
        code2 : ": border-box;\n}\n</style>\n</head>\n<body>\n<div class='div2'>Hooray!</div>\n</body>\n</html>\n" ,

        Answer : "box-sizing",
        immagineQ: "images/CSS-Image1.JPG",
        Result : false
    },
    {
        question: "Inserisci l'attributo mancante 2:",
        code1 :"<!DOCTYPE html>\n <html>\n<head>\n<style>\n h1 { \n   color: red;",
        code2 : " : 2px 2px 4px #000000;\n }\n </style> \n</head> \n <body> \n <h1>This is text</h1> \n </body> \n </html>\n\n" ,
        Answer : "text-shadow",
        immagineQ: "images/CSS-Image2.JPG",
        Result: false,
        Reference : "https://www.w3schools.com/css/css3_shadows.asp"
    }
]

//timer
/*
let timer = 60;
// Update the count down every 1 second
let x = setInterval(function() {

    timer -= 1
    document.getElementById("timer").innerHTML = timer;

    if (timer < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Time-out";
        verifica_quiz();
    }

    let confirm_button_id = document.getElementById("input_button")

     //quando clicca su conferma ed il tempo non è ancora finito, si blocca il tempo
    confirm_button_id.addEventListener("click", () => {
        timer = 0;
        document.getElementById("confirm_button").style.display = "none"
    } )

}, 1000);

*/


function show_Result(){

    nextButton.style.display="none";
    getbackButton.style.display="block";
    questionContainerElement.style.display="none"

    $.ajax({
        url: "http://localhost:5000/api/update-point",
        type: "POST",
        dataType: "text",
        data: {
            point: Punti,
            index: index_id
        },
        success: function (result) {
            console.log(result)
        }
    })


    let element=document.getElementById("lista_domande")
    let i
    for(i=0;i<randomQuestions.length;i++)
    {
        let x = document.createElement("li");
        if (randomQuestions[i].Result===true) {
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
    window.location = 'page2.html'
});
