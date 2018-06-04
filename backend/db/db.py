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

def find_all_groups():
  return dumps(db['groups'].find({}))

def find_all_knockouts():
  return dumps(db['knockouts'].find({}))

def find_all_rewards():
  return dumps(db['rewards'].find({}))

def find_all_scoring():
  return dumps(db['scoring'].find({}))

def find_all_stadiums():
  return dumps(db['stadiums'].find({}))

def find_all_teams():
  return dumps(db['teams'].find({}))
