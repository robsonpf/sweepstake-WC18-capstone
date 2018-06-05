import json
import os
import jwt
import time
from db.db import find_all_users, insert_user, get_user_by_username, find_all_groups, find_all_knockouts, find_all_rewards, find_all_scoring, find_all_stadiums, find_all_teams
from pprint import pprint
from flask import Flask, jsonify, request
from model.user import User, UserSchema
from model.bet import Bet, BetSchema
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

working_dir = os.path.dirname(os.path.abspath(__file__))

data_file = os.path.join(working_dir, 'data.json')

headers = {'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'}
not_found_resp = {"message": "resource not found"}
unexpected_resp = {"message": "unexpected error occurred"}

with open(data_file) as f:
  data = json.load(f)

@app.route("/stadiums")
def get_matches():
  return find_all_stadiums(), 200, headers

@app.route("/scoring")
def get_scoring():
  return find_all_scoring(), 200, headers

@app.route("/rewards")
def get_rewards():
  return find_all_rewards(), 200, headers

@app.route("/users", methods=['GET'])
def get_users():
  return find_all_users(), 200, headers

@app.route("/signin", methods=['POST'])
def authenticate():
  creds = request.get_json()
  print "creds: " + str(creds)
  user = json.loads(get_user_by_username(creds['userName']))
  resp = {"status": "unauthorized", "message": "Authentication failed, username/password incorrect"}
  if user['password'] == creds['password']:
    payload = {"firstName": user['firstName'], "lastName": user['lastName'], "userName": user['userName'], "iss": "https://swpstkapp.org", "iat": int(time.time()), "exp": int(time.time() + 60*60*60)}
    encoded_jwt = jwt.encode(payload, '8asndasASK893Hulo789jhsdfDASd23AS', algorithm='HS256')
    resp = {"status": "ok", "access_token": encoded_jwt}
    return jsonify(resp), 200, headers
  else:
    return jsonify(resp), 401, headers

@app.route("/signup", methods=['POST'])
def create_user():
  user = UserSchema().load(request.get_json())
  print "User: ", user
  return insert_user(user), 201, headers

@app.route("/tvchannels")
def get_tv_channels():
  return jsonify(data["tvchannels"]), 200, headers

@app.route("/teams")
def get_teams():
  return find_all_teams(), 200, headers

@app.route("/groups/<group_id>")
def get_groups(group_id):
  try:
    resp = jsonify(data["groups"][group_id])
    return resp, 200, headers
  except KeyError as ke:
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    return jsonify(unexpected_resp), 500, headers

@app.route("/knockout/<stage>")
def get_knockout_stage(stage):
  try:
    resp = jsonify(data["knockout"][stage])
    return resp, 200, headers
  except KeyError as ke:
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    return jsonify(unexpected_resp), 500, headers
