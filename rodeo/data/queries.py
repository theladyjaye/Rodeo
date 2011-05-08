from rodeo.data import database
from datetime import datetime

class Query(object):
    
    def __init__(self, **kwargs):
        self.sql = None
        self.cursor = None
        self.values = ()
        self.cursor = None
        self.prepare(**kwargs)
        self.db = database.postgres()
        
    def prepare(self, **kwargs): pass
    
    def fetchone(self):
        if self.cursor is None: 
            self.execute()
            
        return self.cursor.fetchone()
        
    def execute(self, sql=None, values=None):
        if sql is not None:
            self.sql = sql
            self.values = values if values else self.values
            
        self.cursor = self.db.cursor()
        self.cursor.execute(self.sql, self.values)

    def __len__(self):
        if self.cursor is None:
            self.execute()
        
        return self.cursor.rowcount
        
    def __del__(self):
        self.db.commit()
        self.cursor.close()
        self.db.close()
        

class UserSelectQuery(Query):
    def prepare(self, **kwargs):
        if "user_id" in kwargs:
            self.sql = """SELECT u.id, u.email FROM "user" u WHERE u.id=%s"""
            self.values = (kwargs['user_id'], )
        elif "email" in kwargs:
            self.sql = """SELECT u.id, u.email FROM "user" u WHERE u.email=%s"""
            self.values = (kwargs['email'], )
            

class UserNewQuery(Query):
    def prepare(self, **kwargs):        
        date = datetime.today().isoformat()[:19] #don't care about microseconds else 26
        self.sql = """INSERT INTO "user" (id, last_login, created_on) VALUES (%s, %s, %s)"""
        self.values = (kwargs["user_id"], date, date)

class UserLinkEmailQuery(Query):
    def prepare(self, **kwargs):
        self.sql = """UPDATE "user" SET email=%s WHERE id=%s"""
        self.values = (kwargs["email"], kwargs["user_id"])
        