from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, resource={r"/api/*": {"origins": "*"}})

# dizionario che memorizza i login
utenti = {}
tot_user = len(utenti)
# array globale di supporto alla route 'return-index'
index_mem = []

@app.route('/')
def root():
    return jsonify(utenti)

@app.route('/api/server-login', methods=['POST'])
def name_user():
    nickname = str(request.form.get('nickname'))
    password = int(request.form.get('password'))
    point = 0

    # if utente in database:
        # if password == utente.password:
            # return str("accesso consentito")
        # else:
            # return str("accesso negato")
    # else :
        # inserisci nel database


@app.route('/api/server-login', methods=['POST'])
def name_user():
    index = random.randint(1, 10)
    index_mem.append(index)
    for key in utenti:
        if utenti[key]['name'] == request.form.get('nickname', 'non definito'):
            return jsonify(utenti[index_mem[0]])
    utenti[index] = {'name': request.form.get('nickname', 'non definito'), 'point': 0}
    return jsonify(utenti[index_mem[0]])

# dopo aver richiamato il login , ogni quiz quando si carica richiama il server che restituisce l'index
# associato al dizionario per poi fare una request per aggiornamento di punti per quell'index
@app.route('/api/return-index', methods=['POST', 'GET'])
def get_index():
    var = index_mem[0]
    index_mem.remove(index_mem[0])
    return str(var)


# il client invia al server l'index piu il punteggio aggiuntivo
# il server aggiorna la classifica
@app.route('/api/update-point', methods=['POST', 'GET'])
def update_rank():
    point_add = request.form.get('point')
    index = request.form.get('index')
    index_int = int(index)
    point_add_int = int(point_add)

    point_user = utenti[index_int]['point']
    point_user_int = int(point_user)
    sum_ = point_user_int + point_add_int
    sum_int = int(sum_)
    utenti[index_int]['point'] = sum_int
    return str("update")
