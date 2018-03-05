import os


DEBUG = os.environ.get('DEBUG', None)
SECRET_KEY = os.environ.get('SECRET_KEY', None)
SQLALCHEMY_DATABASE_URI = 'postgresql://milbbhguqvjxpt:2670f50724e1a0b2c2acce24bf5b27e7e5911291d31d9db492641438167abb87@ec2-54-235-252-137.compute-1.amazonaws.com:5432/d3o1rgu4g2e39m'
TWILIO_NUMBER = os.environ.get('TWILIO_NUMBER', None)