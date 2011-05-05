import uuid
from datetime import datetime
from rodeo.data import database

class User(object):
	
	def __init__(self, id=None):
		if id is None:
			self.id = str(uuid.uuid4())
		else:
			self.id = id
		
	def add(self):
		redis = database.redis()
		redis.sadd("users", self.id)
		redis.hset(self.id, "last_login", datetime.today().isoformat())