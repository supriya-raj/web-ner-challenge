from flask import Flask, Response, request
from flask_cors import CORS
import en_core_web_sm
import json

app = Flask(__name__)
ors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
model = en_core_web_sm.load()

@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/get_entities", methods=["POST"])
def get_entities():
    text = request.json["text"]
    entity_dict = dict([(str(x), x.label_) for x in model(text).ents])
    return Response(json.dumps(entity_dict), status=200, mimetype='application/json')
