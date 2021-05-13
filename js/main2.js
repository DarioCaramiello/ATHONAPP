function start_game() {

    document.getElementById("myForm").style.display="none";

    document.getElementById("outer-circle").style.display="block";
}


let point_rank
let player_name

// function for dynamic buttom login
function change_border_on() {
    let x = document.getElementById("login_id")
    x.style.borderRadius = "40px"
    x.style.backgroundColor = "black"
    x.style.color = "white"
}
function change_border_off() {
    let x = document.getElementById("login_id")
    x.style.borderRadius = "0"
    x.style.backgroundColor = "#80ed99"
    x.style.color = "black"
}


function toggle(value) {
    console.log("hi")
    document.getElementById("start").style.display = "block"
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
       case 1 : document.getElementById("button_topleft").style.background = "darkgreen"; break;
       case 2 : document.getElementById("button_topright").style.background = "darkred";break;
       case 3 : document.getElementById("button_bottomleft").style.background = "goldenrod";break;
       case 4 : document.getElementById("button_bottomright").style.background = "darkblue";break;
       default :  break;


   }
}


function start () {
    player_name = document.getElementById("nickname").value
    point_rank = 0
    console.log("player name : "+player_name)
    console.log("point rank : "+point_rank)

    document.getElementById("container_start").style.display = "none"

    let x = document.getElementsByClassName("hidden");
    for (let i = 0; i < x.length; i++) {
        x[i].style.opacity = "100%";
    }

    let y = document.getElementsByClassName("user_name");
    for( let i = 0; i < y.length; i++){
        y[i].innerText = player_name
    }

    document.getElementById("container_user_name").innerText = player_name

    document.body.style.backgroundColor = "#dda15e"
}


