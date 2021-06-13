let choice_quiz = -1
let listaPremi
let quiz
let current_nickname=""

/* required for daily rewards */
$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:5000/api/show-prizes',
        type: 'GET',
        dataType: "json",

        success: function(result) {
            listaPremi=result
            console.log(listaPremi)
            daily_prizes(listaPremi)
        }
    });
})



function start_game() {

    let user_name = document.getElementById("nickname").value
    if( user_name === ""){
        document.getElementById("id_form_container").style.display="block";
        //document.getElementById("myForm").style.display="block";
        document.getElementById("container_page").style.display="none";
        document.getElementById("Athonapp").style.display="none";
    } else {
        document.getElementById("outer-circle").style.display="block";
        document.getElementById("myForm").style.display="none";
        document.getElementById("container_page").style.display="block";
        document.getElementById("name_project").style.display="block";
        $("#container_banner_rules").show()


        $.ajax({
            url: "http://localhost:5000/api/server-login",
            type: "POST",
            dataType: "json",
            data: {
                nickname: $("#nickname").val(),
                password: $("#password").val()
            },

            success: function(result) {
                console.log(result)
                name_current_user = result["name"]
                if( result["access"] === 1 || result["access"] === "create"){
                    $("#id_nickname").html(result["name"])
                    $("#point_rank").html(result["point"])
                    $.ajax({
                        url: 'http://localhost:5000/api/get-nickname',
                        type: 'POST',
                        dataType: "json",
                        success: function(result) {
                            current_nickname=result["nickname"]
                            if (current_nickname!=="")
                            {
                                $.ajax({
                                    url: 'http://localhost:5000/api/get-quiz',
                                    type: 'POST',
                                    dataType: "json",
                                    data: {
                                        'name': current_nickname
                                    },
                                    success: function (result) {

                                        quiz = result
                                        console.log(quiz)
                                        for (const key in quiz) {
                                            if (quiz[key] === "1")
                                                $("input[value = " + key + "").prop("disabled", true)
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else if ( result["access"] === 0 ){
                    console.log("accesso negato")
                    $("#myForm").show()
                    $("#container_page").hide()
                    $("#Athonapp").hide()
                } else {
                    console.log("ERROR")
                }
            }
        })
    }
}

function daily_prizes(daily_list){

    let today=new Date()
    let day=(today.getDay())

    console.log(day)
    let element=document.getElementById("lista")
    let i
    for (i=0; i<daily_list[day].length ; i++)
    {
        let x = document.createElement("li");
        x.innerText= daily_list[day][i].toString();
        element.appendChild(x)
    }
}

function goQuiz() {
    switch (choice_quiz) {
        case 1 :
            window.location='pageQuiz_HTML.html'
            break
        case 2 :
            window.location='pageQuiz_CSS.html'
            break
        case 3 :
            window.location='pageQuiz_LOGIC.html'
            break
        case 4 :
            window.location='pageQuiz_JS.html'
            break
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
function button_start_on1(choice) {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#DB8211FF"
    document.getElementById("button_bottomright").style.color="#2D383A"
    document.getElementById("button_bottomleft").style.color="#2D383A"
    document.getElementById("button_topleft").style.color="#FF6D3A"
    document.getElementById("button_topright").style.color="#2D383A"
    choice_quiz = choice
}

function button_start_on2(choice) {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#1E90FF"
    document.getElementById("button_bottomright").style.color="#2D383A"
    document.getElementById("button_bottomleft").style.color="#2D383A"
    document.getElementById("button_topleft").style.color="#2D383A"
    document.getElementById("button_topright").style.color="#2E2D88"
    choice_quiz = choice
}

function button_start_on3(choice) {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#58427C"
    document.getElementById("button_bottomright").style.color="#2D383A"
    document.getElementById("button_bottomleft").style.color="#733380"
    document.getElementById("button_topleft").style.color="#2D383A"
    document.getElementById("button_topright").style.color="#2D383A"
    choice_quiz = choice
}

function button_start_on4(choice) {
    document.getElementById("start").style.display = "block"
    document.getElementById("start").style.backgroundColor = "#FFDB00"
    document.getElementById("button_bottomright").style.color="#E77200"
    document.getElementById("button_bottomleft").style.color="#2D383A"
    document.getElementById("button_topleft").style.color="#2D383A"
    document.getElementById("button_topright").style.color="#2D383A"
    choice_quiz = choice
}

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



let open_info = 0
let open_rank = 0

$(document).ready( function() {
    $("#container_info").click(function () {
        if(open_info === 0) {

            $("#container_info").animate({
                padding: '5px 50px 5px 0',
                animationDelay: '1000000000000s'
            }, "slow");
            $("#pre_info").hide()
            $("#container_info2").show()

            open_info = 1

        } else {

            $("#container_info").animate({
                padding: '0',
                animationDelay: '0s'
            }, "slow");
            $("#pre_info").show()
            $("#container_info2").hide()

            open_info = 0
        }
    });
});

$(document).ready( function() {
    $("#container_info_rank").click(function () {

        if(open_rank === 0){

            $("#container_info_rank").animate({
                padding: '5px 50px 5px 0',
                animationDelay: '1000000000000s'
            }, "slow");

            $("#pre_info_rank").hide()
            $("#container_info_rank2").show()


            $.ajax({
                url: 'http://localhost:5000/api/show-rank',
                type: 'GET',
                dataType: "json",

                success: function(result) {
                    console.log(result)

                    let var_count = 1

                    for (item in result ) {
                        let element = document.getElementById("lista_rank")
                        let var_name = result[var_count]["name"]
                        let var_point = result[var_count]["point"]
                        let var_point_string = var_point.toString()
                        let out = var_name + " " + var_point_string
                        let x = document.createElement("li")
                        x.innerText = out
                        element.appendChild(x)
                        var_count = var_count + 1
                    }
                }
            })

            open_rank = 1
        } else {

            $("#lista_rank").empty()
            $("#container_info_rank").animate({
                padding: '0',
                animationDelay: '0s'
            }, "slow");
            $("#pre_info_rank").show()
            $("#container_info_rank2").hide()
            open_rank = 0
        }
    });
});

$(document).ready( function() {
    $("#container_info_prizes").click(function () {

        if(open_rank === 0) {

            $("#container_info_prizes").animate({
                padding: '5px 50px 5px 0',
                animationDelay: '1000000000000s'
            }, "slow");


            $("#info_prize").hide()
            $("#container_info_prizes2").show()

            open_rank = 1
        } else {

            $("#container_info_prizes").animate({
                padding: '0',
                animationDelay: '0s'
            }, "slow");

            $("#info_prize").show()
            $("#container_info_prizes2").hide()


            open_rank = 0
        }

    });
});

$(document).ready(function(){
    let today=new Date()
    let day=(today.getDay())
    console.log(day)

    $.ajax({
        url: 'http://localhost:5000/api/clear-db',
        type: 'POST',
        dataType: "json",
        data : {
            'current' :  day
        },

        success: function(result) {
            console.log(result)
            }

    });
})

