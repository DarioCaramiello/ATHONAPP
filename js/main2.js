
let toggle_topleft = false;
let toggle_topright = false;
let toggle_bottomleft = false;
let toggle_bottomright = false;
let toggle_count=0;

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

function toggle(value) {
    console.log("hi")
    document.getElementById("start").style.display = "block"
    if (toggle_count===1)
    {
        untoggle()
    }
    switch (value) {
        case (1) :
            document.getElementById("button_topleft").style.background = "green";
            toggle_topleft=true;
            break;
        case 2 :
            document.getElementById("button_topright").style.background = "red";
            toggle_topright=true;
            break;
        case 3 :
            document.getElementById("button_bottomleft").style.background = "yellow";
            toggle_bottomleft=true;
            break;
        case 4 :
            document.getElementById("button_bottomright").style.background = "blue";
            toggle_bottomright=true;
            break;
        default :
            break;
    }
    toggle_count=toggle_count+1;
}

function light_up(value) {
    switch (value) {
        case (1) :
            document.getElementById("button_topleft").style.background = "green";
            break;
        case 2 :
            document.getElementById("button_topright").style.background = "red";
            break;
        case 3 :
            document.getElementById("button_bottomleft").style.background = "yellow";
            break;
        case 4 :
            document.getElementById("button_bottomright").style.background = "blue";
            break;
        default :
            break;
    }
}

function light_off(value){
   switch(value) {
       case 1 : if(toggle_topleft===true) break;document.getElementById("button_topleft").style.background = "darkgreen"; break;
       case 2 : if(toggle_topright===true) break;document.getElementById("button_topright").style.background = "darkred";break;
       case 3 : if(toggle_bottomleft===true) break;document.getElementById("button_bottomleft").style.background = "goldenrod";break;
       case 4 : if(toggle_bottomright===true) break;document.getElementById("button_bottomright").style.background = "darkblue";break;
       default :  break;


   }
}
function untoggle()
{
 toggle_topleft = false;
 toggle_topright = false;
 toggle_bottomleft = false;
 toggle_bottomright = false;
 toggle_count=0;

}

/* funzioni per le info user */
$(document).ready( function() {
    $("#container_info").mouseenter(function () {
        $("#container_info").animate({padding: '20px 100px 100px 20px ' }, "slow");
        $("#container_info").animate({padding: '23px 0 123px 0 ' }, "slow");
        $("#container_info").animate({padding: '0 200px 300px 0px ' }, "slow");
        document.getElementById("pre_info").style.display = "none"
        document.getElementById("info").style.display = "block";
    });
});
