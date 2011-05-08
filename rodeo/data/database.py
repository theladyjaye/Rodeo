import psycopg2
from redis import Redis

def redis():
    return Redis(host='localhost', port=6379, db=0)

def postgres():
    return psycopg2.connect("dbname=rodeo user=dev")
