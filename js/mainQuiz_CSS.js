const startButton = document.getElementById('start-btn')
const questionContainerElement=document.getElementById('question_container')
const clock=document.getElementById("timer")
const nextButton=document.getElementById("next-btn")
const getbackButton=document.getElementById("getback-btn")

let Punti=0;
let index_id

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
        }
    });
})


startButton.addEventListener("click",function start_game(){
    startButton.style.display="none";
    questionContainerElement.style.display="block";
    nextButton.style.display="block";
    clock.style.display="block";
    timerStart()
    randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    nextQuestion()
});



nextButton.addEventListener("click",function setPointAndNext(){
    let answerUser=document.getElementById("textTofill").value
    console.log(answerUser)
    let answerCorrect=randomQuestions[currentQuestionIndex].Answer
    timerStart()
    if (answerUser===answerCorrect) {
        console.log("Risposta corretta")
        Punti += 1;
        randomQuestions[currentQuestionIndex].Result = true
    }
    currentQuestionIndex+=1;
    $("#question_container").hide()
    if (currentQuestionIndex>=randomQuestions.length) {
        show_Result()
    }
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
    document.getElementById("Domanda").innerText= "Question "+ (currentQuestionIndex+1)

}

const questions_array = [
    {
        question: "Insert the missing property in order to achieve the element represented in the image on the right:",
        code1 :"<!DOCTYPE html>\n<html>\n<head>\n<style>\n.div2 {\nwidth: 300px;\nheight: 100px; \npadding: 50px;\nborder: 1px solid red;\n",
        code2 : ": border-box;\n}\n</style>\n</head>\n<body>\n<div class='div2'>Hooray!</div>\n</body>\n</html>\n" ,

        Answer : "box-sizing",
        immagineQ: "images/CSS-Image1.JPG",
        Result : false,
        Reference : "https://www.w3schools.com/css/css3_box-sizing.asp"
    },
    {
        question: "Insert the missing property in order to achieve the element represented in the image on the right:",
        code1 :"<!DOCTYPE html>\n <html>\n<head>\n<style>\n h1 { \n   color: red;",
        code2 : " : 2px 2px 4px #000000;\n }\n </style> \n</head> \n <body> \n <h1>This is text</h1> \n </body> \n </html>\n\n" ,
        Answer : "text-shadow",
        immagineQ: "images/CSS-Image2.JPG",
        Result: false,
        Reference : "https://www.w3schools.com/css/css3_shadows.asp"
    },
    {
        question: "Insert the missing property in order to achieve the element represented in the image on the right:",
        code1 :'<!DOCTYPE html> \n <html> \n <head> \n <style> \n \n#test1 { \n ',
        code2 : ' : 15px 50px 30px 5px; \n  background: #73AD21; \n  padding: 20px; \n   width: 200px; \n height: 150px; \n } \n \n </style> \n </head> \n <body> \n <p id=\"test1\"></p> \n \n </body> \n </html> \n ' ,
        Answer : "border-radius",
        immagineQ: "images/CSS-Image3.JPG",
        Result: false,
        Reference : "https://www.w3schools.com/css/css3_borders.asp"
    }

]



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
            $("#question_container").hide()


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


function show_Result() {
    clock.style.display = "none";
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
    })

    let element=document.getElementById("lista_domande")
    let i
    for(i=0;i<randomQuestions.length;i++)
    {
        let x = document.createElement("li");
        if (randomQuestions[i].Result===true) {
            x.innerText = "Question nr. " + (i + 1) + " - Correct answer!"
            element.appendChild(x)
        }
        else {
            let a=document.createElement("a")
            a.innerText="Clich here for a reference!"
            a.setAttribute("href",randomQuestions[i].Reference)
            a.setAttribute("target","_blank")
            x.innerText = "Question nr. " + (i + 1) + " - Wrong asnwer - The correct answer is : " +randomQuestions[i].Answer
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
                quiz: 'CSS',
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

/*
window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
}); */
