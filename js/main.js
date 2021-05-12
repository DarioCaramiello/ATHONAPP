let playerName;
let point_rank;

function start_game() {
    console.log("Hi, by start_game()");
    playerName=  document.getElementById("nickname").value; //Salva nome giocatore
    console.log(playerName);
    location.href="page2.html"
    point_rank = 0;
}

function change_color_on() {
    document.getElementById("btn_id").style.color = "white"
}

function change_color_off() {
    document.getElementById("btn_id").style.color = "black"
}



//Funzioni per il form
function closeForm(){
    let x = document.getElementById("myForm").style.display = "none";
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}