from . import utils
from .models import UserInfo
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers import serialize
from django.http import HttpResponse
import json
import os
from django.http import HttpResponse

#
def verifyUser(userJson):

	if UserInfo.objects.filter(hash_login = userJson['hash_login'], token = userJson['token']):
		return True
	return False

def getOrCreateUser(response):
	try:
		user_info = UserInfo.objects.get(hash_login = response['hash_login'])
		if user_info.isAnonymized is True:
			user_info.login = "Anonymous"
		else:
			if 'login' in response:
				user_info.login = response['login']
		user_info.token = response['token']
		user_info.save()
	except ObjectDoesNotExist:
		user_info = UserInfo(
			hash_login = response['hash_login'],
			login = response['login'],
			token = response['token'],
		)
		user_info.save()

	return serialize('json', [user_info])

def storeUserStatistics(request):
	request = json.loads(request.body.decode())
	if verifyUser(request) is True:
		user_info = UserInfo.objects.get(hash_login = request['hash_login'])
		user_info.ballDistance += request['ballDistance']
		user_info.ballReceived += request['ballReceived']
		user_info.ballReturned += request['ballReturned']
		user_info.bonusTaken += request['bonusTaken']
		user_info.bonusTotal += request['bonusTotal']
		user_info.gamesPlayedNb += request['gamesPlayedNb']
		user_info.gameHistory = request['gameHistory']
		user_info.loseGameNb += request['loseGameNb']
		user_info.wonGamesNb += request['wonGamesNb']
		user_info.save()
		return HttpResponse(status = 200)
	else:
		return HttpResponse(status = 500)

def retrieveUser(request):
	request = request.body.decode()
	requestJson = json.loads(request)
	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hash_login=requestJson['hash_login'])
		response = getOrCreateUser(requestJson)
		return HttpResponse(response, content_type = 'application/json', status=200)
	else:
		return HttpResponse(status=500)

def unanonymizeUser(request):
	requestJson = json.loads(request.body.decode())
	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hash_login=requestJson['hash_login'])

		user.isAnonymized = False
		user.gameHistory = None
		user.save()
		return HttpResponse(status=200)
	else:
		return HttpResponse(status=500)

def anonymizeUser(request):
	requestJson = json.loads(request.body.decode())
	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hash_login=requestJson['hash_login'])
		user.login = "Anonymous"
		user.isAnonymized = True
		user.gameHistory = None
		user.save()
		return HttpResponse(status=200)
	else:
			return HttpResponse(status=500)

def deleteUser(request):
	request = request.body.decode()
	requestJson = json.loads(request)
	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hash_login=requestJson['hash_login'])
		user.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponse(status=404)

