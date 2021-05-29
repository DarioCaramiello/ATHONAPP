const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
/*variabile per rendere random le domande*/
let randomQuestions, currentQuestionIndex
const timer_value = document.getElementById('timer')
const circle_animation = document.getElementsByClassName('circle_animation')[0]
const outer_animation = document.getElementById('container_timer')


startButton.addEventListener('click', startGame)


function startGame(){
    /*jQuery per far iniziare le animazioni quando si preme start*/
    $('startButton').click(function() {
        $('.circle_animation').addClass('animation_js_circle');
        setTimeout(function() {
            $('.circle_animation').removeClass('animation_js_circle');
        }, 6000);
    });
    $("startButton").click(function() {
        $('#container_timer').addClass('animation_js_outer');
        setTimeout(function() {
            $('#container_timer').removeClass('animation_js_outer');
        }, 6000);
    });
    startButton.classList.add('hide')
    timerStart()
    /*genera domande in ordine casuale all'interno dell'array*/
    /*randomQuestions = questions_array.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()*/
}



//timer
function timerStart(){
    var time_out = "Time out";
    /*per cambiare font size alla scritta Time out*/
    var result_time_out = time_out.fontsize(6);
    let timer = 60;
    console.log("fammokk")
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