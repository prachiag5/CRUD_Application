from flask_mongoengine import MongoEngine

db = MongoEngine()

class Contact(db.Document):
    name = db.StringField(max_length=20, required=True)
    contact = db.StringField(max_length=20, required=True)
