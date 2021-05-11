let name;

function set_name() {
    let id = document.getElementById("utent_id");

    console.log("Hi, by set_name()");

    name = id.value;

    console.log("global name : "+name)
}