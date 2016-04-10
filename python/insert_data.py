from pymongo import MongoClient
import hashlib
import base64

class Client:
    def __init__(self, ip, port, db_name):
        self.ip = ip
        self.port = port
        self.db_name = db_name
        self.client = MongoClient(self.ip, self.port)

    def connectDB(self, collection_name):
        #client = MongoClient(self.ip, self.port)
        #db = client.ironhack
        db = self.client[self.db_name]
        collection = db[collection_name]
        #print collection.find_one()
        return collection
    def close(self):
        self.client.close()

client2 = Client("localhost", 27017, "ironhack")
collection = client2.connectDB("versions")
new_version = {
    "ironhackName": "greenironhack",
    "currentPhase": 1,
    "phases": []
}
collection.insert(new_version)
client2.close()

'''
client1 = Client("localhost", 27017, "ironhack")
collection = client1.connectDB("posts")
print collection.find_one()

# post data for greenironhack 
# technology evalution
participants_tech = [
    [],
    [],
    []
]
judges_tech = []

for judge in judges_tech:
    

# infoviz evlaution
participants_info = [
    [],
    [],
    [],
    [],
    []
]
judges_info = []

for judge in judges_info:
'''
