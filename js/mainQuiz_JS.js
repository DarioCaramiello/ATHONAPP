
/*https://www.html.it/pag/15203/eventi-legati-al-trascinamento-del-mouse/ */
var x = document.getElementById("id_function");
x.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
}