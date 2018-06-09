import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId

uri = "mongodb://swpstkapp:s1w2p3s4t5k6@localhost/swpstkapp?authSource=admin"
client = MongoClient();
db = client['swpstkapp']

def find_all_users():
  return dumps(db['users'].find({}))

# hash the password before you insert the user
def insert_user(user):
  return dumps(db['users'].insert(user))

def place_user_bet(user):
  # return dumps(db['users'].update({user['_id']} , {"$set": user}))
  uid = user['_id']['$oid']
  print "_id: ", uid
  print "user: ", dumps(db['users'].find({"_id": ObjectId(uid)}))
  bet = user['bets']
  print "Bet to update: ", bet
  return dumps(db['users'].find_and_modify(query={"_id": ObjectId(uid)}, update={"$set": {"bets": user['bets']}}))

def get_user_by_username(username):
    return dumps(db['users'].find_one({"userName": username}))

def find_group_matches_by_date():
  return dumps(db['groups'].find({}).sort('date',pymongo.ASCENDING))

def find_round16():
  return dumps(db['round16'].find({}).sort('date',pymongo.ASCENDING))

def find_round8():
  return dumps(db['round8'].find({}).sort('date',pymongo.ASCENDING))

def find_round4():
  return dumps(db['round4'].find({}).sort('date',pymongo.ASCENDING))

def find_all_rewards():
  return dumps(db['rewards'].find({}))

def find_all_scoring():
  return dumps(db['scoring'].find({}))

def find_all_stadiums():
  return dumps(db['stadiums'].find({}))

def find_all_teams():
  return dumps(db['teams'].find({}))
