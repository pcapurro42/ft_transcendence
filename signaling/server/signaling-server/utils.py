import json
import re
import os
import hashlib

def parse_input(input):
	regex = re.compile(r'^[A-Za-z0-9\-_]+$')
	if not regex.match(input):
		return False
	return True

def generateToken():
	ran = os.urandom(20)
	token = ran.hex()
	return token

def hashStr(login):
	return hashlib.sha256(login.encode()).hexdigest()
