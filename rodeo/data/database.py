from redis import Redis
def redis():
	return Redis(host='localhost', port=6379, db=0)