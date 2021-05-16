
let user_point
let user_name


function start_game() {
    document.getElementById("myForm").style.display="none";
    document.getElementById("container_page").style.display="block";
    user_name = document.getElementById("nickname").value
    user_point = 0

    let x = document.getElementsByClassName("user_name_show")
    for(let i=0; i<x.length; i++) {
        x[i].innerText = user_name
    }

    console.log(user_name)
    console.log(user_point)
}

// function for dynamic buttom login
function change_border_on() {
    let x = document.getElementById("login_id")
    x.style.borderRadius = "40px"
    x.style.backgroundColor = "black"
    x.style.color = "white"
}
function change_border_off() {
    let x = document.getElementById("login_id")
    x.style.borderRadius = "10px"
    x.style.backgroundColor = "#80ed99"
    x.style.color = "black"
}
function button_start_on(){
    document.getElementById("start").style.display="block"
}
function button_start_off(){
    document.getElementById("start").style.display="none"
}

/* funzioni per user info */
$(document).ready( function() {
    $("#container_info").mouseenter(function () {

        $("#container_info").animate({
            padding: '0 500px 300px 0',
            animationDuration: '0s'
        }, "slow");

        $("#pre_info").hide()
        $("#info").show()
    });
});
$(document).ready( function() {
    $("#container_info").mouseleave(function () {

        $("#container_info").animate({
            padding: '0 0 30px 0',
            animationDuration: '1s'
        }, "slow");

        $("#pre_info").show()
        $("#info").hide()

    });
});



