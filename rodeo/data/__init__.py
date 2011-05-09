import random
import string
from rodeo.data import database

def token_generate():
    """Generates something like:
    L8BZ HYUY OYKB FKQY
    3TKQ 6DCW SMSM XMDN
    """
    def data():
        return random.choice(string.ascii_uppercase + string.digits)
        
    result =  "".join( data() + " " if (x+1) % 4 is 0 else data() for x in xrange(16) ).strip()
    return (result.lower().replace(' ', ''), result)

def token_register_uuid(uuid):
    redis = database.redis()
    token = token_generate()
    
    
    while redis.exists(token[0]) is True:
        token = token_generate()
        
    redis.set(token[0], uuid);
    redis.expire(token[0], 120)
    
    return token[1]