import uuid
from datetime import datetime
import psycopg2
from rodeo.data.queries import UserNewQuery
from rodeo.data.queries import UserSelectQuery
from rodeo.data.queries import UserLinkEmailQuery

class User(object):

    def __init__(self, id=None):
        self.id = None
        
        if id is None:
            self.id = str(uuid.uuid4())
        else:
            query = UserSelectQuery(user_id=id)
            
            if len(query) > 0:
                self.id = id

    def linkEmailAddress(self, email):
        try:
            query = UserLinkEmailQuery(user_id=self.id, email=email)
            query.execute()
        except psycopg2.IntegrityError, e: #not a unique email address
            return False
        
        return True
        
        
    def add(self):
        try:
            query = UserNewQuery(user_id=self.id)
            query.execute()
        except Exception, e:
            return False
            
        return True
        