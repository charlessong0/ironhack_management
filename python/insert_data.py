from pymongo import MongoClient
import hashlib
import base64

class Client:
    def __init__(self, ip, port, db_name):
        self.ip = ip
        self.port = port
        self.db_name = db_name

    def connectDB(self, collection_name):
        client = MongoClient(self.ip, self.port)
        #db = client.ironhack
        db = client[self.db_name]
        collection = db[collection_name]
        print collection.find_one()
        return collection

client1 = Client("localhost", 27017, "ironhack")
collection = client1.connectDB("users")
print collection.find_one()
