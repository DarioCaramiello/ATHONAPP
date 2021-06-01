from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resource={r"/api/*": {"origins": "*"}})

client = MongoClient("mongodb://localhost:27017/")
db = client["database"]
user_ = db["user"]


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


@app.route('/api/server-login', methods=['POST'])
def login():
    x = user_.find_one({"nickname": str(request.form.get('nickname'))})
    if x != None:
        if x['password'] == request.form.get('password'):
            out = {"access": 1,"name": x['nickname'], "point": x['point'] }
            return jsonify(out)
        else:
            out = {"access": 0}
            return jsonify(out)
    else:
        id_user = {
            "nickname": str(request.form.get('nickname')),
            "password": request.form.get('password'),
            "point": 0,
            "game_": 0
        }
        user_.insert_one(id_user)
        out = { "access": "create" }
        return jsonify(out)


# API per eliminare la collezione
@app.route('/clear-db')
def clear():
    user_.drop()
    out = {"action": 1}
    return jsonify(out)