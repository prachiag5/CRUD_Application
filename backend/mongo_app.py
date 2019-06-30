import logging
import json
from bson.objectid import ObjectId
from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_cors import CORS
from model import db

class JSONEncoder(json.JSONEncoder):                           
    ''' extend json-encoder class'''
    def default(self, o):                               
        if isinstance(o, ObjectId):
            return str(o)                               
        return json.JSONEncoder.default(self, o)
      
app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'mydb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydb'
CORS(app)
db.init_app(app)
mongo = PyMongo(app)

# use the modified encoder class to handle ObjectId & datetime object while jsonifying the response.
app.json_encoder = JSONEncoder

@app.route('/star', methods=['GET'])
def get_all_stars():
  logging.warning('get all stars') 
  star = mongo.db.contact
  output = []
  for s in star.find():
    output.append({'id': s['_id'], 'name' : s['name'], 'contact': s['contact']})
  response = jsonify({'result' : output})
  return response

@app.route('/star_one', methods=['GET'])
def get_one_star():
  logging.warning('get one star')
  id = request.args.get('id', '')
  star = mongo.db.contact
  s = star.find_one({'_id' : ObjectId(id)})
  if s:
    output = {'name' : s['name'], 'contact' : s['contact']}
  else:
    output = "No such name"
  return jsonify({'result' : output})

@app.route('/star', methods=['POST'])
def add_star():
  star = mongo.db.contact
  name = request.json['name']
  contact = request.json['contact']
  star_id = star.insert({'name': name, 'contact': contact})
  new_star = star.find_one({'_id': star_id })
  output = {'id': new_star['_id'], 'name' : new_star['name'], 'contact' : new_star['contact']}
  return jsonify({'result' : output})

@app.route('/star', methods=['DELETE'])
def delete_star():
  id = request.args.get('id', '')
  star = mongo.db.contact
  star_id = star.delete_one({'_id': ObjectId(id)})
  new_star = star_id.raw_result
  return jsonify(new_star)

@app.route('/star', methods=['PUT'])
def update_star():
  id = request.args.get('id', '')
  star = mongo.db.contact
  data = request.json
  star_id = star.update_one({'_id': ObjectId(id)}, {"$set": data})
  new_star = star.find_one({'_id': ObjectId(id)})
  output = {'id': new_star['_id'], 'name' : new_star['name'], 'contact' : new_star['contact']}
  return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(debug=True)
