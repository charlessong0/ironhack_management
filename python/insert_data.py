from pymongo import MongoClient
import hashlib
import base64

class Client:
    def __init__(self, ip, port, db_name):
        self.ip = ip
        self.port = port
        self.db_name = db_name

    def connectDB(slef):
        client = MongoClient(ip, port)
        db1 = client.ironhack
        db = db.users
        print db.find()
        return db

client = Client("localhost", 27017, "ironhack")
db = client.connectDB
#collection = db.users
#print db.find()
