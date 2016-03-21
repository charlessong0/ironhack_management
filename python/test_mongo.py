#!/usr/bin/python
# -*- coding: utf-8
from pymongo import MongoClient
import json
import md5
import hashlib
import base64

client = MongoClient("localhost", 27017)
#connection = pymongo.Connection("127.0.0.1", 27017)
db = client.ironhack
collection = db.users

# GET method
test = collection.find_one({"name": "test-update"}).get("password")
#test1 = json.dumps(test)
print test

test1 = collection.find_one({"username": "python_test"})
print test1.get("scores")[0].get("scores")


m = hashlib.md5()
#m.update(base64.b64encode("password".encode('utf-8')))
m.update("password")
temp = m.digest().encode('utf-8')
## Insert Method
new_user = {
    "username": "python_test",
    "password": temp,
    "scores": [
        {"phase": 1,
        "scores": [1,2,3],
        "finalScore": 6}
    ]
}
print collection.insert(new_user)

