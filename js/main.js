

function start_game() {
    console.log("Hi, by start_game()");
    location.href="page2.html"
}

function change_color_on() {
    document.getElementById("btn_id").style.backgroundColor = "white"
}

function change_color_off() {
    document.getElementById("btn_id").style.backgroundColor = "rgba(255,255,255,0.1)"
}

function change_size_on() {
    document.getElementById("cite_intro").style.fontSize = "25pt"
    document.getElementById("cite_intro").style.color = "green"
}

function change_size_off() {
    document.getElementById("cite_intro").style.fontSize = "17pt"
    document.getElementById("cite_intro").style.color = "black"
}

