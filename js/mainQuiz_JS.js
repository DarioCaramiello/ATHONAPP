
/*https://www.html.it/pag/15203/eventi-legati-al-trascinamento-del-mouse/ */
let a = document.getElementById("id_function")
let b = document.getElementById("id_while")
let c = document.getElementById("id_def")
let d = document.getElementById("id_struct")
let e = document.getElementById("id_return")

a.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
}
b.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
}
c.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
}
d.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
}
e.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
}


var divTarget = document.getElementById("cella_utent1");
divTarget.ondragover = function(e) {
    e.target.className = "cella";
    e.preventDefault();
}

divTarget.ondrop = function(e) {
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById("id_function"));
}