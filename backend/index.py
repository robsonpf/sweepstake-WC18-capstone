import json
import os
import jwt
import time
from db.db import find_all_users, insert_user, get_user_by_username, find_round16, find_round8, find_round4, find_group_matches_by_date, find_all_rewards, find_all_scoring, find_all_stadiums, find_all_teams, place_user_bet
from pprint import pprint
from flask import Flask, jsonify, request
from model.user import User, UserSchema
from model.bet import Bet, BetSchema
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
ENC_SECRET = '8asndasASK893Hulo789jhsdfDASd23AS'
working_dir = os.path.dirname(os.path.abspath(__file__))
data_file = os.path.join(working_dir, 'data.json')
headers = {'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'}
not_found_resp = {"message": "resource not found"}
unexpected_resp = {"message": "unexpected error occurred"}
groups_matches = 48
round16_matches = 56
round8_matches = 60
round4_matches = 62
round2_loser = 63
final = 64


with open(data_file) as f:
  data = json.load(f)

@app.route("/bet", methods=['POST'])
def place_bet():
  try:
    auth_header = request.headers.get('Authorization')
    print "Auth Header: ", auth_header
    enc_token = auth_header.replace("Bearer ", "")
    print "enc_token: ", enc_token
    dec_token = jwt.decode(enc_token, ENC_SECRET, algorithm='HS256')
    print "dec_token: ", dec_token
    userName = dec_token['userName']
    print "userName: ", userName
    user = json.loads(get_user_by_username(userName))
    print "User: ", user
    bet = request.get_json()
    print "Bet: ", bet
    userBets = user['bets']
    print "userBets", userBets
    if userBets == None:
      user['bets'] = []
    for b in user['bets']:
      if b['matchId'] == bet['matchId']:
        return jsonify({"message": "bet already made for this match"}), 400, headers
    # TODO: Validate if match has bets closed (match already happened or is about to begin)
    user['bets'].append(bet)
    print "User: ", user
    result = json.loads(place_user_bet(user))
    print "Result: ", result
    if result['userName'] == userName:
      return '', 201, headers
    else:
      return jsonify(unexpected_resp), 500, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers

@app.route("/stadiums")
def get_matches():
  try:
    return find_all_stadiums(), 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers  

@app.route("/scoring")
def get_scoring():
  try:
    return find_all_scoring(), 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers   

@app.route("/rewards")
def get_rewards():
  try:
    return find_all_rewards(), 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers      

@app.route("/users", methods=['GET'])
def get_users():
  try:
    return find_all_users(), 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers    

@app.route("/signin", methods=['POST'])
def authenticate():
  try:
    creds = request.get_json()
    print "creds: " + str(creds)
    user = json.loads(get_user_by_username(creds['userName']))
    resp = {"status": "unauthorized", "message": "Authentication failed, username/password incorrect"}
    if user['password'] == creds['password']:
      payload = {"firstName": user['firstName'], "lastName": user['lastName'], "phone": user['phone'], "userName": user['userName'], "iss": "https://swpstkapp.org", "iat": int(time.time()), "exp": int(time.time() + 60*60*60) }
      encoded_jwt = jwt.encode(payload, ENC_SECRET, algorithm='HS256')
      resp = {"status": "ok", "access_token": encoded_jwt}
      return jsonify(resp), 200, headers
    else:
      return jsonify(resp), 401, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers    


@app.route("/signup", methods=['POST'])
def create_user():
  try:
    user = request.get_json()
    exist_user = json.loads(get_user_by_username(user['userName']))
    if exist_user != None:
      return jsonify({"status": "error", "message": "Username already registered"}), 400, headers
    return insert_user(UserSchema().load(request.get_json())), 201, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers  

@app.route("/tvchannels")
def get_tv_channels():
  try:
    return jsonify(data["tvchannels"]), 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers  
  

@app.route("/teams")
def get_teams():
  try:
    return find_all_teams(), 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers
  

@app.route("/groups/matches")
def get_matches_by_date():
  try:
    resp = find_group_matches_by_date()
    return resp, 200, headers
  except KeyError as ke:
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    return jsonify(unexpected_resp), 500, headers

@app.route("/round16")
def get_round16_stage():
  try:
    resp = find_round16()
    return resp, 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers

@app.route("/round8")
def get_round8_stage():
  try:
    resp = find_round8()
    return resp, 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers

@app.route("/round4")
def get_round4_stage():
  try:
    resp = find_round4()
    return resp, 200, headers
  except KeyError as ke:
    print "Exception ke: ", ke
    return jsonify(not_found_resp), 404, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers
