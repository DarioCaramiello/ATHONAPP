
let user_point
let user_name

function start_game() {

    user_name = document.getElementById("nickname").value


    if( user_name === ""){
        document.getElementById("myForm").style.display="block";
        document.getElementById("container_page").style.display="none";
        document.getElementById("Athonapp").style.display="none";
    } else {
        document.getElementById("outer-circle").style.display="block";
        document.getElementById("myForm").style.display="none";
        document.getElementById("container_page").style.display="block";
        document.getElementById("AthonApp").style.display="block";
        user_point = 0

        let x = document.getElementsByClassName("user_name_show")
        for(let i=0; i<x.length; i++) {
            x[i].innerText = user_name
        }

        let y = document.getElementsByClassName("user_point_rank")
        for(let i=0; i<y.length; i++) {
            y[i].innerText = 0
        }

        document.body.style.background = '#fffffe'

        console.log(user_name)
        console.log(user_point)
    }
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

/*quando si clicca diventa colorato e tutti gli altri neri (per capire quale è stato scelto)*/
function button_start_on1() {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#DB8211FF"
    document.getElementById("button_bottomright").style.color="#2D383A"
    document.getElementById("button_bottomleft").style.color="#2D383A"
    document.getElementById("button_topleft").style.color="#FF6D3A"
    document.getElementById("button_topright").style.color="#2D383A"
}

function button_start_on2() {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#1E90FF"
    document.getElementById("button_bottomright").style.color="#2D383A"
    document.getElementById("button_bottomleft").style.color="#2D383A"
    document.getElementById("button_topleft").style.color="#2D383A"
    document.getElementById("button_topright").style.color="#2E2D88"
}

function button_start_on3() {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#58427C"
    document.getElementById("button_bottomright").style.color="#2D383A"
    document.getElementById("button_bottomleft").style.color="#733380"
    document.getElementById("button_topleft").style.color="#2D383A"
    document.getElementById("button_topright").style.color="#2D383A"
}

function button_start_on4() {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#FFDB00"
    document.getElementById("button_bottomright").style.color="#E77200"
    document.getElementById("button_bottomleft").style.color="#2D383A"
    document.getElementById("button_topleft").style.color="#2D383A"
    document.getElementById("button_topright").style.color="#2D383A"
}

/* funzioni per user info */
$(document).ready( function() {
    $("#container_info").click(function () {

        $("#container_info").animate({
            padding: '0 200px 10px 0',
            animationDelay: '1000000000000s'
        }, "slow");

        $("#pre_info").hide()
        $("#container_info2").show()
    });
});
$(document).ready( function() {
    $("#container_info").mouseleave(function () {

        $("#container_info").animate({
            padding: '5px 0 5px 0',
            animationDelay: '0s'
        }, "fast");

        $("#pre_info").show()
        $("#container_info2").hide()

    });
});


/*funciton per user info rank */
$(document).ready( function() {
    $("#container_info_rank").click(function () {

        $("#container_info_rank").animate({
            padding: '0 500px 300px 0',
            animationDelay: '1000000000000s',
            animationDuration: '0s'
        }, "slow");
    });
});
$(document).ready( function() {
    $("#container_info_rank").mouseleave(function () {

        $("#container_info_rank").animate({
            padding: '0 0 10px 0',
            animationDuration: '1s',
            animationDelay: '0s'
        }, "slow");
    });
});


function pop_up_istruzioni()
{
    let displayCerchio=document.getElementById("outer-circle").style.display
    console.log(displayCerchio)

    if(displayCerchio!=="block"){
        document.getElementById("outer-circle").style.display = "block";
    }
    else
    {
        document.getElementById("outer-circle").style.display = "none";
    }
}