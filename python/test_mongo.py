#!/usr/bin/python
#! encoding: utf-8
from pymongo import MongoClient
import json

client = MongoClient("localhost", 27017)
#connection = pymongo.Connection("127.0.0.1", 27017)
db = client.ironhack
collection = db.users

test = collection.find_one({"name": "test-update"}).get("password")
#test1 = json.dumps(test)
print test


test1 = collection.find_one({"name": "test-update"})
print test1.get("scores")
