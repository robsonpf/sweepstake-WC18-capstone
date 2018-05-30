import json
import os
from db.db import find_all_users, find_all_groups, find_all_knockouts, find_all_rewards, find_all_scoring, find_all_stadiums, find_all_teams
from pprint import pprint
from flask import Flask, jsonify, request
from model.user import User, UserSchema
from model.bet import Bet, BetSchema

app = Flask(__name__)

working_dir = os.path.dirname(os.path.abspath(__file__))

data_file = os.path.join(working_dir, 'data.json')

headers = {'Content-Type': 'application/json; charset=utf-8'}
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

@app.route("/users", methods=['POST'])
def create_user():
  user = UserSchema().load(request.get_json())
  users = data["users"]
  users.append(user)
  return "", 201, headers

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
