function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop (ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function verifica_quiz() {
    let x = document.getElementById("cella_utent1").innerText
    let y = document.getElementById("cella_utent2").innerText
    let z = document.getElementById("cella_utent3").innerText

    console.log(x)
    console.log(y)
    console.log(z)
}