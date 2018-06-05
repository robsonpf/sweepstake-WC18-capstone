import pymongo
from pymongo import MongoClient
from bson.json_util import dumps

uri = "mongodb://swpstkapp:s1w2p3s4t5k6@localhost/swpstkapp?authSource=admin"
client = MongoClient();
db = client['swpstkapp']

def find_all_users():
  return dumps(db['users'].find({}))

def insert_user(user):
  return dumps(db['users'].insert(user))

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
