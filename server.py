from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resource={r"/api/": {"origins": ""}})

client = MongoClient("mongodb://localhost:27017/")
db = client["database"]
user_ = db["user"]
name_corrent_user = [" "]

premi = [
        ["PS Store Credit" , "Dogecoing", "Amazon Credit"],
        ["Google Credit", "Prize2" , "Prize3"],
        ["Day3prie", "PRize2", "prize3"],
        ["Day4prie", "PRize2", "prize3"],
        ["Day5prie", "PRize2", "prize3"],
        ["Day6prie", "PRize2", "prize3"],
        ["Day7prie", "PRize2", "prize3"],
    ]

@app.route('/')
def root():
    risultato = {0: "SERVER"}
    return jsonify(risultato)


@app.route('/show-users')
def show():
    x = user_.find({}, {"_id": 0})
    list_user = []
    for item in x:
        list_user.append(item)
    result = {"lista utenti": list_user}

    return jsonify(result)


@app.route('/api/show-prizes', methods=['GET'])
def show_prizes():
    return jsonify(premi)


@app.route('/api/server-login', methods=['POST'])
def login():
    x = user_.find_one({"nickname": str(request.form.get('nickname'))})
    if x != None:
        if x['password'] == request.form.get('password'):
            out = {"access": 1, "name": x['nickname'], "point": x['point']}
            name_corrent_user[0] = str(request.form.get('nickname'))
        else:
            out = {"access": 0}
    else:
        id_user = {
            "nickname": str(request.form.get('nickname')),
            "password": request.form.get('password'),
            "point": 0,
            "CSS": 0,
            "LOGIC": 0,
            "JS": 0,
            "HTML": 0
        }
        user_.insert_one(id_user)
        out = {"access": "create", "name": id_user["nickname"], "point": id_user["point"]}
        name_corrent_user[0] = id_user["nickname"]
    return jsonify(out)


# API per eliminare la collezione
@app.route('/clear-db')
def clear():
    user_.drop()
    out = {"action": 1}
    return jsonify(out)


@app.route('/api/get-nickname', methods=['POST'])
def get_nickname():
    out = {"nickname": str(name_corrent_user[0])}
    return jsonify(out)


@app.route('/api/update-point', methods=['POST'])
def add_point():
    x = user_.find_one({"nickname": str(request.form.get('name'))})
    point_Now = x['point']
    point_Add = request.form.get('point')
    sum = point_Now + int(point_Add)
    myquery = {"nickname": request.form.get('name')}
    newValue = {"$set": {"point": sum}}
    user_.update_one(myquery, newValue)
    return "update point"


@app.route('/api/update-quiz', methods=['POST'])
def quiz_done():

    x = user_.find_one({"nickname": str(request.form.get('name'))})
    quiz_aggiornato = request.form.get('quiz','non definito')
    stato = request.form.get('stato', 0)
    myquery = {"nickname": request.form.get('name')}
    newValue = {"$set": {quiz_aggiornato: stato}}
    user_.update_one(myquery, newValue)

    return str('quiz aggiornato')


@app.route('/api/get-quiz', methods=['POST'])
def get_quiz():

    x = user_.find_one({"nickname": str(request.form.get('name'))})
    out = {"CSS": x['CSS'], "LOGIC": x['LOGIC'], "JS": x['JS'], "HTML": x['HTML']}

    return jsonify(out)
