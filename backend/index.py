import json
import os
import jwt
import time
import traceback
from db.db import find_all_users, insert_user, get_user_by_username, set_match_result, find_round16, find_round8, find_round4, find_group_matches_by_date, find_all_rewards, find_all_scoring, find_all_stadiums, find_all_teams, place_user_bet
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
bad_request_resp = {"message": "bad request, check your input data"}
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
      return jsonify(result), 201, headers
    else:
      return jsonify(unexpected_resp), 500, headers
  except Exception as e:
    print "Exception e: ", e
    traceback.print_exc()
    return jsonify(unexpected_resp), 500, headers

@app.route("/stadiums")
def get_matches():
  try:
    return find_all_stadiums(), 200, headers
  except Exception as e:
    print "Exception e: ", e
    return jsonify(unexpected_resp), 500, headers

@app.route("/leaderboard")
def leaderboard():
  group_matches = json.loads(find_group_matches_by_date())
  round16_matches = json.loads(find_round16())
  round8_matches = json.loads(find_round8())
  round4_matches = json.loads(find_round4())
  users = json.loads(find_all_users())
  matches = group_matches + round16_matches + round8_matches + round4_matches
  print "users: ", users
  leaders = []
  for e in users:
    if 'Admin' in e['roles']:
      users.remove(e)
  for user in users:
    print "------------------------------------------------------------"
    print "Calculating results for user: ", user['userName']
    user['points'] = 0
    bets = user['bets']
    for bet in bets:
      match = get_match_by_id(bet['matchId'], matches)
      if match['finished'] == True:
        print "Match ID: ", match['matchId']
        if bet['winnerTeam'] == match['winner']:
          print "Correct winner: +1 point"
          user['points'] = user['points'] + 1
        if bet['finalResult'] == match['finalResult']:
          print "Correct result: +5 points"
          user['points'] = user['points'] + 5
    leaders.append({"userName": user['userName'], "firstName": user['firstName'], "lastName": user['lastName'], "points": user['points']})
  return jsonify(leaders), 200, headers

def get_match_by_id(matchId, matches):
  for match in matches:
    if match['matchId'] == matchId:
      return match

@app.route("/match", methods=['POST'])
def match_result():
  try:
    auth_header = request.headers.get('Authorization')
    enc_token = auth_header.replace("Bearer ", "")
    print "enc_token: ", enc_token
    dec_token = jwt.decode(enc_token, ENC_SECRET, algorithm='HS256')
    userName = dec_token['userName']
    user = json.loads(get_user_by_username(userName))
    print "auth user: ", user
    forbidden_resp = {"status": "forbidden", "message": "User not authorized"}
    # only admin access is allowed
    if 'Admin' not in user['roles']:
      return jsonify(forbidden_resp), 403, headers
    match = request.get_json()
    print "match: ", match
    matchId = match['matchId']
    print "matchId: ", matchId
    phase = ''
    if matchId <= groups_matches:
      phase = 'groups'
    elif matchId > groups_matches and matchId <= round16_matches:
      phase = 'round16'
    elif matchId > round16_matches and matchId <= round8_matches:
      phase = 'round8'
    elif matchId > round8_matches and matchId <= round4_matches:
      phase = 'round4'
    elif matchId > round4_matches and matchId <= round2_loser:
      phase = 'round2loser'
    elif matchId > round2_loser and matchId <= final:
      phase = 'final'
    else:
      return jsonify(bad_request_resp), 400, headers
    ret = json.loads(set_match_result(match, phase))
    if ret['matchId'] != matchId:
      return bad_request_resp, 400, headers
    return '', 201, headers
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
    user = json.loads(get_user_by_username(creds['userName']))
    resp = {"status": "unauthorized", "message": "Authentication failed, username/password incorrect"}
    if user == None:
      return jsonify(resp), 401, headers
    if user['password'] == creds['password']:
      payload = {"firstName": user['firstName'], "lastName": user['lastName'], "phone": user['phone'], "userName": user['userName'], "iss": "https://swpstkapp.org", "iat": int(time.time()), "exp": int(time.time() + 60*60*60) }
      encoded_jwt = jwt.encode(payload, ENC_SECRET, algorithm='HS256')
      resp = {"status": "ok", "access_token": encoded_jwt}
      return jsonify(resp), 200, headers
    else:
      return jsonify(resp), 401, headers
  except Exception as e:
    print "Exception e: ", e
    # traceback.print_exc()
    return jsonify(unexpected_resp), 500, headers


@app.route("/signup", methods=['POST'])
def create_user():
  try:
    user = request.get_json()
    user['roles'] = ["User"]
    user['points'] = 0
    user['active'] = True
    user['bets'] = []
    exist_user = json.loads(get_user_by_username(user['userName']))
    if exist_user != None:
      return jsonify({"status": "error", "message": "Username already registered"}), 400, headers
    return insert_user(UserSchema().load(request.get_json())), 201, headers
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
