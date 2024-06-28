import json
import re
import os
import hashlib
from django.http import HttpResponseServerError

def parse_input(input):
	regex = re.compile(r'^[A-Za-z0-9\-_]+$')
	if not regex.match(input):
		return False
	return True

def parse_signal(str):
	regex = re.compile(r'^[A-Za-z0-9\-_/\\\r\n.=: +*]+$')
	if not regex.match(str):
		return False
	return True

def parseOffersAnswers(signal):
	bool = True
	if not signal.get('iceCandidates') or not signal.get('type') or not signal.get('sdp'):
		return False
	for key, value in signal.items():
		if key == "iceCandidates":
			iceCan = signal[key][0]
			for key, value in iceCan.items():
				print(key, value)
				if not parse_input(key) or not parse_signal(str(value)):
					bool = False
			continue
		if not parse_input(key) or not parse_signal(value):
				bool = False
	return bool

def generateToken():
	ran = os.urandom(20)
	token = ran.hex()
	return token

def hashStr(login):
	return hashlib.sha256(login.encode()).hexdigest()

def updateGameHistory(gameHistory, newName):
	gameJson = json.loads(gameHistory)
	gameJson['login'] = newName
	for elem in gameJson["data"]:
			elem[0] = newName
	return json.dumps(gameJson)

def sanitizeRequest(request):
	try:
		for elem in request:
			if elem == "gameHistory":
				gameJson = json.loads(request['gameHistory'])
				for elem in gameJson:
					if isinstance(elem, str) is True:
						if parse_input(elem) is False:
							raise Exception(elem)
				for elem in gameJson['data']:
					if isinstance(elem, str) is True:
						if parse_input(elem) is False:
							raise Exception(elem)
				continue
			if isinstance(elem, str) is True:
				if parse_input(elem) is False:
					raise Exception(elem)
			if isinstance(request[elem], str) is True:
				if parse_input(request[elem]) is False:
					raise Exception(elem)
		return True
	except Exception as error:
		return error
